from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .db_utils import *


class BeatmapInfoApi(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM BeatmapInfo")
        return result