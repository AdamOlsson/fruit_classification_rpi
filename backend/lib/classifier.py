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

    def __enter__(self):
        self.session = tf.Session(graph=self.graph)
        return self.session

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()
        return True

    def start(self):
        self.session = tf.Session(graph=self.graph)

    def stop(self):
        self.session.close()

    def label_image(self, image_path):
        if self.net == "inception":
            t = self.read_tensor_from_np_array(image_path, input_height=299, input_width=299, input_mean=0, input_std=255)
        else:
            t = self.read_tensor_from_np_array(image_path) # Use default mobilenet variables
        results = self.session.run(self.output_operation.outputs[0], {self.input_operation.outputs[0]: t })
        results = np.squeeze(results)

        top_k = results.argsort()[-5:][::-1]
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

    def read_tensor_from_image_file(self, file_name, input_height=224, input_width=224, input_mean=128, input_std=128):
        input_name = "file_reader"
        output_name = "normalized"
        file_reader = tf.read_file(file_name, input_name)

        image_reader = tf.image.decode_jpeg(file_reader, channels=3, name="jpeg_reader")

        float_caster = tf.cast(image_reader, tf.float32)
        dims_expander = tf.expand_dims(float_caster, 0)
        resized = tf.image.resize_bilinear(dims_expander, [input_height, input_width])
        normalized = tf.divide(tf.subtract(resized, [input_mean]), [input_std])
        sess = tf.Session()
        result = sess.run(normalized)

        return result

    def read_tensor_from_np_array(self, file_name, input_height=224, input_width=224, input_mean=128, input_std=128):

        float_caster = tf.convert_to_tensor(file_name, tf.float32)
        dims_expander = tf.expand_dims(float_caster, 0)
        resized = tf.image.resize_bilinear(dims_expander, [input_height, input_width])
        normalized = tf.divide(tf.subtract(resized, [input_mean]), [input_std])
        sess = tf.Session()
        result = sess.run(normalized)

        return result


    def load_labels(self, label_file):
        label = []
        proto_as_ascii_lines = tf.gfile.GFile(label_file).readlines()
        for l in proto_as_ascii_lines:
            label.append(l.rstrip())
        return label
