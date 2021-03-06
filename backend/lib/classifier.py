# coding=utf-8
import numpy as np
import tensorflow as tf
import os

class Classifier:

    def __init__(self, graph_file, label_file, input_name, output_name, net="mobilenet"):
        self.graph = self.load_graph(graph_file)
        self.labels = self.load_labels(label_file)
        self.input_operation = self.graph.get_operation_by_name(input_name)
        self.output_operation = self.graph.get_operation_by_name(output_name)
        self.net = net

        # Will cause mem leak if not defined outside of run.py while loop
        if net == "inception":
            self.read_tensor_from_np_array_op = self.create_read_tensor_from_np_array(input_height=299, input_width=299, input_mean=0, input_std=255)
        else:
            self.read_tensor_from_np_array_op = self.create_read_tensor_from_np_array() # Use default mobilenet variables


    def __enter__(self):
        self.session = tf.Session(graph=self.graph)
        self.norm_session = tf.Session()
        return self.session

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()
        self.norm_session.close()
        return True

    def start(self):
        self.session = tf.Session(graph=self.graph)
        self.norm_session = tf.Session()

    def stop(self):
        self.session.close()
        self.norm_session.close()

    def label_image(self, image):
        t = self.norm_session.run(self.read_tensor_from_np_array_op, feed_dict={"image_array:0":image})

        results = self.session.run(self.output_operation.outputs[0], {self.input_operation.outputs[0]: t })
        results = np.squeeze(results)

        top_k = results.argsort()[-3:][::-1]
        res_list = []
        for i in top_k:
            res_list.append({"object": self.labels[i], "accuracy":str(results[i])})
        return res_list


    def load_graph(self, model_file):
      graph = tf.Graph()
      graph_def = tf.GraphDef()

      with open(model_file, "rb") as f:
        graph_def.ParseFromString(f.read())
      with graph.as_default():
        tf.import_graph_def(graph_def)

      return graph


    def read_tensor_from_np_array(self, file_name, input_height=224, input_width=224, input_mean=128, input_std=128):

        float_caster = tf.convert_to_tensor(file_name, tf.float32)
        dims_expander = tf.expand_dims(float_caster, 0)
        resized = tf.image.resize_bilinear(dims_expander, [input_height, input_width])
        normalized = tf.divide(tf.subtract(resized, [input_mean]), [input_std])
        sess = tf.Session() #dis
        result = sess.run(normalized)

        return result

    def create_read_tensor_from_np_array(self, input_height=224, input_width=224, input_mean=128, input_std=128):

        file_name = tf.placeholder("float", name="image_array")

        float_caster = tf.convert_to_tensor(file_name, tf.float32)
        dims_expander = tf.expand_dims(float_caster, 0)
        resized = tf.image.resize_bilinear(dims_expander, [input_height, input_width])
        normalized = tf.divide(tf.subtract(resized, [input_mean]), [input_std])

        return normalized


    def load_labels(self, label_file):
        label = []
        proto_as_ascii_lines = tf.gfile.GFile(label_file).readlines()
        for l in proto_as_ascii_lines:
            label.append(l.rstrip())
        return label
