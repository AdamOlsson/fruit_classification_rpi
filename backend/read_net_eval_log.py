# coding=utf-8
import argparse
import os
import json
from unidecode import unidecode

parser = argparse.ArgumentParser()
parser.add_argument('--log', dest='log', help='Log file to process')
args = parser.parse_args()

logs_path = "./eval_logs"
os.chdir(logs_path)

if args.log is not None:
    log = args.log
else:
    print "Please provide a log file to process when running the file. Example: python read_net_eval_log.py --log LOGNAME"
    exit()

try:
    with open(log, "r") as f:
        lines = f.readlines() # returns list of lines
        line_num = 0
        print "\n" # pretty print
        for line in lines:
            inception, mobilenet, fruit = line.split(":::::")

            inception = inception.split(":", 1)[1] # Remove the 'inception:' part of the line
            mobilenet = mobilenet.split(":", 1)[1] # Remove the 'mobilenet:' part of the line

            inception, inception_prop_time = inception.split("time:") # extract propagation time
            mobilenet, mobilenet_prop_time = mobilenet.split("time:")

            #fruit = fruit.split("\n")[0] # Remove the '\n' at the end of string for pretty print purposes

            inception = inception.replace("'", "\"") # " cannot be ' for to be read as json
            mobilenet = mobilenet.replace("'", "\"")

            inception = inception.replace("\\xc4", "a")
            inception = inception.replace("\\xe4", "a")
            mobilenet = mobilenet.replace("\\xc4", "a")
            mobilenet = mobilenet.replace("\\xe4", "a")
            inception = inception.replace("u", "")
            mobilenet = mobilenet.replace("u", "")
            inception = inception.replace("accracy", "accuracy")
            mobilenet = mobilenet.replace("accracy", "accuracy")


            print inception
            inception_data = json.loads(inception)
            mobilenet_data = json.loads(mobilenet)

            print 'Image {:<3} {:>25} || {:<22} Correct answer: {}'.format(line_num, "Inception LEFT", "Mobilenet RIGHT", fruit)
            with open("dummy.txt", "a+") as dummy:
                for item in range(len(inception_data)): # lengths are the same
                    print '{}. {:<11} {:<20} ||         {}. {:<11} {:<30}'.format(item, inception_data[item]["object"], inception_data[item]["accuracy"], item, mobilenet_data[item]["object"], mobilenet_data[item]["accuracy"])
                    dummy.write(mobilenet_data[item]["object"] + "\n")
                dummy.write("\n")
            
            print '{} {} {:<10} {:<10} {} {} {}'.format("Inception:", inception_prop_time, "seconds", "||","Mobilenet:", mobilenet_prop_time, "seconds")

            print "\n"
            line_num += 1

except Exception, e:
    print e
