import picamera
import picamera.array
import os
import numpy as np
import time
from lib.classifier import Classifier



if __name__ == "__main__":

    dir_path = os.path.dirname(os.path.realpath(__file__))

    mobnet_model_file = dir_path + "/saved_models/mobilenet/mobilenet_output_graph.pb"
    mobnet_label_file = dir_path + "/saved_models/mobilenet/mobilenet_output_labels.txt"
    mobnet_input_layer = "input"
    mobnet_output_layer = "final_result"
    mobnet_input_name = "import/" + mobnet_input_layer
    mobnet_output_name = "import/" + mobnet_output_layer
    print "Initializing Mobilenet..."
    mobnet = Classifier(mobnet_model_file, mobnet_label_file, mobnet_input_name, mobnet_output_name, net="mobilenet")

    incptn_model_file = dir_path + "/saved_models/inception/inception_output_graph.pb"
    incptn_label_file = dir_path + "/saved_models/inception/inception_output_labels.txt"
    incptn_input_layer = "Mul"
    incptn_output_layer = "final_result"
    incptn_input_name = "import/" + incptn_input_layer
    incptn_output_name = "import/" + incptn_output_layer
    print "Initializing Inception..."
    incptn = Classifier(incptn_model_file, incptn_label_file, incptn_input_name, incptn_output_name, net="inception")

    incptn.start()
    mobnet.start()

    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as output:

            resolution = (720, 480)
            time.sleep(.1) # Camera warm-up
            try:
                while(True):
                    camera.resolution = resolution
                    # If the showing of camera doesn't work, check. Might be to advanced for the purpose
                    # http://picamera.readthedocs.io/en/release-1.6/recipes2.html#capturing-images-whilst-recording
                    camera.start_preview(fullscreen=False, window=(10,50, resolution[0], resolution[1]))
                    #print "Press 'Enter' to capture an image."
                    dummy = raw_input("Press 'Enter' to capture an image.")
                    fruit = raw_input("Please enter the correct fruit:")
                    camera.stop_preview()
                    print "Capturing..."
                    start = time.time()
                    camera.capture(output, 'rgb')
                    output2 = np.copy(output.array)
                    print "Done!"
                    print "Labeling with Inception: Please wait..."
                    cp_one = time.time()
                    incptn_results = incptn.label_image(output.array)
                    cp_two = time.time()
                    print "Labeling with Inception: Done!"
                    print "Labeling with Mobilenet: Please wait..."
                    cp_three = time.time()
                    mobnet_results = mobnet.label_image(output2)
                    cp_four = time.time()
                    print "Labeling with Mobilenet: Done!"
                    output.truncate(0)
                    incptn_prop_time = cp_two - cp_one
                    mobnet_prop_time = cp_four - cp_three
                    print "Results from Inception,", incptn_prop_time,"seconds. "
                    for res in incptn_results:
                        print res
                    print "Results from Mobilenet,", mobnet_prop_time,"seconds. "
                    for res in mobnet_results:
                        print res
                    print "Writing to file..."
                    with open("net_res.txt", "a+") as f:
                        f.write("Inception: " + str(incptn_results) + ":::::Mobilenet" + str(mobnet_results) + ":::::" + fruit + "\n")

            except KeyboardInterrupt:
                camera.stop_preview()
                print "Exiting..."
    mobnet.stop()
    incptn.stop()
