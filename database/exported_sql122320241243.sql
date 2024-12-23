CREATE DATABASE  IF NOT EXISTS `rufrent` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rufrent`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: rufrent
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `dy_amenities`
--

DROP TABLE IF EXISTS `dy_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amenity` int DEFAULT NULL,
  `community` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `ammenity_fk_id_idx` (`amenity`),
  KEY `community_fk_id_idx` (`community`),
  CONSTRAINT `ammenity_fk_id` FOREIGN KEY (`amenity`) REFERENCES `st_amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_fk_id` FOREIGN KEY (`community`) REFERENCES `st_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for amenities percommunity';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_amenities`
--

LOCK TABLES `dy_amenities` WRITE;
/*!40000 ALTER TABLE `dy_amenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `dy_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_landmarks`
--

DROP TABLE IF EXISTS `dy_landmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_landmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `landmark_name` varchar(60) DEFAULT NULL,
  `distance(kms)` double DEFAULT NULL,
  `landmark_category_id` int DEFAULT NULL,
  `community_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_landmark_cat_id_idx` (`landmark_category_id`),
  KEY `fk_community_id_idx` (`community_id`),
  CONSTRAINT `fk_community_id` FOREIGN KEY (`community_id`) REFERENCES `st_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_landmark_cat_id` FOREIGN KEY (`landmark_category_id`) REFERENCES `st_landmarks_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Landmarks';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_landmarks`
--

LOCK TABLES `dy_landmarks` WRITE;
/*!40000 ALTER TABLE `dy_landmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `dy_landmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_property`
--

DROP TABLE IF EXISTS `dy_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `prop_type_id` int DEFAULT NULL,
  `home_type_id` int DEFAULT NULL,
  `prop_desc_id` int DEFAULT NULL,
  `community_id` int DEFAULT NULL,
  `no_beds` int DEFAULT NULL,
  `no_baths` int DEFAULT NULL,
  `no_balconies` varchar(10) DEFAULT NULL,
  `tenant_type_id` int DEFAULT NULL,
  `tenant_eat_pref_id` int DEFAULT NULL,
  `parking_type_id` int DEFAULT NULL,
  `parking_count_id` int DEFAULT NULL,
  `deposit_range_id` int DEFAULT NULL,
  `gender_pref` int DEFAULT NULL,
  `availabl_date` datetime DEFAULT NULL,
  `current_status` int DEFAULT NULL,
  `tower_no` int DEFAULT NULL,
  `floor_no` int DEFAULT NULL,
  `flat_no` int DEFAULT NULL,
  `images_location` text,
  `rec_add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rec_last_update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rental_low` double DEFAULT NULL,
  `maintenance_id` int DEFAULT NULL,
  `rental_high` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `prop_fk_user_id_idx` (`user_id`),
  KEY `prop_fk_prop_type_id_idx` (`prop_type_id`),
  KEY `prop_fk_prop_desc_id_idx` (`prop_desc_id`),
  KEY `prop_fk_home_type_id_idx` (`home_type_id`),
  KEY `prop_fk_comm_id_idx` (`community_id`),
  KEY `prop_fk_bed_id_idx` (`no_beds`),
  KEY `prop_fk_bath_id_idx` (`no_baths`),
  KEY `prop_fk_balcony_id_idx` (`no_balconies`),
  KEY `prop_fk_user_type_id_idx` (`tenant_type_id`),
  KEY `prop_fk_tenant_eat_pref_id_idx` (`tenant_eat_pref_id`),
  KEY `prop_fk_park_type_id_idx` (`parking_type_id`),
  KEY `prop_fk_park_count_idx` (`parking_count_id`),
  KEY `prop_fk_dep_id_idx` (`deposit_range_id`),
  KEY `prop_gen_pref_id_idx` (`gender_pref`),
  KEY `prop_fk_current_status_id_idx` (`current_status`),
  KEY `prop_fk_maint_id_idx` (`maintenance_id`),
  CONSTRAINT `prop_fk_bath_id` FOREIGN KEY (`no_baths`) REFERENCES `st_baths` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prop_fk_bed_id` FOREIGN KEY (`no_beds`) REFERENCES `st_beds` (`id`),
  CONSTRAINT `prop_fk_comm_id` FOREIGN KEY (`community_id`) REFERENCES `st_community` (`id`),
  CONSTRAINT `prop_fk_current_status_id` FOREIGN KEY (`current_status`) REFERENCES `st_current_status_old` (`id`),
  CONSTRAINT `prop_fk_dep_id` FOREIGN KEY (`deposit_range_id`) REFERENCES `st_deposit_range` (`id`),
  CONSTRAINT `prop_fk_gen_pref_id` FOREIGN KEY (`gender_pref`) REFERENCES `st_gender` (`id`),
  CONSTRAINT `prop_fk_home_type_id` FOREIGN KEY (`home_type_id`) REFERENCES `st_home_type` (`id`),
  CONSTRAINT `prop_fk_maint_id` FOREIGN KEY (`maintenance_id`) REFERENCES `st_maintenance` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prop_fk_park_count` FOREIGN KEY (`parking_count_id`) REFERENCES `st_parking_count` (`id`),
  CONSTRAINT `prop_fk_park_type_id` FOREIGN KEY (`parking_type_id`) REFERENCES `st_parking_type` (`id`),
  CONSTRAINT `prop_fk_prop_desc_id` FOREIGN KEY (`prop_desc_id`) REFERENCES `st_prop_desc` (`id`),
  CONSTRAINT `prop_fk_prop_type_id` FOREIGN KEY (`prop_type_id`) REFERENCES `st_prop_type` (`id`),
  CONSTRAINT `prop_fk_tenant_eat_pref_id` FOREIGN KEY (`tenant_eat_pref_id`) REFERENCES `st_tenant_eat_pref` (`id`),
  CONSTRAINT `prop_fk_tenant_type_id` FOREIGN KEY (`tenant_type_id`) REFERENCES `st_tenant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Property Data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_property`
--

LOCK TABLES `dy_property` WRITE;
/*!40000 ALTER TABLE `dy_property` DISABLE KEYS */;
INSERT INTO `dy_property` VALUES (1,3,1,1,1,7,1,1,'1',1,1,1,1,1,NULL,'2025-01-01 00:00:00',1,1,1,1,NULL,'2024-12-18 07:35:06','2024-12-18 07:35:06',1,1,1),(2,4,2,2,2,3,2,2,'2',2,2,2,2,2,NULL,'2025-02-01 00:00:00',1,2,2,2,NULL,'2024-12-18 07:35:06','2024-12-18 07:35:06',1,2,1),(3,1,3,2,3,2,6,4,'5',2,2,NULL,3,5,NULL,'2025-01-01 00:00:00',NULL,2,3,5,'','2024-12-19 11:15:14','2024-12-19 11:15:14',1,1,1),(4,1,3,2,3,2,6,4,'5',2,2,NULL,3,5,NULL,'2025-01-01 00:00:00',NULL,2,3,5,'','2024-12-19 11:16:23','2024-12-19 11:16:23',1,1,1),(5,1,3,2,3,2,6,4,'5',2,2,NULL,3,5,NULL,'2025-01-01 00:00:00',NULL,2,3,5,NULL,'2024-12-19 11:18:07','2024-12-19 11:18:07',1,1,1),(6,2,3,2,3,2,6,4,'5',2,2,NULL,3,5,NULL,'2025-01-01 00:00:00',NULL,2,3,5,NULL,'2024-12-19 11:19:52','2024-12-19 11:19:52',1,1,1),(7,2,3,5,3,2,6,4,'5',2,2,NULL,3,5,NULL,'2025-01-01 00:00:00',NULL,2,3,5,NULL,'2024-12-20 05:30:46','2024-12-20 05:30:46',1,1,1),(8,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:12:52','2024-12-20 09:12:52',NULL,NULL,NULL),(9,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:14:29','2024-12-20 09:14:29',NULL,NULL,NULL),(10,1,2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:17:36','2024-12-20 09:17:36',NULL,NULL,NULL),(11,1,2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:19:47','2024-12-20 09:19:47',NULL,NULL,NULL),(12,1,2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:21:07','2024-12-20 09:21:07',NULL,NULL,NULL),(13,3,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:24:38','2024-12-20 09:24:38',NULL,NULL,NULL),(14,3,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:25:05','2024-12-20 09:25:05',NULL,NULL,NULL),(15,3,3,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 09:27:05','2024-12-20 09:27:05',NULL,NULL,NULL),(16,2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-20 10:01:05','2024-12-20 10:01:05',NULL,NULL,NULL);
/*!40000 ALTER TABLE `dy_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_refferal_history`
--

DROP TABLE IF EXISTS `dy_refferal_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_refferal_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `refferral_id` int DEFAULT NULL,
  `referral_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_ref_id_idx` (`user_id`),
  KEY `fk_user_refferal_id_idx` (`refferral_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Tracking Referral History';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_refferal_history`
--

LOCK TABLES `dy_refferal_history` WRITE;
/*!40000 ALTER TABLE `dy_refferal_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `dy_refferal_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_rm_fm_com_map`
--

DROP TABLE IF EXISTS `dy_rm_fm_com_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_rm_fm_com_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `community_id` int DEFAULT '-999',
  `rm_id` int DEFAULT '-9999',
  `fm_id` int DEFAULT '-99999',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_com_map_data_idx` (`community_id`),
  KEY `fk_rm_map_data_idx` (`rm_id`),
  KEY `fk_fm_map_data_idx` (`fm_id`),
  CONSTRAINT `fk_com_map_data` FOREIGN KEY (`community_id`) REFERENCES `st_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rm_map_data` FOREIGN KEY (`rm_id`) REFERENCES `dy_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Dynamic Table for Mapping RM and FM with Community';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_rm_fm_com_map`
--

LOCK TABLES `dy_rm_fm_com_map` WRITE;
/*!40000 ALTER TABLE `dy_rm_fm_com_map` DISABLE KEYS */;
INSERT INTO `dy_rm_fm_com_map` VALUES (1,7,5,9),(2,7,6,10),(3,3,7,11),(4,3,8,12);
/*!40000 ALTER TABLE `dy_rm_fm_com_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_services_details`
--

DROP TABLE IF EXISTS `dy_services_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_services_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `service_status` varchar(45) DEFAULT NULL,
  `service_start_date` datetime DEFAULT NULL,
  `service_end_date` datetime DEFAULT NULL,
  `service_Description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Services Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_services_details`
--

LOCK TABLES `dy_services_details` WRITE;
/*!40000 ALTER TABLE `dy_services_details` DISABLE KEYS */;
INSERT INTO `dy_services_details` VALUES (1,NULL,'Active','2024-12-13 00:00:00','2024-12-28 00:00:00','free'),(2,NULL,'Active','2024-12-14 09:10:00','2025-02-12 09:10:00','basic'),(3,NULL,'Active','2024-12-14 09:21:00','2025-02-27 09:21:00','standard');
/*!40000 ALTER TABLE `dy_services_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_transactions`
--

DROP TABLE IF EXISTS `dy_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `prop_id` int DEFAULT NULL,
  `bp_id` int DEFAULT NULL,
  `svcs_id` int DEFAULT NULL,
  `tr_st_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tr_upd_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prev_stat_code` int DEFAULT '1',
  `cur_stat_code` int DEFAULT '1',
  `rm_id` int DEFAULT NULL,
  `fm_id` int DEFAULT NULL,
  `schedule_time` varchar(8) DEFAULT NULL,
  `schedule_date` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_dar_id_idx` (`user_id`),
  KEY `fk_prop_data_id_idx` (`prop_id`),
  KEY `fk_billing_data_id_idx` (`bp_id`),
  KEY `fk_service_data_id_idx` (`svcs_id`),
  KEY `fk_rm_tr_data_idx` (`rm_id`),
  KEY `fk_fm_tr_data_idx` (`fm_id`),
  KEY `fk_status_prev_code_idx` (`prev_stat_code`),
  KEY `fk_status_cur_code_idx` (`cur_stat_code`),
  CONSTRAINT `fk_billing_data_id` FOREIGN KEY (`bp_id`) REFERENCES `st_billing_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_prop_data_id` FOREIGN KEY (`prop_id`) REFERENCES `dy_property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rm_tr_data` FOREIGN KEY (`rm_id`) REFERENCES `dy_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_service_data_id` FOREIGN KEY (`svcs_id`) REFERENCES `dy_services_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_status_cur_code` FOREIGN KEY (`cur_stat_code`) REFERENCES `st_current_status` (`id`),
  CONSTRAINT `fk_status_prev_code` FOREIGN KEY (`prev_stat_code`) REFERENCES `st_current_status` (`id`),
  CONSTRAINT `fk_user_data_id` FOREIGN KEY (`user_id`) REFERENCES `dy_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for dynamic transactions';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_transactions`
--

LOCK TABLES `dy_transactions` WRITE;
/*!40000 ALTER TABLE `dy_transactions` DISABLE KEYS */;
INSERT INTO `dy_transactions` VALUES (1,1,1,NULL,NULL,'2024-12-18 07:37:21','2024-12-18 07:40:33',1,3,7,11,'10:30:00','2024-12-18'),(2,2,2,NULL,NULL,'2024-12-18 07:38:04','2024-12-18 07:41:09',1,3,8,12,'12:30:00','2024-12-19'),(3,1,1,NULL,NULL,'2024-12-20 09:30:52','2024-12-20 09:30:52',1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `dy_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_user`
--

DROP TABLE IF EXISTS `dy_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auth0id` varchar(45) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(12) DEFAULT NULL,
  `role_id` int DEFAULT '2',
  `permission_id` int DEFAULT '1',
  `ref_code` varchar(10) DEFAULT NULL,
  `mobile_verified` tinyint DEFAULT '0',
  `email_verified` tinyint DEFAULT '0',
  `passwd` varchar(512) DEFAULT NULL,
  `reconfirm_passwd` varchar(45) DEFAULT NULL,
  `passwd_exp_time` varchar(45) DEFAULT NULL,
  `signuptime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `gender_id` int DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bill_plan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_role_id_idx` (`role_id`),
  KEY `fk_perm_id_idx` (`permission_id`),
  KEY `fk_gender_id_idx` (`gender_id`),
  KEY `fk_bill_id_idx` (`bill_plan`),
  CONSTRAINT `fk_bill_id` FOREIGN KEY (`bill_plan`) REFERENCES `st_billing_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `st_gender` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_perm_id` FOREIGN KEY (`permission_id`) REFERENCES `st_permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `st_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_user`
--

LOCK TABLES `dy_user` WRITE;
/*!40000 ALTER TABLE `dy_user` DISABLE KEYS */;
INSERT INTO `dy_user` VALUES (1,NULL,'Asif','mdalsifraza820@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$wRnyGswtTou2NUIoOPmSpuHh5s/123vGv9kLT27/gvgUsbaO1dsQ2',NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,'Bheem','bheem@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$rKh0FCjsYY2J6T9VB893fuDIc/xr/./zwgCOPnoLg5IYRqnNYpCQu',NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,'Pavan','Pavan@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$SlP3Zr/lvh4iqnmhNQQtUeDuWCki/L68uqJruCpX3OxfvWm41wxQW',NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,'Ganti','Ganti@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$/O6u3giCUUoxdo2JhWxiheXlQ9jUnPNlfgwY9dlz0WBq/13/eW6Uy',NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,'Mani','Mani@gmail.com',NULL,3,1,NULL,0,0,'$2b$10$IXodw6W/RWFca5Rig4p1nOP0/MyLGIRNHvh5wlWJnMgcjkf6N07Ei',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(6,NULL,'Varun','Varun@gmail.com',NULL,3,1,NULL,0,0,'$2b$10$EThg84ONdXigbCXdKVHtjuSkEKgkusaZ51T/8Te5sO66RRowJPftW',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(7,NULL,'Abhishek','Abhishek@gmail.com',NULL,3,1,NULL,0,0,'$2b$10$ykmfsijZh.FICqBTqiAwF.Iqmw/UiHDLYv/dsTjIa.3ELEdqZj5JG',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(8,NULL,'Paras','Paras@gmail.com',NULL,3,1,NULL,0,0,'$2b$10$15svyCx/eAKwrpW1uwKQfeRxystbkPJam7G1Cg5UC2XI4CLMIbtpO',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(9,NULL,'Vijay','Vijay@gmail.com',NULL,4,1,NULL,0,0,'$2b$10$zgC7g1otD7gtQoKSMrRD5.4GvQ9pemPoTU.hwQ5ZRh8ouNZl2jfTa',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(10,NULL,'Ashok','Ashok@gmail.com',NULL,4,1,NULL,0,0,'$2b$10$PoI9bcJPX4cmw7ejo61I6u3x4mkjEhGrqf6oaiGWCvML3mIncOtz6',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(11,NULL,'johnDoe','johnDoe@gmail.com',NULL,4,1,NULL,0,0,'$2b$10$Nr0zEmgSYZPt96n42SlZeeeCm2N.j/FBkJLc0VwD12BDZIaxuUMjy',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(12,NULL,'janeDoe','janeDoe@gmail.com',NULL,4,1,NULL,0,0,'$2b$10$k6Stb48SG42kNscGO18mPeKFqjyU/42NDs6l61G08svwZiTH5McM2',NULL,NULL,NULL,NULL,'2024-12-18 06:43:28',NULL),(13,NULL,'bobSmith','bobSmith@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$7o7Y1x82duSrKSMmNrYEQe86ROh.PQ6bJLYvPi99tlOJ.MXzI.tda',NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,'aliceJohnson','aliceJohnson@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$AC7N31nGhUzo48kGysGvF.HeQcpbB.PB18sVLQx4UFEwWTwEb3r3K',NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,'mikeWilliams','mikeWilliams@gmail.com',NULL,2,1,NULL,0,0,'$2b$10$cRpetyAvVaxrMtl4VGUblOjJxtDpUHBhHfnnaBcR637gFzyTsW1uu',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `dy_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_user_actions`
--

DROP TABLE IF EXISTS `dy_user_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_user_actions` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `status_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_property_id_idx` (`property_id`),
  CONSTRAINT `fk_action_property_id` FOREIGN KEY (`property_id`) REFERENCES `dy_property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='"user actions like viewed,favourites,filters,rejected"';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_user_actions`
--

LOCK TABLES `dy_user_actions` WRITE;
/*!40000 ALTER TABLE `dy_user_actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `dy_user_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dy_user_profile`
--

DROP TABLE IF EXISTS `dy_user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dy_user_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `current_city` varchar(45) DEFAULT NULL,
  `conv_mode_id` int DEFAULT '1',
  `alt_email_id` varchar(45) DEFAULT NULL,
  `alt_mobile_no` varchar(12) DEFAULT NULL,
  `allow_promotion_campaign` int DEFAULT '1',
  `Interests` multilinestring DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `d_UNIQUE` (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_conv_mode_id_idx` (`conv_mode_id`),
  CONSTRAINT `fk_conv_mode_id` FOREIGN KEY (`conv_mode_id`) REFERENCES `st_conv_mode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for User Profile';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dy_user_profile`
--

LOCK TABLES `dy_user_profile` WRITE;
/*!40000 ALTER TABLE `dy_user_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `dy_user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_amenities`
--

DROP TABLE IF EXISTS `st_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amenity_name` varchar(75) DEFAULT NULL,
  `amenity_category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_am_cat_id` (`amenity_category_id`),
  CONSTRAINT `fk_am_cat_id` FOREIGN KEY (`amenity_category_id`) REFERENCES `st_amenity_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Amenities';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_amenities`
--

LOCK TABLES `st_amenities` WRITE;
/*!40000 ALTER TABLE `st_amenities` DISABLE KEYS */;
INSERT INTO `st_amenities` VALUES (1,'yoga',1),(2,'meditation',1),(3,'bicycling',1),(4,'joggingtrack',1),(5,'walkingtrack',1),(6,'dancefloor',2),(7,'musicclub',2),(8,'paintingclub',2),(9,'theatregroup',2),(10,'vintageclub',2),(11,'professionalclub',2),(12,'kittypartyclub',2),(13,'amatuersclub',2),(14,'childrenclub',2),(15,'toddlerclub',2),(16,'cricket',3),(17,'basketball',3),(18,'throwball',3),(19,'football',3),(20,'skatingring',3),(21,'volleyball',3),(22,'lawntennis',3),(24,'outdoorshuttlecourt',3),(25,'parks',2),(26,'amphiteatre',2),(27,'minigolf',3),(28,'carroms',4),(29,'chess',4),(30,'cards',4),(31,'billiards',4),(32,'snooker',4),(33,'foosball',4),(34,'videogames',4),(35,'tabletennis',4),(36,'squash',4),(37,'shuttlecourt',4),(38,'fencing',4),(39,'zudoring',4),(40,'wrestlingring',4),(41,'armwrestling',4),(42,'compoundwall',5),(43,'cctvsurveyance',5),(44,'securitypersonnel',5),(45,'maingatesecurity',5),(46,'24hrsequrity',5),(47,'frontservice',6),(48,'guestrooms',6),(49,'multipurposeroom',6),(50,'blacktoproads',6),(51,'commongardening',6),(52,'supermarket',6),(53,'dispensery',1),(54,'commoncanteen',6),(55,'conferencerooms',6),(56,'laundry',6),(57,'salons',6),(58,'shoppingoutlets',6),(59,'brokerageservices',6),(60,'cleaningservices',6),(61,'commonwastebins',7),(62,'wasteducts',7),(63,'wastecollection',7),(64,'wetwaste',7),(65,'drywaste',7),(66,'biowaste',7),(67,'wasterecycling',7),(68,'biogasgeneration',7),(69,'compostgeneration',7),(70,'hazardouswaste',7),(71,'ewaste',7),(72,'waterharvesting',8),(73,'waterrecycling',8),(74,'allroundwater',8),(75,'watermetering',8),(76,'externalplantation',9),(77,'lawns',9),(78,'treeprotection',9),(79,'sculputeres',9),(80,'fountains',9),(81,'artificialwaterfalls',9),(82,'allroundpower',10),(83,'powerbackup',10),(84,'streetlighting',10),(85,'undergroundelectrification',10),(86,'sewagetratment',11),(87,'sewageclearance',11),(88,'drainagemaintenance',11),(89,'manholesmaintenance',11),(90,'generatorbackup',10),(91,'indoorswimmingpool',4),(92,'outdoorswimmingpool',3),(93,'creche',6),(94,'kidsarea',4),(95,'clubhouse',6);
/*!40000 ALTER TABLE `st_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_amenity_category`
--

DROP TABLE IF EXISTS `st_amenity_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_amenity_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amenity_category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Amenity Category';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_amenity_category`
--

LOCK TABLES `st_amenity_category` WRITE;
/*!40000 ALTER TABLE `st_amenity_category` DISABLE KEYS */;
INSERT INTO `st_amenity_category` VALUES (1,'Health_mgmnt'),(2,'Recreation_mgmnt'),(3,'Outdoor_sports_mgmnt'),(4,'Indoor_sports_mgmnt'),(5,'Security_mgmnt'),(6,'Utilities_mgmnt'),(7,'Waste_mgmnt'),(8,'Water_mgmnt'),(9,'Gardening_mgmnt'),(10,'Power_mgmnt'),(11,'Sewage_mgmnt');
/*!40000 ALTER TABLE `st_amenity_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_balcony`
--

DROP TABLE IF EXISTS `st_balcony`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_balcony` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nbalcony` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Balcony';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_balcony`
--

LOCK TABLES `st_balcony` WRITE;
/*!40000 ALTER TABLE `st_balcony` DISABLE KEYS */;
INSERT INTO `st_balcony` VALUES (1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5'),(6,'6'),(7,'7'),(8,'8'),(9,'9'),(10,'10');
/*!40000 ALTER TABLE `st_balcony` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_baths`
--

DROP TABLE IF EXISTS `st_baths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_baths` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nbaths` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Bathrooms';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_baths`
--

LOCK TABLES `st_baths` WRITE;
/*!40000 ALTER TABLE `st_baths` DISABLE KEYS */;
INSERT INTO `st_baths` VALUES (1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5'),(6,'6'),(7,'7'),(8,'8'),(9,'9'),(10,'10');
/*!40000 ALTER TABLE `st_baths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_beds`
--

DROP TABLE IF EXISTS `st_beds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_beds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nbeds` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Bedrooms';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_beds`
--

LOCK TABLES `st_beds` WRITE;
/*!40000 ALTER TABLE `st_beds` DISABLE KEYS */;
INSERT INTO `st_beds` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10);
/*!40000 ALTER TABLE `st_beds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_billing_plan`
--

DROP TABLE IF EXISTS `st_billing_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_billing_plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `billing_plan` varchar(25) DEFAULT NULL,
  `billing_amount` double DEFAULT NULL,
  `billing_duration` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Billing_Pla_Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_billing_plan`
--

LOCK TABLES `st_billing_plan` WRITE;
/*!40000 ALTER TABLE `st_billing_plan` DISABLE KEYS */;
INSERT INTO `st_billing_plan` VALUES (1,'free',0,15),(2,'basic',499,60),(3,'standard',799,75),(4,'premium',999,180),(5,'ultra premium',1599,365);
/*!40000 ALTER TABLE `st_billing_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_brokerage`
--

DROP TABLE IF EXISTS `st_brokerage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_brokerage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brokerage_amount` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Brokerage';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_brokerage`
--

LOCK TABLES `st_brokerage` WRITE;
/*!40000 ALTER TABLE `st_brokerage` DISABLE KEYS */;
INSERT INTO `st_brokerage` VALUES (1,10000);
/*!40000 ALTER TABLE `st_brokerage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_builder`
--

DROP TABLE IF EXISTS `st_builder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_builder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_city_id_1_idx` (`city_id`),
  CONSTRAINT `fk_city_id_1` FOREIGN KEY (`city_id`) REFERENCES `st_city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Builder';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_builder`
--

LOCK TABLES `st_builder` WRITE;
/*!40000 ALTER TABLE `st_builder` DISABLE KEYS */;
INSERT INTO `st_builder` VALUES (1,'MyHome',198),(2,'Aparna',198),(3,'Rajpushpa',198),(4,'HonerHomes',198),(5,'Vamsiram',198),(6,'Vertex',198),(7,'Prestige',198),(8,'Vasavi',198),(9,'Hallmark',198),(10,'Gowra',198),(11,'Ramky',198),(12,'ASBL',198),(13,'CyberCity',198),(14,'Praneeth',198),(15,'APR',198),(16,'GreenSpace',198),(17,'Alekhya',198),(18,'Radhey',198),(19,'Giridhari',198),(20,'SriAditya',198),(21,'Lansum',198),(22,'MVV Builders',11),(23,'Subhagruha',11),(24,'Bhoomatha',11),(25,'MK Builders',11),(26,'Vaisakhi',11),(27,'Aditya',11),(28,'Prakruthi',11),(29,'Balaji',11),(30,'ShriRam',11),(31,'VK',11),(32,'Sardar',11),(33,'Peram',11),(34,'Swathi',11),(35,'Charan',11),(36,'Flora',11),(37,'Sai Infra',11),(38,'SriVaibhava',11),(39,'utkarsha',11),(40,'Lansum',11),(41,'Pranathi',11),(42,'Himaja',2),(43,'Raki Avenues',2),(44,'V Cube',2),(45,'Akshar Group',66),(46,'Sangani Infra',66),(47,'Shreenath Infra',66),(48,'Sky Seven Infra',66),(49,'Nilamber',66),(50,'Pratham Realty',66),(51,'J P Iscon',66),(52,'Narayan Realty',66),(53,'Darshanam Realty',66),(54,'Mangla Group',66),(55,'Fortune Group',66),(56,'vraj Builders',67),(57,'Godrej Properties',68),(58,'Adani Group',68),(59,'Applewoods',68),(60,'Bakeri',68),(61,'Ganesh Housing',68),(62,'Sheetal Infra',68),(63,'Shivalik Infra',68),(64,'Saanvi Nirman',68),(65,'Adani Realty',68),(66,'Goyal & Co',68),(67,'Rajhans Group',69),(68,'Happy Home Group',69),(69,'Sangini Group',69),(70,'Raghuvir Corporation',69),(71,'Avadh Group',69),(72,'Western Group',69),(73,'Vaishnodevi Group',69),(74,'Akash Group',69),(75,'Green Group',69),(76,'Pramukh Group',69),(77,'Prestige Group',101),(78,'Sobha Ltd',101),(79,'Brigade Group',101),(80,'godrej Properties',101),(81,'purvankara Group',101),(82,'mahindra lifespace',101),(83,'Mana Projects',101),(84,'Century Real Estate',101),(85,'Assetz Group',101),(86,'Sattva Group',101),(87,'Lodha Group',131),(88,'Oberoi Realty',131),(89,'K Raheja Group',131),(90,'godrej Properties',131),(91,'L&T Realty',131),(92,'Runwal Realty',131),(93,'Rustomjee Group',131),(94,'Hiranandani Group',131),(95,'Prestige Group',131),(96,'Piramal Group',131),(97,'Mani Group',233),(98,'Merlin Group',233),(99,'PS Group',233),(100,'Siddha Group',233),(101,'Ambuja Neotia',233),(102,'Mayfair Group',233),(103,'Sugam Group',233),(104,'Bhawani Group',233),(105,'Srijan Realty',233),(106,'Eden Group',233),(107,'DLF Ltd',248),(108,'Raheja Group',248),(109,'Adarsh Homes',248),(110,'DGR Homes',248),(111,'EMAAR India',248),(112,'Supertech Limited',248),(113,'parsvnath Group',248),(114,'Ashiana Group',248),(115,'Veera Group',248),(116,'Godrej Properties',248),(117,'Casagrand Group',188),(118,'Appaswamy Group',188),(119,'VGN Group',188),(120,'Jain Housing',188),(121,'Lancor Holdings',188),(122,'Pacifica Group',188),(123,'urbantree Infra',188),(124,'Radiance Realty',188),(125,'DRA Homes',188),(126,'DAC Developers',188);
/*!40000 ALTER TABLE `st_builder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_city`
--

DROP TABLE IF EXISTS `st_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_state_id_1` (`state_id`),
  CONSTRAINT `fk_state_id_1` FOREIGN KEY (`state_id`) REFERENCES `st_state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for City';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_city`
--

LOCK TABLES `st_city` WRITE;
/*!40000 ALTER TABLE `st_city` DISABLE KEYS */;
INSERT INTO `st_city` VALUES (1,'amaravati',1),(2,'vijaywada',1),(3,'guntur',1),(4,'elluru',1),(5,'tadipallegudam',1),(6,'nellore',1),(7,'ongole',1),(8,'Tirupati',1),(9,'cuddapah',1),(10,'vijaynagaram',1),(11,'visakhapatnam',1),(12,'srikakulam',1),(13,'narsapuram',1),(14,'narsaraopeta',1),(15,'bhivaram',1),(16,'tuni',1),(17,'anakapalli',1),(18,'rajahmundry',1),(19,'samalkota',1),(20,'kakinada',1),(21,'itanagar',2),(22,'eastsaing',2),(23,'tawang',2),(24,'seppo',2),(25,'aalo',2),(26,'daporijo',2),(27,'namsai',2),(28,'tezu',2),(29,'pasighat',2),(30,'naharlagun',2),(31,'dispur',3),(32,'tezpur',3),(33,'guwahati',3),(34,'dibrugarh',3),(35,'jorhat',3),(36,'silchar',3),(37,'karimganj',3),(38,'dhubri',3),(39,'nagaon',3),(40,'hojai',3),(41,'patna',4),(42,'gaya',4),(43,'vaishali',4),(44,'nalanda',4),(45,'madhubani',4),(46,'bhagalpur',4),(47,'rajgir',4),(48,'muzzafarpur',4),(49,'bodhgaya',4),(50,'chapra',4),(51,'raipur',5),(52,'bilaspur',5),(53,'bhilai',5),(54,'korba',5),(55,'rajnanndgaon',5),(56,'jagadalpur',5),(57,'ambikapur',5),(58,'dhamtari',5),(59,'mahasamund',5),(60,'champa',5),(61,'panaji',6),(62,'mapusa',6),(63,'madgoan',6),(64,'ponda',6),(65,'vascodagama',6),(66,'Vadodara',7),(67,'Rajkot',7),(68,'Ahmedabad',7),(69,'surat',7),(70,'jamnagar',7),(71,'bhavnagar',7),(72,'junagadh',7),(73,'porbandar',7),(74,'Gandhinagar',7),(75,'gurgoan',8),(76,'faridabad',8),(77,'karnal',8),(78,'panchkula',8),(79,'kaithal',8),(80,'bhiwani',8),(81,'rewari',8),(82,'sonipat',8),(83,'shimla',9),(84,'mandi',9),(85,'kullu',9),(86,'manali',9),(87,'bilaspur',9),(88,'chamba',9),(89,'dharamshala',9),(90,'solan',9),(91,'ranchi',10),(92,'dhanbad',10),(93,'bokaro city',10),(94,'deogarh',10),(95,'jamshedpur',10),(96,'giridh',10),(97,'hazaribagh',10),(98,'medininagar',10),(99,'ramgarhcantonment',10),(100,'chaibasa',10),(101,'Bengaluru',11),(102,'mangaluru',11),(103,'shivamoga',11),(104,'mysore',11),(105,'kalaburigi',11),(106,'udipi',11),(107,'ballari',11),(108,'davegere',11),(109,'tumakuru',11),(110,'raichur',11),(111,'kochi',12),(112,'thiruvananthpuram',12),(113,'khozikode',12),(114,'kollam',12),(115,'thrissur',12),(116,'kannur',12),(117,'mallapuram',12),(118,'allapuzha',12),(119,'palakkad',12),(120,'kottayam',12),(121,'Bhopal',13),(122,'Indore',13),(123,'Gwalior',13),(124,'ujjain',13),(125,'ratlam',13),(126,'rewa',13),(127,'jabalpur',13),(128,'sagar',13),(129,'satna',13),(130,'chindwara',13),(131,'Mumbai',14),(132,'pune',14),(133,'nagpur',14),(134,'aurangabad',14),(135,'nashik',14),(136,'kolhapur',14),(137,'amravati',14),(138,'solapur',14),(139,'thane',14),(140,'sangli',14),(141,'imphal',15),(142,'thoubal',15),(143,'shillong',16),(144,'tura',16),(145,'nongstoin',16),(146,'Aizawl',17),(147,'lunglei',17),(148,'serchipp',17),(149,'kohima',18),(150,'dimapur',18),(151,'tuensang',18),(152,'bhubaneswar',19),(153,'cuttack',19),(154,'brahmapur',19),(155,'puri',19),(156,'rourkela',19),(157,'barripada',19),(158,'balasore',19),(159,'bhadrak',19),(160,'sambalpur',19),(161,'jharsguda',19),(162,'koraput',19),(163,'amritsar',20),(164,'patiala',20),(165,'ludhaina',20),(166,'bhatinda',20),(167,'jalandhar',20),(168,'moga',20),(169,'kapurthala',20),(170,'hoshiarpur',20),(171,'sahibzada Ajit Singh Nagar',20),(172,'gurdaspur',20),(173,'barnala',20),(174,'jodhpur',21),(175,'udaipur',21),(176,'pali',21),(177,'bikaner',21),(178,'jaipur',21),(179,'ajmer',21),(180,'kota',21),(181,'sikar',21),(182,'alwar',21),(183,'bhilwara',21),(184,'sawaimadhopur',21),(185,'gangtok',22),(186,'namchi',22),(187,'rangpo',22),(188,'chennai',23),(189,'salem',23),(190,'madurai',23),(191,'coimbatore',23),(192,'thiruchapalli',23),(193,'kancheepuram',23),(194,'vellore',23),(195,'tiruppur',23),(196,'Thoothukudi',23),(197,'Secunderabad',24),(198,'Hyderabad',24),(199,'warangal',24),(200,'khammam',24),(201,'nizamabad',24),(202,'karimnagar',24),(203,'sirpurkagaznagar',24),(204,'siddipet',24),(205,'mahbubnagar',24),(206,'nalgonda',24),(207,'adilabad',24),(208,'suryapet',24),(209,'agartala',25),(210,'dharmanagar',25),(211,'Kailashahar',25),(212,'dehradun',26),(213,'rishikesh',26),(214,'nainital',26),(215,'mussorie',26),(216,'haridwar',26),(217,'almora',26),(218,'haldwani',26),(219,'roorkee',26),(220,'kashipur',26),(221,'lucknow',27),(222,'noida',27),(223,'agra',27),(224,'prayagraj',27),(225,'varnasi',27),(226,'kanpur',27),(227,'jhansi',27),(228,'ghaziabad',27),(229,'mathura',27),(230,'gorakhpur',27),(231,'meerut',27),(232,'philibit',27),(233,'kolkata',28),(234,'howrah',28),(235,'siliguri',28),(236,'asansol',28),(237,'malda',28),(238,'darjeeling',28),(239,'berhampur',28),(240,'kharagpur',28),(241,'eastmedinipur',28),(242,'westmedinipur',28),(243,'purabbardhaman',28),(244,'south24parganas',28),(245,'north24parganas',28),(246,'durgapur',28),(247,'haldia',28),(248,'NewDelhi',37);
/*!40000 ALTER TABLE `st_city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_community`
--

DROP TABLE IF EXISTS `st_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_community` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `map_url` varchar(250) DEFAULT NULL,
  `total_area` double DEFAULT NULL,
  `open_area` double DEFAULT NULL,
  `nblocks` int DEFAULT NULL,
  `nfloors_per_block` int DEFAULT NULL,
  `nhouses_per_floor` int DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `builder_id` int DEFAULT NULL,
  `totflats` int DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_builder_id_idx` (`builder_id`),
  CONSTRAINT `fk_builder_id` FOREIGN KEY (`builder_id`) REFERENCES `st_builder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Community';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_community`
--

LOCK TABLES `st_community` WRITE;
/*!40000 ALTER TABLE `st_community` DISABLE KEYS */;
INSERT INTO `st_community` VALUES (1,'Avatar','https://maps.app.goo.gl/GcBS9FEeCnCe2pqCA',22.75,83.5,10,31,9,'Sy. Nos. 217 to 225, Narsingi Village, Rajendranagar, Revenue Mandal, Puppalguda, Hyderabad, Telangana 500089',1,2800,'completed'),(2,'Krishe','https://maps.app.goo.gl/oz5QfXprYdkUzETz6',6.75,80,4,26,9,'Cluster_serilingampally 13, Block 1, MY HOME KRISHE, SY.NO. 38 to 41 Gopannapally Village, Mandal, Gachibowli, Serilingampalle (M), Hyderabad, Telangana 500046',1,650,'completed'),(3,'Vihanga','https://maps.app.goo.gl/eyf5A4b2bwcoLPnj9https://maps.app.goo.gl/eyf5A4b2bwcoLPnj9',21,80,20,18,6,'C8JJ+XCG, Gachibowli, Hyderabad, Telangana 500032',1,1996,'completed'),(4,'Jewel','https://maps.app.goo.gl/zDsC2ZC7YpszPUgq8',22.5,68,14,15,12,'My Home Jewels Apartments, Manjeera Pipeline Rd, Hafeezpet, Madeenaguda, Hyderabad, Telangana 500133',1,2016,'completed'),(5,'Abhra','https://maps.app.goo.gl/a1hZmzNUpjp55m6s6',5,73,5,17,5,'Inorbit Mall, Road, Mindspace Madhapur Rd, Silpa Gram Craft Village, HITEC City, Hyderabad, Telangana 500081',1,387,'completed'),(6,'Bhooja','https://maps.app.goo.gl/idBVxo8h6epFFTGw8',18,80,11,36,4,'Plot No 22 to 24, and 31 to 33, Sy.No.83/1 Raidurgam Panmakta, Serilingampally, Hyderabad, Telangana 500032',1,1560,'completed'),(7,'Tarkshya','https://maps.app.goo.gl/EmWQcRk3fEbouNcf9',5.82,78,4,32,5,'Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075',1,660,'completed'),(8,'Ankura','https://maps.app.goo.gl/kmRBmfJhBd5EGQk37',75.46,80,603,3,1,'My Home Ankura Main St, Tellapur, Hyderabad, Telangana 502300',1,603,'completed'),(9,'Navadweepa','https://maps.app.goo.gl/zUwnz6wVv8fMPcDj7',9.5,80,4,9,16,'Vayu Block, Patrika Nagar, Madhapur, 79, Hitech City Rd, HITEC City, Hyderabad, Telangana 500081',1,556,'completed'),(10,'Mangala','https://maps.app.goo.gl/DkB7koJaJYyKsqGt5',20,77,11,15,12,'Sy.No.98 Kondapur Village, Serilingampally Mandal, Hyderabad, Telangana 500084',1,1879,'completed'),(11,'Akrida','https://maps.app.goo.gl/yHYJSQnLV3SbJnwN6',24.99,81,12,39,8,'Tellapur Village Ramachandrapuram, Nallagandla, Hyderabad, Telangana 500019',1,3780,'ongoing'),(12,'Sayuk','https://maps.app.goo.gl/HsgY8jVYRoyvtMzZ7',25.37,81,12,39,8,'Sy.No. 366/P, 368/P,369/P Tellapur Village Ramachandrapuram, Mandal Sangareddy, District, Hyderabad, Telangana 502032',1,3780,'ongoing'),(13,'Tridasa','https://maps.app.goo.gl/Y9jNiDzDnihp17Ts7',22.56,84,9,29,10,'Radial Rd 7, Tellapur, Ramachandrapuram, Hyderabad, Telangana 502032',1,2682,'ongoing'),(14,'Vipina','https://maps.app.goo.gl/1Fi6ah3ELAkCgLQt5',20.61,81,8,46,10,'Radial Rd 7, Tellapur, Ramachandrapuram, Hyderabad, Telangana 502032',1,3720,'ongoing'),(15,'Grava','https://maps.app.goo.gl/B1hwUprtF7WmUEJD8',17.52,80,7,54,4,'C829+GW, Kokapet, Hyderabad, Telangana 500075',1,1289,'ongoing'),(16,'Apas','https://maps.app.goo.gl/kbQkz4v1Wrcsf4uQ6',13.52,81.6,6,44,4,'C83H+7FG, Kokapet, Hyderabad, Telangana 500075',1,1338,'ongoing'),(17,'99','https://maps.app.goo.gl/ejqsyTsCXhnQuzXa9',1.74,0,1,53,2,'Khanapur Survey No : 240/P Gandipet, Hyderabad, Telangana 500075',1,99,'ongoing'),(18,'Avali','https://maps.app.goo.gl/8EqGkh82dttEY6FM7',8.37,81,4,46,3,'F76V+P6, Tellapur, Hyderabad, Telangana 500019',1,744,'ongoing'),(19,'Nishada','https://maps.app.goo.gl/stXWE1BG3o2vzayJ6',16.68,80,8,44,4,'Mandal, Survey No. 239/240 plot no 3&4, Neopolis, Kokapet, Gandipet, Telangana 500075',1,744,'ongoing'),(20,'Raka','https://maps.app.goo.gl/WhmYgUrhqXN5K3qFA',2.4,81.6,9,34,1,'Sy. No.97(P), 98, Madeenaguda, Serilingampally Mandal, Telangana 500049',1,300,'ongoing'),(21,'Silver Oaks','https://maps.app.goo.gl/MkKMzcQPXuq18BFe8',7,80,6,14,1,'APARNA HILL PARK SILVER OAKS, Gangaram Cheruvu, Bandam Kommu, Chanda Nagar, Hyderabad, Ramachandrapuram, Telangana 500050',2,606,'completed'),(22,'Lake Breeze','https://maps.app.goo.gl/kzUQc55DM5cSEEeE9',12,80,11,14,6,'Aparna Hillpark Rd, Bandam Kommu, Chanda Nagar, Hyderabad, Telangana 500050',2,943,'completed'),(23,'Boulevard','https://maps.app.goo.gl/bAznEiDmnzqTyB5U9',12,80,95,3,1,'Bandam Kommu, Hyderabad, Ramachandrapuram, Telangana 500133',2,95,'completed'),(24,'Gardenia','https://maps.app.goo.gl/TopzmoJ6d7gEcrD69',16,80,116,3,1,'Bandam Kommu, Hyderabad, Ramachandrapuram, Telangana 500133',2,116,'completed'),(25,'Avenues','https://maps.app.goo.gl/HUAvaqcp39z86yWA7',9,80,6,12,12,'Beside road of Violet Purple Showroom Chandanagar, Serilingapally Mandal, 275, Aparna Hillpark Rd, Bandam Kommu, Hyderabad, Telangana 500050',2,707,'completed'),(26,'WestSide','https://maps.app.goo.gl/ARfwJQFXK4px8WfR6',1.7,80,1,14,9,'500089, Sai Aishwarya Layout, Chitrapuri Colony, Manikonda, Telangana 500089',2,128,'completed'),(27,'WestSide','https://maps.app.goo.gl/ARfwJQFXK4px8WfR6',1.7,80,1,14,9,'500089, Sai Aishwarya Layout, Chitrapuri Colony, Manikonda, Telangana 500089',2,128,'completed');
/*!40000 ALTER TABLE `st_community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_conv_mode`
--

DROP TABLE IF EXISTS `st_conv_mode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_conv_mode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conv_mode` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Conversation Mode';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_conv_mode`
--

LOCK TABLES `st_conv_mode` WRITE;
/*!40000 ALTER TABLE `st_conv_mode` DISABLE KEYS */;
INSERT INTO `st_conv_mode` VALUES (1,'All'),(2,'Chat'),(3,'Email'),(4,'Mobile');
/*!40000 ALTER TABLE `st_conv_mode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_current_status`
--

DROP TABLE IF EXISTS `st_current_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_current_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_category` varchar(45) DEFAULT NULL,
  `status_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_stat_cat_id_idx` (`status_category`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Status';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_current_status`
--

LOCK TABLES `st_current_status` WRITE;
/*!40000 ALTER TABLE `st_current_status` DISABLE KEYS */;
INSERT INTO `st_current_status` VALUES (1,'SYS','Review'),(2,'ADM','Invalid-Input'),(3,'ADM','Approved'),(4,'SYS','Info-RM'),(5,'RMA','Call User'),(6,'RMA','Call Owner'),(7,'RMA','Scheduled'),(8,'FMA','Req-reschedule'),(9,'RMA','Rescheduled'),(10,'FMA','Arrived'),(11,'FMA','Visit Done'),(12,'RMA','Pending'),(13,'RMA','Rej-User'),(14,'RMA','Rej-Owner'),(15,'RMA','BGV-Start'),(16,'RMA','BGV-Done'),(17,'RMA','Agreed'),(18,'RMA','Pay-Requested'),(19,'RMA','Pay-Pend'),(20,'RMA','Pay-Done'),(21,'RMA','RA Signed'),(22,'RMA','PS1-Sched'),(23,'FMA','PS1-Done'),(24,'RMA','Rented'),(25,'RMA','PS2-Sched'),(26,'FMA','PS2-Done'),(27,'SYS','Viewed'),(28,'SYS','Favoured');
/*!40000 ALTER TABLE `st_current_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_current_status_old`
--

DROP TABLE IF EXISTS `st_current_status_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_current_status_old` (
  `id` int NOT NULL AUTO_INCREMENT,
  `current_status` varchar(30) DEFAULT NULL,
  `status_desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Current Status';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_current_status_old`
--

LOCK TABLES `st_current_status_old` WRITE;
/*!40000 ALTER TABLE `st_current_status_old` DISABLE KEYS */;
INSERT INTO `st_current_status_old` VALUES (1,'Open',NULL),(2,'Pending',NULL),(3,'Referred',NULL),(4,'Viewed',NULL),(5,'Filtered',NULL),(6,'Favourites',NULL),(7,'Contacted',NULL),(8,'Finalized',NULL),(9,'Failed',NULL),(10,'BrokeragePaid',NULL),(11,'Rented',NULL),(12,'Inactive',NULL),(13,'user_signed_off',NULL),(14,'owner_signed_off',NULL),(15,'visit_scheduled',NULL),(16,'visit_completed',NULL),(17,'process_completed',NULL);
/*!40000 ALTER TABLE `st_current_status_old` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_deposit_range`
--

DROP TABLE IF EXISTS `st_deposit_range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_deposit_range` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nmonths` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Deposit Range';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_deposit_range`
--

LOCK TABLES `st_deposit_range` WRITE;
/*!40000 ALTER TABLE `st_deposit_range` DISABLE KEYS */;
INSERT INTO `st_deposit_range` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12);
/*!40000 ALTER TABLE `st_deposit_range` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_floor_range`
--

DROP TABLE IF EXISTS `st_floor_range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_floor_range` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floor_lower_limit` int DEFAULT NULL,
  `floor_upper_limit` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Floor Range';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_floor_range`
--

LOCK TABLES `st_floor_range` WRITE;
/*!40000 ALTER TABLE `st_floor_range` DISABLE KEYS */;
INSERT INTO `st_floor_range` VALUES (1,1,5),(2,6,10),(3,11,15),(4,16,20),(5,21,25),(6,26,30),(7,31,35),(8,36,40),(9,41,45),(10,46,50),(11,51,55),(12,56,60),(13,61,65),(14,66,70),(15,71,75),(16,76,80),(17,81,85),(18,86,90),(19,91,95),(20,96,100),(21,101,105),(22,106,110),(23,111,115),(24,116,120),(25,121,125),(26,126,130),(27,131,135),(28,136,140),(29,141,145),(30,146,150);
/*!40000 ALTER TABLE `st_floor_range` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_gender`
--

DROP TABLE IF EXISTS `st_gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Gender';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_gender`
--

LOCK TABLES `st_gender` WRITE;
/*!40000 ALTER TABLE `st_gender` DISABLE KEYS */;
INSERT INTO `st_gender` VALUES (1,'Male'),(2,'Female'),(3,'Not Wish to Disclose');
/*!40000 ALTER TABLE `st_gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_home_type`
--

DROP TABLE IF EXISTS `st_home_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_home_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `home_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Home Type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_home_type`
--

LOCK TABLES `st_home_type` WRITE;
/*!40000 ALTER TABLE `st_home_type` DISABLE KEYS */;
INSERT INTO `st_home_type` VALUES (1,'1 Bhk'),(2,'2 Bhk'),(3,'3 Bhk'),(4,'4 Bhk'),(5,'5 Bhk'),(6,'6 Bhk'),(7,'7 Bhk'),(8,'8 Bhk'),(9,'9 Bhk'),(10,'10 Bhk'),(11,'11 Bhk'),(12,'12 Bhk'),(13,'13 Bhk'),(14,'14 Bhk'),(15,'15 Bhk');
/*!40000 ALTER TABLE `st_home_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_landmarks_category`
--

DROP TABLE IF EXISTS `st_landmarks_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_landmarks_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `landmark_category` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Landmarks Category';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_landmarks_category`
--

LOCK TABLES `st_landmarks_category` WRITE;
/*!40000 ALTER TABLE `st_landmarks_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `st_landmarks_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_maintenance`
--

DROP TABLE IF EXISTS `st_maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_maintenance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maintenance_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Maintenance';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_maintenance`
--

LOCK TABLES `st_maintenance` WRITE;
/*!40000 ALTER TABLE `st_maintenance` DISABLE KEYS */;
INSERT INTO `st_maintenance` VALUES (1,'Included'),(2,'Not Included');
/*!40000 ALTER TABLE `st_maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_parking_count`
--

DROP TABLE IF EXISTS `st_parking_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_parking_count` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parking_count` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_parking_count`
--

LOCK TABLES `st_parking_count` WRITE;
/*!40000 ALTER TABLE `st_parking_count` DISABLE KEYS */;
INSERT INTO `st_parking_count` VALUES (1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5');
/*!40000 ALTER TABLE `st_parking_count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_parking_type`
--

DROP TABLE IF EXISTS `st_parking_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_parking_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parking_type` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Parking Type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_parking_type`
--

LOCK TABLES `st_parking_type` WRITE;
/*!40000 ALTER TABLE `st_parking_type` DISABLE KEYS */;
INSERT INTO `st_parking_type` VALUES (1,'Car'),(2,'Bike'),(3,'Bicycle');
/*!40000 ALTER TABLE `st_parking_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_permissions`
--

DROP TABLE IF EXISTS `st_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Permissions';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_permissions`
--

LOCK TABLES `st_permissions` WRITE;
/*!40000 ALTER TABLE `st_permissions` DISABLE KEYS */;
INSERT INTO `st_permissions` VALUES (1,'Read'),(2,'Write'),(3,'Edit'),(4,'Delete');
/*!40000 ALTER TABLE `st_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_prop_desc`
--

DROP TABLE IF EXISTS `st_prop_desc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_prop_desc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prop_desc` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Property Description';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_prop_desc`
--

LOCK TABLES `st_prop_desc` WRITE;
/*!40000 ALTER TABLE `st_prop_desc` DISABLE KEYS */;
INSERT INTO `st_prop_desc` VALUES (1,'UnFurnished'),(2,'SemiFurnished'),(3,'FullyFurnished'),(4,'OptimallyFurnished');
/*!40000 ALTER TABLE `st_prop_desc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_prop_facing`
--

DROP TABLE IF EXISTS `st_prop_facing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_prop_facing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prop_facing` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Property Facing';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_prop_facing`
--

LOCK TABLES `st_prop_facing` WRITE;
/*!40000 ALTER TABLE `st_prop_facing` DISABLE KEYS */;
INSERT INTO `st_prop_facing` VALUES (1,'North'),(2,'East'),(3,'South'),(4,'West'),(5,'NorthEast'),(6,'NorthWest'),(7,'SouthEast'),(8,'SouthWest'),(9,'Central');
/*!40000 ALTER TABLE `st_prop_facing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_prop_type`
--

DROP TABLE IF EXISTS `st_prop_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_prop_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prop_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Property Type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_prop_type`
--

LOCK TABLES `st_prop_type` WRITE;
/*!40000 ALTER TABLE `st_prop_type` DISABLE KEYS */;
INSERT INTO `st_prop_type` VALUES (1,'Apartment'),(2,'Independent House'),(3,'Villa'),(4,'RowHouse'),(5,'Commercial');
/*!40000 ALTER TABLE `st_prop_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_referral_details`
--

DROP TABLE IF EXISTS `st_referral_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_referral_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referral_amt` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Referral Amount';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_referral_details`
--

LOCK TABLES `st_referral_details` WRITE;
/*!40000 ALTER TABLE `st_referral_details` DISABLE KEYS */;
INSERT INTO `st_referral_details` VALUES (1,1000);
/*!40000 ALTER TABLE `st_referral_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_rental_range`
--

DROP TABLE IF EXISTS `st_rental_range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_rental_range` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lower_limit` varchar(45) DEFAULT NULL,
  `higher_limit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Rental Range';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_rental_range`
--

LOCK TABLES `st_rental_range` WRITE;
/*!40000 ALTER TABLE `st_rental_range` DISABLE KEYS */;
INSERT INTO `st_rental_range` VALUES (1,'0','999999');
/*!40000 ALTER TABLE `st_rental_range` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_role`
--

DROP TABLE IF EXISTS `st_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for Roles';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_role`
--

LOCK TABLES `st_role` WRITE;
/*!40000 ALTER TABLE `st_role` DISABLE KEYS */;
INSERT INTO `st_role` VALUES (1,'Admin'),(2,'User'),(3,'RM'),(4,'FM');
/*!40000 ALTER TABLE `st_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_stat_cat`
--

DROP TABLE IF EXISTS `st_stat_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_stat_cat` (
  `id` int NOT NULL,
  `stat_category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='static table for status categories';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_stat_cat`
--

LOCK TABLES `st_stat_cat` WRITE;
/*!40000 ALTER TABLE `st_stat_cat` DISABLE KEYS */;
INSERT INTO `st_stat_cat` VALUES (1,'Admin'),(2,'system'),(3,'rm'),(4,'fm');
/*!40000 ALTER TABLE `st_stat_cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_state`
--

DROP TABLE IF EXISTS `st_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scode` varchar(5) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table for States';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_state`
--

LOCK TABLES `st_state` WRITE;
/*!40000 ALTER TABLE `st_state` DISABLE KEYS */;
INSERT INTO `st_state` VALUES (1,'AP','Andhra Pradesh'),(2,'AR','Arunachal Pradesh'),(3,'AS','Assam'),(4,'BR','Bihar'),(5,'CG','Chhattisgarh'),(6,'GA','Goa'),(7,'GJ','Gujarat'),(8,'HR','Haryana'),(9,'HP','Himachal Pradesh'),(10,'JH','Jharkhand'),(11,'KA','Karnataka'),(12,'KL','Kerala'),(13,'MP','Madhya Pradesh'),(14,'MH','Maharashtra'),(15,'MN','Manipur'),(16,'ML','Meghalaya'),(17,'MZ','Mizoram'),(18,'NL','Nagaland'),(19,'OR','Odisha'),(20,'PB','Punjab'),(21,'RJ','Rajasthan'),(22,'SK','Sikkim'),(23,'TN','Tamil Nadu'),(24,'TS','Telangana'),(25,'TR','Tripura'),(26,'UK','Uttarakhand'),(27,'UP','Uttar Pradesh'),(28,'WB','West Bengal'),(29,'AN','Andaman,Nicobar Islands'),(30,'CH','Chandigarh'),(31,'DD','Dadra,NagarHaveli,Daman,Diu'),(32,'DL','The Government of NCT of Delhi'),(33,'JK','Jammu & Kashmir'),(34,'LD','Ladakh'),(35,'LA','Lakshadweep'),(36,'PY','Puducherry'),(37,'DL','Delhi-NCR');
/*!40000 ALTER TABLE `st_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_tenant`
--

DROP TABLE IF EXISTS `st_tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_tenant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenant_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Tenant';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_tenant`
--

LOCK TABLES `st_tenant` WRITE;
/*!40000 ALTER TABLE `st_tenant` DISABLE KEYS */;
INSERT INTO `st_tenant` VALUES (1,'Family'),(2,'Bachelor'),(3,'Expats'),(4,'Spinster'),(5,'NA');
/*!40000 ALTER TABLE `st_tenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_tenant_eat_pref`
--

DROP TABLE IF EXISTS `st_tenant_eat_pref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `st_tenant_eat_pref` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eat_pref` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table For Eat Preference';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_tenant_eat_pref`
--

LOCK TABLES `st_tenant_eat_pref` WRITE;
/*!40000 ALTER TABLE `st_tenant_eat_pref` DISABLE KEYS */;
INSERT INTO `st_tenant_eat_pref` VALUES (1,'Veg-Only'),(2,'Non-Veg');
/*!40000 ALTER TABLE `st_tenant_eat_pref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'rufrent'
--

--
-- Dumping routines for database 'rufrent'
--
/*!50003 DROP PROCEDURE IF EXISTS `addNewRecord` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addNewRecord`(
IN Tbl_Name varchar(60),
IN Field_Names varchar(350),
IN Field_Values varchar(350)
)
BEGIN
    SET @sql_query = CONCAT('INSERT INTO ', Tbl_Name, ' (', Field_Names, ') VALUES (', Field_Values, ')');

    -- Prepare the dynamic SQL statement
    PREPARE statement FROM @sql_query;

    -- Execute the prepared statement
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AssignRmToTransaction` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AssignRmToTransaction`(
    IN p_user_id INT,
    IN p_prop_id INT
)
BEGIN
    DECLARE p_community_id INT;
    DECLARE p_rm_id INT;

    -- Step 1: Fetch the community_id from dy_property
    SELECT community_id INTO p_community_id
    FROM dy_property
    WHERE id = p_prop_id;

    -- Step 2: Find the optimal rm_id from dy_rm_fm_com_map based on the algorithm
    -- Example: Pick the RM with the least number of transactions
    SELECT rm_id INTO p_rm_id
    FROM dy_rm_fm_com_map
    WHERE community_id = p_community_id
    ORDER BY (SELECT COUNT(*) 
              FROM dy_transactions 
              WHERE rm_id = dy_rm_fm_com_map.rm_id) ASC
    LIMIT 1;

    -- Step 3: Insert into dy_transactions
    INSERT INTO dy_transactions (user_id, prop_id, rm_id, tr_st_time, tr_upd_time, cur_stat_code)
    VALUES (p_user_id, p_prop_id, p_rm_id, NOW(), NOW(), 1); -- Set cur_stat_code as 1 (example)
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteRecord` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteRecord`(
IN Tbl_Name varchar(60),
IN Where_Condition varchar(350)
)
BEGIN

 -- Variable to hold the dynamic SQL query
    SET @sql_query = CONCAT('DELETE from ', Tbl_Name);

    -- Add WHERE clause if provided
    IF where_condition IS NOT NULL AND where_condition <> '' THEN
        SET @sql_query = CONCAT(@sql_query, ' WHERE ', Where_Condition);
    END IF;    

	-- SELECT @sql_query;
    -- Prepare and execute the query dynamically
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAggregateValue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAggregateValue`(
IN Tbl_name varchar (60),
IN Field_Name varchar(60),
IN Agg_Func_Name varchar(30)
)
BEGIN
	IF Agg_Func_Name NOT IN ('SUM', 'AVG', 'MAX', 'MIN', 'COUNT') THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid aggregate function';
	END IF;
    
    
    -- Variable to hold the dynamic query
    SET @sql_query = CONCAT('SELECT ', Agg_Func_Name, '(', Field_Name, ') AS result FROM ', Tbl_name);

    -- Debugging: Print the query (optional, for testing)
     SELECT @sql_query;

    -- Prepare and execute the dynamic query
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDataWithLimits` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataWithLimits`(
	IN Tbl_Name VARCHAR(64),        
	IN Grp_Fld VARCHAR(64),   
	IN Agg_Fld VARCHAR(64),  
	IN Agg_Func VARCHAR(20),
	IN Ord_Fld VARCHAR(64),   
	IN Srt_Typ VARCHAR(4),
	IN Lmt_Rows INT
)
BEGIN

	-- Validate the aggregate function
    IF Agg_Func NOT IN ('SUM', 'AVG', 'MAX', 'MIN', 'COUNT') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid aggregate function. Use SUM, AVG, MAX, MIN, or COUNT.';
    END IF;

    -- Validate the sort direction
    IF Srt_Typ NOT IN ('ASC', 'DESC') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid sort direction. Use ASC or DESC.';
    END IF;

    -- Construct the dynamic SQL query
    SET @sql_query = CONCAT(
        'SELECT ', Grp_Fld, ', ',
        Agg_Func, '(', Agg_Fld, ') AS aggregate_result ',
        'FROM ', Tbl_Name, ' ',
        'GROUP BY ', Grp_Fld, ' ',
        'ORDER BY ', Ord_Fld, ' ', Srt_Typ, ' ',
        'LIMIT ', Lmt_Rows
    );

    -- Debugging: Print the query (optional for testing)
    -- SELECT @sql_query;

    -- Prepare and execute the dynamic query
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getGroupedData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getGroupedData`(
 IN Tbl_Name VARCHAR(64),       
 IN Grp_Fld VARCHAR(64),  
 IN Agg_Fld VARCHAR(64), 
 IN Agg_Func VARCHAR(20)

)
BEGIN

 -- Validate the aggregate function
    IF Agg_Func NOT IN ('SUM', 'AVG', 'MAX', 'MIN', 'COUNT') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid aggregate function';
    END IF;

    -- Construct the dynamic SQL query
    SET @sql_query = CONCAT(
        'SELECT ', Grp_Fld, ', ',
        Agg_Func, '(', Agg_Fld, ') AS Agg_Res ',
        'FROM ', Tbl_Name, 
        ' GROUP BY ', Grp_Fld
    );

    -- Debugging: Print the query (optional for testing)
    -- SELECT @sql_query;

    -- Prepare and execute the dynamic query
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getJoinedData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getJoinedData`(
    IN Sc_Tbl_Name VARCHAR(64),        -- Main table name
    IN Join_Clauses TEXT,              -- Join clauses (JSON or text)
    IN Fld_Nms TEXT,           -- Fields to select
    IN Where_Clause TEXT               -- Optional WHERE condition
)
BEGIN

    -- Initialize the dynamic SQL query
    SET @sql_query = CONCAT('SELECT ', Fld_Nms, ' FROM ', Sc_Tbl_Name);

    -- Append join clauses if provided
    IF Join_Clauses IS NOT NULL AND LENGTH(Join_Clauses) > 0 THEN
        SET @sql_query = CONCAT(@sql_query, ' ', Join_Clauses);
    END IF;

    -- Append the WHERE clause if provided
    IF Where_Clause IS NOT NULL AND LENGTH(Where_Clause) > 0 THEN
        -- Ensure WHERE is only added if it's not already present
        IF LOCATE('WHERE', @sql_query) = 0 THEN
            SET @sql_query = CONCAT(@sql_query, ' WHERE ', Where_Clause);
        ELSE
            SET @sql_query = CONCAT(@sql_query, ' AND ', Where_Clause);
        END IF;
    END IF;

    -- Debugging: Print the query (optional for testing)
    -- SELECT @sql_query;

    -- Prepare and execute the dynamic query
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRecordByPK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRecordByPK`(
IN Tbl_Name varchar(60),
IN PK_Name varchar(60),
IN PK_Value varchar(60))
BEGIN
	if Tbl_Name is NULL then
		set Tbl_Name = 'st_state';
	end if;
    if PK_Name is NULL then 
		set PK_Name = 'id';
	end if;
    if PK_Value is NULL then 
		set PK_Value = 1;
	end if;
    
     SET @sql_query = CONCAT('SELECT * FROM ', Tbl_Name, ' WHERE ', PK_Name, ' = ?');

    -- Prepare the dynamic query
    PREPARE statement FROM @sql_query;
	SET @key_value = PK_Value; -- Pass the primary key value
    EXECUTE statement USING @key_value; -- Execute the query with the provided column_value
    
    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRecordsByFields` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRecordsByFields`(
IN Tbl_Name TEXT,
IN Field_Names varchar(350),
IN Where_Condition varchar(350)
)
BEGIN
    
    -- Variable to hold the dynamic query
    SET @sql_query = CONCAT('SELECT ', Field_Names, ' FROM ', Tbl_Name);

    -- Add WHERE condition if provided
    IF where_condition IS NOT NULL AND where_condition <> '' THEN
        SET @sql_query = CONCAT(@sql_query, ' WHERE ', Where_Condition);
    END IF;
	
    -- Prepare the dynamic SQL statement
    PREPARE statement FROM @sql_query;

    -- Execute the prepared statement
    EXECUTE statement;

	
    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getSortedData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSortedData`(
IN Tbl_Name varchar(60),
IN Order_Field_Name varchar(60),
IN Sort_Type varchar(10)
)
BEGIN

	IF sort_type NOT IN ('ASC', 'DESC') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid sort direction. Use ASC or DESC.';
    END IF;

    -- Construct the dynamic SQL query
    SET @sql_query = CONCAT('SELECT * FROM ', Tbl_Name, ' ORDER BY ', Order_Field_Name, ' ', Sort_Type);

    -- Debugging: Print the query (optional for testing)
    -- SELECT @sql_query;

    -- Prepare and execute the dynamic query
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateRecord` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateRecord`(
IN Tbl_Name varchar(60),
IN Field_Value_Pairs varchar(350),
IN Where_Condition varchar(350)
)
BEGIN

 -- Variable to hold the dynamic SQL query
    SET @sql_query = CONCAT('UPDATE ', Tbl_Name, ' SET ', field_value_pairs);

    -- Add WHERE clause if provided
    IF where_condition IS NOT NULL AND where_condition <> '' THEN
        SET @sql_query = CONCAT(@sql_query, ' WHERE ', Where_Condition);
    END IF;    

    -- Prepare and execute the query dynamically
    PREPARE statement FROM @sql_query;
    EXECUTE statement;

    -- Clean up the prepared statement
    DEALLOCATE PREPARE statement;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-23 12:43:20
