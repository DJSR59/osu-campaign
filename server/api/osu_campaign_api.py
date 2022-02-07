from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .db_utils import *
from .sql_commands import *


class BeatmapInfoApi(Resource):
    def get(self):
        result = exec_get_all(select_sql("BeatmapInfo", "*"))
        return result

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('artist', type=str)
        parser.add_argument('mapper', type=str)
        parser.add_argument('diffName', type=str)
        parser.add_argument('starRating', type=float)
        parser.add_argument('mapLink', type=str)
        args = parser.parse_args()

        columns = ['title', 'artist', 'mapper', 'difficulty_name', 'star_rating', 'map_link']
        values = [format_string(args.get('title')), format_string(args.get('artist')),
                  format_string(args.get('mapper')), format_string(args.get('diffName')),
                  format_string(args.get('starRating')), format_string(args.get('mapLink'))]

        query = insert_sql("BeatmapInfo", columns, values)
        exec_commit(query)
