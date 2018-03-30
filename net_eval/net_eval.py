import picamera
import picamera.array
import os
import numpy as np
import time
import argparse
from lib.classifier import Classifier
from lib.restful import Restful



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--camera', action='store_true', help='an integer for the accumulator')
    args = parser.parse_args()

    dir_path = os.path.dirname(os.path.realpath(__file__))

    mobnet_model_file = dir_path + "/saved_models/mobilenet/mobilenet_output_graph.pb"
    mobnet_label_file = dir_path + "/saved_models/mobilenet/mobilenet_output_labels.txt"
    mobnet_input_layer = "input"
    mobnet_output_layer = "final_result"
    mobnet_input_name = "import/" + mobnet_input_layer
    mobnet_output_name = "import/" + mobnet_output_layer
    mobnet = Classifier(mobnet_model_file, mobnet_label_file, mobnet_input_name, mobnet_output_name, camera=args.camera)

    incptn_model_file = dir_path + "/saved_models/inception/inception_output_graph.pb"
    incptn_label_file = dir_path + "/saved_models/inception/inception_output_labels.txt"
    incptn_input_layer = "Mul"
    incptn_output_layer = "final_result"
    incptn_input_name = "import/" + mobnet_input_layer
    incptn_output_name = "import/" + mobnet_output_layer
    incptn_input_mean=128
    incptn_input_std=128
    incptn = Classifier(model_file, label_file, input_name, output_name, camera=args.camera)


    mobnet.start()


    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as output:


            time.sleep(.1)
            try:
                while(True):
                    camera.resolution = (640, 480)
                    #TODO MAKE BUTTON HERE
                    print "Press 'Enter' to capture an image."
                    dummy = raw_input()

                    print "Capturing..."
                    start = time.time()
                    camera.capture(output, 'rgb')
                    print "Done! Labeling image..."
                    checkpoint = time.time()
                    results = c.label_image(output.array)
                    end = time.time()
                    print "Done! Posting..."
                    output.truncate(0)

                    for res in results:
                        print res
                    print "{Capture", checkpoint-start, "seconds:::Labeling", end-checkpoint,"seconds}"

                    post_success = Restful.post("https://localhost:4001/results", results)

                    if post_success:
                        print "Successful POST"
                    else:
                        print "Failed POST"

            except KeyboardInterrupt:
                print "Exiting..."
    mobnet.stop()
