from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .db_utils import *
from .sql_commands import *


class BeatmapInfoApi(Resource):
    def get(self):
        return exec_get_all(select_sql("BeatmapInfo", "*") + inner_join_sql('BeatmapInfo', 'Node', 'id', 'beatmap_info_id'))

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


class BeatmapInfoDataApi(Resource):
    def delete(self, id):
        exec_commit(delete_sql('MasterChallenge') + where_sql('beatmap_info_id', id))
        exec_commit(delete_sql('Node') + where_sql('beatmap_info_id', id))
        exec_commit(delete_sql('BeatmapInfo') + where_sql('id', id))


class ChallengeDataApi(Resource):
    def get(self, id):
        columns = ['c_normal.rank', 'c_normal.mod', 'c_master.rank', 'c_master.mod']

        query = select_sql('Challenge c_normal', columns)
        query += inner_join_sql('c_normal', 'Node_To_Challenge ntc', 'id', 'challenge_id')
        query += inner_join_sql('ntc', 'Node node', 'node_id', 'id')
        query += inner_join_sql('node', 'BeatmapInfo beatmapinfo', 'beatmap_info_id', 'id')
        query += inner_join_sql('node', 'MasterChallenge masterinfo', 'master_challenge_id', 'id')
        query += inner_join_sql('masterinfo', 'BeatmapInfo master_beatmapinfo', 'beatmap_info_id', 'id')
        query += inner_join_sql('masterinfo', 'Challenge c_master', 'challenge_id', 'id')
        query += where_sql('beatmapinfo.id', id)

        return exec_get_all(query)
