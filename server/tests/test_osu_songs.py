import unittest
import decimal
from server.api.osu_songs import *


class TestChat(unittest.TestCase):
    """
    A tests class for chat.py implementations
    """

    def setUp(self):
        wipe_tables()
        exec_sql_file("../tests/testData.sql")

    def test_setup_tables(self):
        expected_result = []

        wipe_tables()
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM BeatmapInfo")
        actual_result = cur.fetchall()
        conn.close()

        self.assertEqual(expected_result, actual_result,
                         "The table setup process is incorrect.")

    def test_get_all_info(self):
        expected = [(1, '(can you) understand me?', 'Komiya Mao', 'Okoratu', 'huh?', 5.38, 'https://osu.ppy.sh/beatmapsets/409898#osu/889634'),
                    (2, '2004 Breakup', 'The Gentle Men', 'Mimari', '2004', 4.82, 'https://osu.ppy.sh/beatmapsets/1275814#osu/2650781'),
                    (3, 'A FOOL MOON NIGHT', 'The Koxx', 'Astar', "Piggey's Destruction", 9.47, 'https://osu.ppy.sh/beatmapsets/524026#osu/1186901'),
                    (4, 'AaAaAaAAaAaAAa', 'Nashimoto Ui', 'Sotarks', 'aAaAaaAaAaaA', 6.1, 'https://osu.ppy.sh/beatmapsets/1017271#osu/2129143'),
                    (5, 'Above the Clouds', 'Helblinde', 'Asserin', 'Above the Collab', 4.67, 'https://osu.ppy.sh/beatmapsets/416444#osu/902088')]

        actual = get_all_info()

        self.assertEqual(expected, actual, "All info is not in database.")

    def test_add_beatmap(self):
        expected = [(1, '(can you) understand me?', 'Komiya Mao', 'Okoratu', 'huh?', 5.38, 'https://osu.ppy.sh/beatmapsets/409898#osu/889634'),
                    (2, '2004 Breakup', 'The Gentle Men', 'Mimari', '2004', 4.82, 'https://osu.ppy.sh/beatmapsets/1275814#osu/2650781'),
                    (3, 'A FOOL MOON NIGHT', 'The Koxx', 'Astar', "Piggey's Destruction", 9.47, 'https://osu.ppy.sh/beatmapsets/524026#osu/1186901'),
                    (4, 'AaAaAaAAaAaAAa', 'Nashimoto Ui', 'Sotarks', 'aAaAaaAaAaaA', 6.1, 'https://osu.ppy.sh/beatmapsets/1017271#osu/2129143'),
                    (5, 'Above the Clouds', 'Helblinde', 'Asserin', 'Above the Collab', 4.67, 'https://osu.ppy.sh/beatmapsets/416444#osu/902088'),
                    (6, 'Acchu~ma Seishun!', 'Nanamori-chu*Gorakubu', 'Pata-Mon', 'Fycho''s Seishun', 5.66, 'https://osu.ppy.sh/beatmapsets/451830#osu/969681')]

        add_beatmap('Acchu~ma Seishun!', 'Nanamori-chu*Gorakubu', 'Pata-Mon', 'Fycho''s Seishun', 5.66, 'https://osu.ppy.sh/beatmapsets/451830#osu/969681')
        actual = get_all_info()

        self.assertEqual(expected, actual, "Did not add song correctly")
