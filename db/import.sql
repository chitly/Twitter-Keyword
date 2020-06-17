DROP TABLE IF EXISTS `Tweets`;
CREATE TABLE `Tweets` (
  `Id` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `UserId` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Text` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Lang` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Nretweet` int NOT NULL,
  `Nfavorite` int NOT NULL,
  `Nreply` int NOT NULL,
  `Nqoute` int NOT NULL,
  `ParentId` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ParentUserId` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CreatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Keywords`;
CREATE TABLE `CUCovid`.`Keywords` (
  `Keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `Tweets_Keywords`;
CREATE TABLE `CUCovid`.`Tweets_Keywords` (
  `TweetId` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  PRIMARY KEY (`TweetId`, `Keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Topics_Keywords`;
CREATE TABLE `CUCovid`.`Topics_Keywords` (
  `Topic` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Keyword` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Topic`, `Keywords`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Domains_Topics`;
CREATE TABLE `CUCovid`.`Domains_Topics` (
  `Domain` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Topic` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Domain`, `Topic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
