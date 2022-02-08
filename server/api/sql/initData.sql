INSERT INTO BeatmapInfo(title, artist, mapper, difficulty_name, star_rating, map_link) VALUES
('(can you) understand me?', 'Komiya Mao', 'Sotarks', 'uhh?', 5.06, 'https://osu.ppy.sh/beatmapsets/456986#osu/979155'),
('(can you) understand me?', 'Komiya Mao', 'Okoratu', 'huh?', 5.38, 'https://osu.ppy.sh/beatmapsets/409898#osu/889634'),
('2004 Breakup', 'The Gentle Men', 'Mimari', '2004', 4.82, 'https://osu.ppy.sh/beatmapsets/1275814#osu/2650781'),
('2004 Breakup', 'The Gentle Men', 'Reiji Maigo', 'This song is about Tragic Love', 5.71, 'https://osu.ppy.sh/beatmapsets/1485186#osu/3045587'),
('A FOOL MOON NIGHT', 'The Koxx', 'Astar', 'Friendofox''s Galaxy', 9.45, 'https://osu.ppy.sh/beatmapsets/524026#osu/1134237'),
('A FOOL MOON NIGHT', 'The Koxx', 'Astar', 'Piggey''s Destruction', 9.47, 'https://osu.ppy.sh/beatmapsets/524026#osu/1186901'),
('AaAaAaAAaAaAAa', 'Nashimoto Ui', 'Sotarks', 'aAaAaaAaAaaA', 6.1, 'https://osu.ppy.sh/beatmapsets/1017271#osu/2129143'),
('Acchu~ma Seishun!', 'Nanamori-chu*Gorakubu', 'Pata-Mon', 'Fycho''s Seishun', 5.66, 'https://osu.ppy.sh/beatmapsets/451830#osu/969681'),
('Acid Rain', 'Culprate', 'SnowNiNo_', 'Aspire', 6.28, 'https://osu.ppy.sh/beatmapsets/980599#osu/2052199'),
('ADAMAS (TV Size)', 'LiSa', 'Doormat', 'Fragrant Olive', 6.3, 'https://osu.ppy.sh/beatmapsets/859608#osu/1799197'),
('Ai no Sukima', 'MIMI feat. Hatsune Miku', 'Log Off Now', 'Radiance', 5.45, 'https://osu.ppy.sh/beatmapsets/952409#osu/1988753'),
('Airman ga Taosenai (SOUND HOLIC Ver.)', 'Hanatan', 'Natsu', 'CRN''s Extra', 6.23, 'https://osu.ppy.sh/beatmapsets/134151#osu/338682'),
('Aishite Aishite Aishite', 'Kikuo', 'nyu -', 'Ezreal''s Insane', 4.29, 'https://osu.ppy.sh/beatmapsets/429956#osu/937170');

INSERT INTO Challenge(rank, mod, isCompleted) VALUES
('B-Rank', 'NM', 0),
('FC', 'NM', 0),
('FC', 'HD', 0),
('FC', 'DT', 0),
('FC', 'HDDTHR', 0),
('FC', 'HDDT', 0),
('FC', 'HDHR', 0),
('50%', 'NFHT', 0),
('C-Rank', 'NFHT', 0),
('C-Rank', 'HT', 0),
('B-Rank', 'NF', 0),
('Pass', 'NM', 0);


INSERT INTO MasterChallenge(beatmap_info_id, challenge_id) VALUES
(2, 6),
(4, 3),
(6, 12);

INSERT INTO Node(beatmap_info_id, master_challenge_id, isUnlocked) VALUES
(1, 1, 0),
(3, 2, 0),
(4, 3, 0);

INSERT INTO Node_To_Challenge(node_id, challenge_id, challenge_level) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5),
(2, 1, 1), (2, 2, 2), (2, 3, 3), (2, 7, 4), (2, 6, 5),
(3, 8, 1), (3, 9, 2), (3, 10, 3), (3, 11, 4), (3, 12, 5);

