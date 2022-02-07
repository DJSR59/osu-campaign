from api.db_utils import *
from api.sql_commands import *


def wipe_tables():
    """
    Rebuilds the tables to create clean slates.
    """
    exec_sql_file("sql/drop.sql")
    exec_sql_file("sql/create.sql")


def format_string(text):
    return '\'%s\'' % text


def get_all_info():
    return exec_get_all("SELECT * FROM BeatmapInfo")


def add_beatmap(title, artist, mapper, diff_name, star_rating, map_link):
    columns = ['title', 'artist', 'mapper', 'difficulty_name', 'star_rating', 'map_link']
    values = [format_string(title), format_string(artist), format_string(mapper), format_string(diff_name),
              star_rating, format_string(map_link)]

    query = insert_sql("BeatmapInfo", columns, values)
    exec_commit(query)
