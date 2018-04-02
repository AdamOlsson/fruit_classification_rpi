import argparse
import os
import json

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

            fruit = fruit.split("\n")[0] # Remove the '\n' at the end of string for pretty print purposes

            inception = inception.replace("'", "\"") # " cannot be ' for to be read as json
            mobilenet = mobilenet.replace("'", "\"")

            inception_data = json.loads(inception)
            mobilenet_data = json.loads(mobilenet)

            print "Image {}. Inception LEFT || Mobilenet RIGHT ::::: Correct answer: {}".format(line_num, fruit)
            for item in range(len(inception_data)): # lengths are the same
                print inception_data[item]["object"], inception_data[item]["accuracy"], "||", mobilenet_data[item]["object"], mobilenet_data[item]["accuracy"]
            
            print "Inception: {} seconds || Mobilenet: {} seconds".format(inception_prop_time, mobilenet_prop_time)

            print "\n"
            line_num += 1

except Exception, e:
    print e
