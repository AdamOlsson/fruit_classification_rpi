import requests
import json

class Restful:
    @staticmethod
    def post(url, data):
        try:
            results = {"results": data}
            response = requests.post(url, json=results)
            print type(response.status_code)
            if response.status_code != 200:
                print response.content
                return False
            return True
        except requests.exceptions.RequestException as e:
            print "Error when uploading."
            print e
            return False
