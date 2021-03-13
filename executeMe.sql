SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `license`;
USE `license`;

DROP TABLE IF EXISTS `licenses`;
CREATE TABLE `licenses`  (
     `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
     `moderator` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
     `timestamp` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
     PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;