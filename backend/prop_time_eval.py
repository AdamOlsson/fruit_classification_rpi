import picamera
import picamera.array
import os
import numpy as np
import time
from lib.classifier import Classifier
import argparse
import sys
import psutil


if __name__ == "__main__":

    process = psutil.Process(os.getpid())
    log = raw_input("Enter filename for log (without '.txt'):")
    n = 100

    dir_path = os.path.dirname(os.path.realpath(__file__))
    parser = argparse.ArgumentParser()
    parser.add_argument('--mobilenet', action='store_true', help='Use mobilenet in test')
    parser.add_argument('--inception', action='store_true', help='Use inception in test')
    parser.add_argument('-itr', dest='itr', type=int, help='Number of images to propagate')
    args = parser.parse_args()

    if (args.mobilenet and args.inception) or (not args.mobilenet and not args.inception):
        print "Please provide one network to test."
        exit(1)
    
    if args.mobilenet:
        mobnet_model_file = dir_path + "/saved_models/mobilenet/v3/mobilenet_output_graph.pb"
        mobnet_label_file = dir_path + "/saved_models/mobilenet/v3/mobilenet_output_labels.txt"
        mobnet_input_layer = "input"
        mobnet_output_layer = "final_result"
        mobnet_input_name = "import/" + mobnet_input_layer
        mobnet_output_name = "import/" + mobnet_output_layer
        print "Initializing Mobilenet..."
        net = Classifier(mobnet_model_file, mobnet_label_file, mobnet_input_name, mobnet_output_name, net="mobilenet")
    elif args.inception:
        incptn_model_file = dir_path + "/saved_models/inception/v3/inception_output_graph.pb"
        incptn_label_file = dir_path + "/saved_models/inception/v3/inception_output_labels.txt"
        incptn_input_layer = "Mul"
        incptn_output_layer = "final_result"
        incptn_input_name = "import/" + incptn_input_layer
        incptn_output_name = "import/" + incptn_output_layer
        print "Initializing Inception..."
        net = Classifier(incptn_model_file, incptn_label_file, incptn_input_name, incptn_output_name, net="inception")
    else:
        print "Error"
        exit(1)

    if args.itr is not None:
        n = args.itr

    t1 = time.time()
    net.start()
    t2 = time.time()

    print 'Network start took {} seconds'.format(t2-t1)

    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as output:

            resolution = (360, 240)
            time.sleep(.1) # Camera warm-up
            try:
                for iteration in range(100):
                    camera.resolution = resolution
                    camera.rotation = 180
                    time.sleep(.2)
                    print 'Capturing image {} of {}...'.format(iteration, n)
                    start = time.time()
                    camera.capture(output, 'rgb')
                    print "Done!"
                    print "Labeling with Network: Please wait..."
                    cp_one = time.time()
                    results = net.label_image(output.array)
                    cp_two = time.time()
                    print "Labeling with Inception: Done!"
                    output.truncate(0)
                    prop_time = cp_two - cp_one
                    print 'Propagation time was {} seconds'.format(prop_time)
                    print 'Size of this session is {} bytes'.format(process.memory_info()[0])
                    print "Writing to file..."

                    with open("eval_logs/" + log + ".txt", "a+") as f:
                        f.write(str(prop_time) + "\n")

                    print "Done!"
            except KeyboardInterrupt:
                print "Exiting..."
    net.stop()
