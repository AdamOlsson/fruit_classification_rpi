# coding=utf-8
import picamera
import picamera.array
import os
import numpy as np
import time
from lib.classifier import Classifier
from lib.restful import Restful
from lib.hx711 import HX711
from RPi.GPIO import cleanup


if __name__ == "__main__":
    dir_path = os.path.dirname(os.path.realpath(__file__))
    model_file = dir_path + "/saved_models/mobilenet/v3/mobilenet_output_graph.pb"
    label_file = dir_path + "/saved_models/mobilenet/v3/mobilenet_output_labels.txt"
    input_layer = "input"
    output_layer = "final_result"
    input_name = "import/" + input_layer
    output_name = "import/" + output_layer

    hx = HX711(5,6)
    hx.set_reference_unit(-400)
    hx.reset()
    hx.tare()


    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as output:
            c = Classifier(model_file, label_file, input_name, output_name, net="mobilenet")
            c.start()
            old_val = 0 # save old load cell val
            time.sleep(.1)
            try:
                while(True):
                    camera.resolution = (640, 480)
                    camera.rotation = 270
                    if True:
                        print "Press 'Enter' to capture an image."
                        dummy = raw_input()
                    else:
                        val = hx.get_weight(5)
                        
                        print val
                        hx.power_down() # recommended if idle to long
                        hx.power_up()
                        if val < 50 and abs(val - old_val) > 10 : # If value less than 200g do nothing
                            time.sleep(.5)
                            continue 
                        old_val = val
                    print "Capturing..."
                    start = time.time()
                    camera.capture(output, 'rgb')

                    # Dummy post to tell frontend that labeling is starting
                    Restful.post("http://127.0.0.1:4001/results", []) 

                    print "Done! Labeling image..."
                    checkpoint = time.time()
                    results = c.label_image(output.array)
                    end = time.time()
                    print "Done! Posting..."
                    output.truncate(0)

                    for res in results:
                        print res
                    print "{Capture", checkpoint-start, "seconds:::Labeling", end-checkpoint,"seconds}"

                    # Post result du frontend
                    post_success = Restful.post("http://127.0.0.1:4001/results", results)

                    if post_success:
                        print "Successful POST"
                    else:
                        print "Failed POST, retrying in 1 second."
                        time.sleep(1)

                        post_success = Restful.post("http://127.0.0.1:4001/results", results)
                        if post_success:
                            print "Successful POST"
                        else: 
                            print "Failed POST. Can't POST to results."
            except KeyboardInterrupt:
                print "Exiting..."
                c.stop()
                cleanup()
                
