ALTER TABLE IF EXISTS MasterChallenge
DROP CONSTRAINT beatmap_master_challenge_link,
DROP CONSTRAINT challenge_master_challenge_link;

ALTER TABLE IF EXISTS Node
DROP CONSTRAINT beatmap_node_link,
DROP CONSTRAINT master_challenge_node_link;

ALTER TABLE IF EXISTS Node_To_Challenge
DROP CONSTRAINT node_key,
DROP CONSTRAINT challenge_key;

ALTER TABLE IF EXISTS Node_To_Node
DROP CONSTRAINT node_before_key,
DROP CONSTRAINT node_after_key;

DROP TABLE IF EXISTS BeatmapInfo;
DROP TABLE IF EXISTS Challenge;
DROP TABLE IF EXISTS MasterChallenge;
DROP TABLE IF EXISTS Node;
DROP TABLE IF EXISTS Node_To_Challenge;
DROP TABLE IF EXISTS Node_To_Node;