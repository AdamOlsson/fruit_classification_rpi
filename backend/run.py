# coding=utf-8
import picamera
import picamera.array
import os
import numpy as np
import time
from lib.classifier import Classifier
from lib.restful import Restful


if __name__ == "__main__":
    dir_path = os.path.dirname(os.path.realpath(__file__))
    model_file = dir_path + "/saved_models/mobilenet/v1/mobilenet_output_graph.pb"
    label_file = dir_path + "/saved_models/mobilenet/v1/mobilenet_output_labels.txt"
    input_layer = "input"
    output_layer = "final_result"
    input_name = "import/" + input_layer
    output_name = "import/" + output_layer

    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as output:
            c = Classifier(model_file, label_file, input_name, output_name, net="mobilenet")
            c.start()

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

                    post_success = Restful.post("http://127.0.0.1:4001/results", results)

                    if post_success:
                        print "Successful POST"
                    else:
                        print "Failed POST"

            except KeyboardInterrupt:
                print "Exiting..."
                c.stop()
