from flask import Flask
from flask_restful import Api

from api.osu_campaign_api import *

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api router

api.add_resource(BeatmapInfoApi, '/beatmapinfo')

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('sql/drop.sql')
    exec_sql_file('sql/create.sql')
    exec_sql_file('sql/initData.sql')
    print("Starting flask")
    app.run(debug=True)  # starts Flask
