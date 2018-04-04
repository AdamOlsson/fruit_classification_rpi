import socket
import json

class SocketManager:

    def __init__(self, address, port):
        self.address = address
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def open(self):
        self.sock.connect(self.address, self.port)
    
    def close(self):
        self.sock.close()

    def send(self, data):
        json_data = json.dumps(data)

        self.sock.sendall(json_data)
        # TODO: check respons