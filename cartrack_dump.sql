-- MySQL dump 10.13  Distrib 9.3.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: CarTrack_database_2
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Anvandare`
--

DROP TABLE IF EXISTS `Anvandare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Anvandare` (
  `anvandare_id` int NOT NULL AUTO_INCREMENT,
  `namn` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `losenord` varchar(255) NOT NULL,
  `roll` enum('Admin','Anstalld') NOT NULL DEFAULT 'Anstalld',
  PRIMARY KEY (`anvandare_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Anvandare`
--

LOCK TABLES `Anvandare` WRITE;
/*!40000 ALTER TABLE `Anvandare` DISABLE KEYS */;
INSERT INTO `Anvandare` VALUES (1,'Daniel','daniel@cardealorebro.se','cf00958f9ad4b1fa8e304c6a0d9de6354b025bfcc72024ce8808ff51e2a3f98a','Admin'),(2,'Amar','amar@cardealorebro.se','cf00958f9ad4b1fa8e304c6a0d9de6354b025bfcc72024ce8808ff51e2a3f98a','Admin');
/*!40000 ALTER TABLE `Anvandare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Atgard`
--

DROP TABLE IF EXISTS `Atgard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Atgard` (
  `atgard_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `anstalld` varchar(100) DEFAULT NULL,
  `kommentar` text,
  `sista_datum` date DEFAULT NULL,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  PRIMARY KEY (`atgard_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `atgard_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Atgard`
--

LOCK TABLES `Atgard` WRITE;
/*!40000 ALTER TABLE `Atgard` DISABLE KEYS */;
INSERT INTO `Atgard` VALUES (8,'Test','Test','TEst','2025-04-18','2025-04-01','2025-04-01',1),(11,'asc','asc','asc','2025-04-25','2025-04-02','2025-04-02',1),(12,'qwd','qwd','qwd','2025-05-23','2025-05-09','2025-05-09',1);
/*!40000 ALTER TABLE `Atgard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Besiktning`
--

DROP TABLE IF EXISTS `Besiktning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Besiktning` (
  `besiktning_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `sista_bes_datum` date DEFAULT NULL,
  `kommentar` text,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  PRIMARY KEY (`besiktning_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `besiktning_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Besiktning`
--

LOCK TABLES `Besiktning` WRITE;
/*!40000 ALTER TABLE `Besiktning` DISABLE KEYS */;
INSERT INTO `Besiktning` VALUES (43,'asdpkoakTTT','2025-04-16','RAL','2025-04-01','2025-04-01',1),(44,'qwd','2025-05-17','qwd','2025-05-09','2025-05-09',1),(45,'qwd','2025-05-17','qwdqwdqwd','2025-05-09',NULL,1);
/*!40000 ALTER TABLE `Besiktning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Korning`
--

DROP TABLE IF EXISTS `Korning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Korning` (
  `korning_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `korningstyp` enum('Leverans','Hämtning') DEFAULT NULL,
  `forare` varchar(100) DEFAULT NULL,
  `kommentar` text,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `planerat_datum` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  PRIMARY KEY (`korning_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `korning_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Korning`
--

LOCK TABLES `Korning` WRITE;
/*!40000 ALTER TABLE `Korning` DISABLE KEYS */;
INSERT INTO `Korning` VALUES (9,'HPG 876','Hämtning','William','Bil är köpt från KVD','2025-05-09',NULL,'2025-04-24',1),(10,'TPG 882','Leverans','David','Leverans till Halmstad Göttavägen 2, 705 62\nTelefonnummer: 072 662 1859','2025-04-07','2025-05-05','2025-05-09',1);
/*!40000 ALTER TABLE `Korning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kundregister`
--

DROP TABLE IF EXISTS `Kundregister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Kundregister` (
  `kund_id` int NOT NULL AUTO_INCREMENT,
  `anvandare_id` int DEFAULT NULL,
  `k_regnmr` varchar(20) DEFAULT NULL,
  `i_regnmr` varchar(20) DEFAULT NULL,
  `telefonnummer` varchar(20) DEFAULT NULL,
  `mailadress` varchar(255) DEFAULT NULL,
  `kommentar` text,
  `anteckning` text,
  `bud` decimal(15,2) DEFAULT NULL,
  `onskat_pris` decimal(15,2) DEFAULT NULL,
  `inbytespris` decimal(15,2) DEFAULT NULL,
  `trygg_inbytespris` decimal(15,2) DEFAULT NULL,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  PRIMARY KEY (`kund_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `kundregister_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kundregister`
--

LOCK TABLES `Kundregister` WRITE;
/*!40000 ALTER TABLE `Kundregister` DISABLE KEYS */;
INSERT INTO `Kundregister` VALUES (1,1,'ULK 898','KLK 323','078 989 8989','hej@gmail.com','hej','HEJ',100000000.00,100000000.00,100000000.00,1000.00,'2025-05-05','2025-05-05'),(2,1,'BAC 898','UHF 908','0809822983','oijaodf@giasd.com','ijfoijoifjqw','efbwibd',10000.00,10000.00,100000000.00,10000000.00,'2025-05-09','2025-05-09');
/*!40000 ALTER TABLE `Kundregister` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lackering`
--

DROP TABLE IF EXISTS `Lackering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Lackering` (
  `lackering_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `firma` varchar(255) DEFAULT NULL,
  `delar` varchar(255) DEFAULT NULL,
  `kommentar` text,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  `bild_url` text,
  PRIMARY KEY (`lackering_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `lackering_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lackering`
--

LOCK TABLES `Lackering` WRITE;
/*!40000 ALTER TABLE `Lackering` DISABLE KEYS */;
INSERT INTO `Lackering` VALUES (67,'MGO 709','Petras','Front, V.Framskärm, V. Bakdörr, V. Framdörr','Kund ville köpa nya vinterdäck','2025-04-07','2025-04-07',1,NULL),(68,'GYU 654','Petras','Stötfångare bak, Baklucka, V. Bakskärm','Kommer nog skickas på rekond efter',NULL,NULL,1,'uploads/1744033337300-35B30B0C-785B-4FEB-87A8-DFE8D4683B2C.jpeg'),(69,'HGT 898','Petras','Tak, Baklucka, V. Framdörr','Kund behöver detta fixat idag 2 april','2025-04-02','2025-04-07',1,NULL),(77,'ABC 123','Petras','Front, V.Framskärm, Stötfångare bak','hejdå','2025-05-05','2025-05-09',1,NULL),(78,'OSKAR','OSKAR','Front','OSAKR','2025-05-05','2025-05-05',1,'uploads/1746459993510-Bild1.png'),(79,'ABC 789','Oskar','Front, V.Framskärm, Stötfångare bak, V. Tröskel','Bil ska pwras','2025-05-09',NULL,1,'uploads/1746776423195-Bild2.png'),(81,'as','as','V.Framskärm','as',NULL,NULL,1,NULL),(82,'AKU 898','Petras','Huv, V. Tröskel, Stötfångare bak','Hej jag vill att denna bilen ska pwras och få en rekond, oskar ville att denna kommentaren skulle vara jättelång så här kommer hen jättelång kommentar: hejehejehjehfhowijfoewjiojhweiofjweoifjiowejfiowehfiowehfiohweiufhweiufhweiufhbuweifhbiuwehbfuiwehfuiwehfiuwebhfuiwehbfiu','2025-05-09','2025-05-09',1,NULL);
/*!40000 ALTER TABLE `Lackering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PWR`
--

DROP TABLE IF EXISTS `PWR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PWR` (
  `pwr_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `delar` varchar(255) DEFAULT NULL,
  `kommentar` text,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  `bild_url` text,
  PRIMARY KEY (`pwr_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `pwr_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PWR`
--

LOCK TABLES `PWR` WRITE;
/*!40000 ALTER TABLE `PWR` DISABLE KEYS */;
INSERT INTO `PWR` VALUES (12,'Test','V.Framskärm, Front','test','2025-04-01','2025-04-01',1,NULL),(13,'asd','Baklucka','asd','2025-04-01','2025-04-01',1,NULL),(14,'dsv','Front','sdv','2025-04-01','2025-04-01',1,NULL),(15,'fan','Huv','ates','2025-04-01','2025-04-01',1,NULL),(16,'qfcqw','Huv','qwcq','2025-04-01','2025-04-01',1,NULL),(17,'as','Front','as','2025-05-05','2025-05-05',1,NULL),(18,'hej','V.Framskärm','hej','2025-05-09','2025-05-09',1,NULL);
/*!40000 ALTER TABLE `PWR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rekond`
--

DROP TABLE IF EXISTS `Rekond`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rekond` (
  `rekond_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `firma` varchar(255) DEFAULT NULL,
  `tvatt` varchar(255) DEFAULT NULL,
  `kommentar` text,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  `bild_url` text,
  PRIMARY KEY (`rekond_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `rekond_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rekond`
--

LOCK TABLES `Rekond` WRITE;
/*!40000 ALTER TABLE `Rekond` DISABLE KEYS */;
INSERT INTO `Rekond` VALUES (17,'Test','test','test','test','2025-04-01','2025-04-01',1,NULL),(19,'hej','hej','hej','hej',NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `Rekond` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tavling`
--

DROP TABLE IF EXISTS `Tavling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tavling` (
  `tavling_id` int NOT NULL AUTO_INCREMENT,
  `anvandare_id` int NOT NULL,
  `vecka` int NOT NULL,
  `antal_salda_bilar` int NOT NULL DEFAULT '0',
  `merforsaljning` decimal(10,2) NOT NULL DEFAULT '0.00',
  `pris` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tavling_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `tavling_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tavling`
--

LOCK TABLES `Tavling` WRITE;
/*!40000 ALTER TABLE `Tavling` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tavling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Verkstad`
--

DROP TABLE IF EXISTS `Verkstad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Verkstad` (
  `verkstad_id` int NOT NULL AUTO_INCREMENT,
  `regnr` varchar(20) NOT NULL,
  `typ_av_jobb` varchar(255) DEFAULT NULL,
  `kommentar` text,
  `datum_s` date DEFAULT NULL,
  `datum_t` date DEFAULT NULL,
  `anvandare_id` int NOT NULL,
  `bild_url` text,
  PRIMARY KEY (`verkstad_id`),
  KEY `anvandare_id` (`anvandare_id`),
  CONSTRAINT `verkstad_ibfk_1` FOREIGN KEY (`anvandare_id`) REFERENCES `Anvandare` (`anvandare_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Verkstad`
--

LOCK TABLES `Verkstad` WRITE;
/*!40000 ALTER TABLE `Verkstad` DISABLE KEYS */;
INSERT INTO `Verkstad` VALUES (20,'sdv','sdv','sdv','2025-04-01','2025-04-01',1,NULL),(22,'df ','fd ','dfv','2025-05-05','2025-05-05',1,NULL),(23,'dfv','dfv','dfv','2025-05-05','2025-05-05',1,NULL),(24,'dfv','dfv','dfv','2025-05-05','2025-05-05',1,NULL),(25,'dfv','dfvd','fv','2025-05-05','2025-05-05',1,NULL),(26,'dfv','dfvd','fv','2025-05-05','2025-05-05',1,NULL),(27,'dfv','dfv','dfv','2025-05-05','2025-05-05',1,NULL),(28,'Hej','hej','hej','2025-05-09','2025-05-09',1,NULL);
/*!40000 ALTER TABLE `Verkstad` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 16:33:54
