CREATE TABLE BeatmapInfo(
    id serial PRIMARY KEY,
    title varchar(100),
    artist varchar(50),
    mapper varchar(50),
    difficulty_name varchar(100),
    star_rating float,
    map_link varchar(500)
);

CREATE TABLE Challenge(
    id serial PRIMARY KEY,
    rank varchar(10)
    mod varchar(10)
    isCompleted integer,
    CONSTRAINT rank_challenge_link FOREIGN KEY (rank_id) REFERENCES Rank(id)
);

CREATE TABLE MasterChallenge(
    id serial PRIMARY KEY,
    beatmap_info_id integer,
    challenge_id integer,
    CONSTRAINT beatmap_master_challenge_link FOREIGN KEY (beatmap_info_id) REFERENCES BeatmapInfo(id),
    CONSTRAINT challenge_master_challenge_link FOREIGN KEY (challenge_id) REFERENCES Challenge(id)
);

CREATE TABLE Node(
    id serial PRIMARY KEY,
    beatmap_info_id integer,
    master_challenge_id integer,
    isLocked integer,
    CONSTRAINT beatmap_node_link FOREIGN KEY (beatmap_info_id) REFERENCES BeatmapInfo(id),
    CONSTRAINT master_challenge_node_link FOREIGN KEY (master_challenge_id) REFERENCES MasterChallenge(id)
);

CREATE TABLE Node_To_Challenge(
    id serial PRIMARY KEY,
    node_id integer,
    challenge_id integer,
    challenge_level integer,
    CONSTRAINT node_key FOREIGN KEY (node_id) REFERENCES Node(id),
    CONSTRAINT challenge_key FOREIGN KEY (challenge_id) REFERENCES Challenge(id)
);

CREATE TABLE Node_To_Node(
    id serial PRIMARY KEY,
    node_before_id integer,
    node_after_id integer,
    CONSTRAINT node_before_key FOREIGN KEY (node_before_id) REFERENCES Node(id),
    CONSTRAINT node_after_key FOREIGN KEY (node_after_id) REFERENCES Node(id)
);
