-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: turomas_plantillas
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campos`
--

DROP TABLE IF EXISTS `campos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campos` (
  `id_campo` bigint NOT NULL AUTO_INCREMENT,
  `campo_nombre` varchar(255) DEFAULT NULL,
  `left` double DEFAULT NULL,
  `top` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `id_plantilla` bigint DEFAULT NULL,
  PRIMARY KEY (`id_campo`),
  KEY `FKfr33h17mxlbfwdrr7qbr00q2p` (`id_plantilla`),
  CONSTRAINT `FKfr33h17mxlbfwdrr7qbr00q2p` FOREIGN KEY (`id_plantilla`) REFERENCES `plantillas` (`id_plantilla`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campos`
--

LOCK TABLES `campos` WRITE;
/*!40000 ALTER TABLE `campos` DISABLE KEYS */;
INSERT INTO `campos` VALUES (2,'dimensiones',2,5,5,1,1),(3,'Num.Hojas',5,4,3,1,1),(10,'Lote',2,11,4,1,1),(13,'dimensiones',3.5,1,5.5,1,5),(14,'Num.Hojas',7,3.25,1,0.75,5),(15,'Lote',1.5,6.75,5.25,1.25,5),(16,'dimensiones',3.25,1,3.6,0.8,4),(17,'Num.Hojas',5.5,4.5,1,0.5,4),(18,'Lote',1.5,7.75,4,0.75,4),(19,'dimensiones',0.75,4.5,4.25,0.5,3),(20,'Num.Hojas',2.5,5,0.5,0.5,3),(21,'Lote',0,1,6,1,3);
/*!40000 ALTER TABLE `campos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-16 11:22:25
