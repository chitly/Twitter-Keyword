DROP TABLE IF EXISTS `Tweets`;
CREATE TABLE `Tweets` (
  `Id` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `UserId` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Text` VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Lang` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Nretweet` INT NOT NULL,
  `Nfavorite` INT NOT NULL,
  `Nreply` INT NOT NULL,
  `Nqoute` INT NOT NULL,
  `ParentId` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ParentUserId` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CreatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `CUCovid`.`Users` (
  `Id` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NOT NULL,
  `Name` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Screen_name` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Location` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `Descrption` VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `Url` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Nfollower` INT NOT NULL,
  `Nfriend` INT NOT NULL,
  `Nlisted` INT NOT NULL,
  `Nfavourite` INT NOT NULL,
  `Nstatus` INT NOT NULL,
  `Nmedia` INT NOT NULL,
  `Advertiser` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Keywords`;
CREATE TABLE `CUCovid`.`Keywords` (
  `Keyword` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `Tweets_Keywords`;
CREATE TABLE `CUCovid`.`Tweets_Keywords` (
  `TweetId` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Keyword` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
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
