import picamera
import picamera.array
import os
import numpy as np
import time
from lib.classifier import Classifier



if __name__ == "__main__":

    dir_path = os.path.dirname(os.path.realpath(__file__))

    mobnet_model_file = dir_path + "/saved_models/mobilenet/v2/mobilenet_output_graph.pb"
    mobnet_label_file = dir_path + "/saved_models/mobilenet/v2/mobilenet_output_labels.txt"
    mobnet_input_layer = "input"
    mobnet_output_layer = "final_result"
    mobnet_input_name = "import/" + mobnet_input_layer
    mobnet_output_name = "import/" + mobnet_output_layer
    print "Initializing Mobilenet..."
    mobnet = Classifier(mobnet_model_file, mobnet_label_file, mobnet_input_name, mobnet_output_name, net="mobilenet")

    incptn_model_file = dir_path + "/saved_models/inception/v2/inception_output_graph.pb"
    incptn_label_file = dir_path + "/saved_models/inception/v2/inception_output_labels.txt"
    incptn_input_layer = "Mul"
    incptn_output_layer = "final_result"
    incptn_input_name = "import/" + incptn_input_layer
    incptn_output_name = "import/" + incptn_output_layer
    print "Initializing Inception..."
    incptn = Classifier(incptn_model_file, incptn_label_file, incptn_input_name, incptn_output_name, net="inception")

    incptn.start()
    mobnet.start()

    log = raw_input("Enter filename for log (without '.txt'):")

    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as output:

            resolution = (720, 480)
            time.sleep(.1) # Camera warm-up
            try:
                while(True):
                    camera.resolution = resolution
                    camera.rotation = 180
                    camera.start_preview(fullscreen=False, window=(10,50, resolution[0], resolution[1]))
                    # TODO: Button press to initiate process
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
                    with open("eval_logs/" + log + ".txt", "a+") as f:
                        f.write("inception:" + str(incptn_results)  + "time:" + str(incptn_prop_time) + ":::::mobilenet:" + str(mobnet_results) + "time:" + str(mobnet_prop_time) + ":::::" + fruit + "\n")
		            print ("Done!")
            except KeyboardInterrupt:
                camera.stop_preview()
                print "Exiting..."
    #mobnet.stop()
    incptn.stop()
