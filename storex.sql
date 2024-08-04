-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 04, 2024 at 04:47 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `storex`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `folder_id` int(11) DEFAULT NULL,
  `version_id` int(11) NOT NULL DEFAULT 0,
  `blockstatus` tinyint(4) NOT NULL DEFAULT 0,
  `deletestatus` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `filepath`, `project_id`, `folder_id`, `version_id`, `blockstatus`, `deletestatus`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '1714156021648-MrSalman Faris Invoice.pdf', 'uploads/1714156021648-MrSalman Faris Invoice.pdf', 1, 1, 0, 0, 0, 1, 1, '2024-05-05 11:02:39', '2024-05-06 22:44:02'),
(2, '1714158151102-image 7.jpg', 'uploads/1714158151102-image 7.jpg', 1, 2, 0, 0, 0, 1, 1, '2024-05-05 11:02:39', '2024-05-07 22:18:05'),
(3, '1714158453215-Jabrullah (Zuhari)-02 (2).dwg', 'uploads/1714158453215-Jabrullah (Zuhari)-02 (2).dwg', 1, 2, 0, 0, 0, 1, 1, '2024-05-05 11:02:39', '2024-05-07 22:18:09'),
(4, '1714159252464-images.png', 'uploads/1714159252464-images.png', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(5, '1714159345182-5306cd84d208779685f90636c444c122.jpeg', 'uploads/1714159345182-5306cd84d208779685f90636c444c122.jpeg', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(6, '1714159607167-Screenshot 2024-03-23 at 12.41.15 PM.png', 'uploads/1714159607167-Screenshot 2024-03-23 at 12.41.15 PM.png', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(7, '1714159911278-2761b2b260b443bf8e399129d4655af5.jpeg', 'uploads/1714159911278-2761b2b260b443bf8e399129d4655af5.jpeg', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(8, '1714160069553-original-934514b20300a63e8514d734f70a8209.png', 'uploads/1714160069553-original-934514b20300a63e8514d734f70a8209.png', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(9, '1714160103412-Haja rajaveethy_11.pdf', 'uploads/1714160103412-Haja rajaveethy_11.pdf', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(10, '1714160158761-image 7.jpg', 'uploads/1714160158761-image 7.jpg', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(11, '1714160176882-MrSalman Faris Invoice.pdf', 'uploads/1714160176882-MrSalman Faris Invoice.pdf', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(12, '1714184193313-FARHATH_HOME (1).dwg', 'uploads/1714184193313-FARHATH_HOME (1).dwg', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(13, '1714186910057-PLAN_STR_1604.dwg', 'uploads/1714186910057-PLAN_STR_1604.dwg', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(14, '1714186947604-MrSalman Faris Invoice (1).pdf', 'uploads/1714186947604-MrSalman Faris Invoice (1).pdf', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(15, '1714187200493-PLAN_STR_1604.dwg', 'uploads/1714187200493-PLAN_STR_1604.dwg', 0, 0, 0, 0, 0, 0, 0, '2024-05-05 11:02:39', '0000-00-00 00:00:00'),
(16, '1717770684683-Arifeen School VEDARANNIYAM New Hostel Block - FF plan-Model.pdf', 'uploads/1717770684683-Arifeen School VEDARANNIYAM New Hostel Block - FF plan-Model.pdf', NULL, NULL, 0, 0, 0, NULL, NULL, '2024-06-07 20:01:24', '0000-00-00 00:00:00'),
(17, '1717861246830-Arifeen School VEDARANNIYAM New Hostel Block - FF plan-Model.pdf', 'uploads/1717861246830-Arifeen School VEDARANNIYAM New Hostel Block - FF plan-Model.pdf', NULL, 1, 0, 0, 0, NULL, NULL, '2024-06-08 21:10:46', '0000-00-00 00:00:00'),
(18, '1717861918150-column placement - pondicherry.pdf', 'uploads/1717861918150-column placement - pondicherry.pdf', NULL, 1, 0, 0, 0, NULL, NULL, '2024-06-08 21:21:58', '0000-00-00 00:00:00'),
(19, '1717862346374-Lyakathali Plan - with steps.pdf', 'uploads/1717862346374-Lyakathali Plan - with steps.pdf', NULL, 2, 0, 0, 0, NULL, NULL, '2024-06-08 21:29:06', '0000-00-00 00:00:00'),
(20, '1717862744274-Pondichery scheme-01-Model.pdf', 'uploads/1717862744274-Pondichery scheme-01-Model.pdf', NULL, 2, 0, 0, 0, NULL, NULL, '2024-06-08 21:35:44', '0000-00-00 00:00:00'),
(21, '1717914028886-IMG_1163 1.png', 'uploads/1717914028886-IMG_1163 1.png', NULL, 3, 0, 0, 0, NULL, NULL, '2024-06-09 11:50:28', '0000-00-00 00:00:00'),
(22, '1717914957586-CE6702-REG-2013.pdf', 'uploads/1717914957586-CE6702-REG-2013.pdf', NULL, 8, 0, 0, 0, NULL, NULL, '2024-06-09 12:05:57', '0000-00-00 00:00:00'),
(23, '1717915489141-Lyakathali Plan - with steps.pdf', 'uploads/1717915489141-Lyakathali Plan - with steps.pdf', NULL, 10, 0, 0, 0, NULL, NULL, '2024-06-09 12:14:49', '0000-00-00 00:00:00'),
(24, '1717918105032-Pondicherry - Plinth Beam Layout.pdf', 'uploads/1717918105032-Pondicherry - Plinth Beam Layout.pdf', NULL, 2, 0, 0, 0, NULL, NULL, '2024-06-09 12:58:25', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL,
  `blockstatus` tinyint(4) NOT NULL DEFAULT 0,
  `deletestatus` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`id`, `name`, `project_id`, `blockstatus`, `deletestatus`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Foundation', 1, 0, 0, 1, 1, '2024-05-06 22:38:50', '0000-00-00 00:00:00'),
(2, 'Architectural Drawings', 1, 0, 0, 1, 1, '2024-05-07 21:05:50', '2024-05-19 21:45:35'),
(3, 'mus', 1, 0, 0, NULL, NULL, '2024-06-09 08:38:44', '0000-00-00 00:00:00'),
(4, 'yes', 1, 0, 0, NULL, NULL, '2024-06-09 08:39:06', '0000-00-00 00:00:00'),
(5, 'test folder', 1, 0, 0, NULL, NULL, '2024-06-09 08:39:44', '0000-00-00 00:00:00'),
(6, 'Foundation', 2, 0, 0, NULL, NULL, '2024-06-09 08:47:26', '0000-00-00 00:00:00'),
(7, 'test folder 2', 2, 0, 0, NULL, NULL, '2024-06-09 09:04:26', '0000-00-00 00:00:00'),
(8, 'folder test', 3, 0, 0, NULL, NULL, '2024-06-09 12:05:16', '0000-00-00 00:00:00'),
(9, '', 3, 0, 0, NULL, NULL, '2024-06-09 12:05:22', '0000-00-00 00:00:00'),
(10, 'ssssss', 5, 0, 0, NULL, NULL, '2024-06-09 12:14:33', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `blockstatus` tinyint(4) NOT NULL DEFAULT 0,
  `deletestatus` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `blockstatus`, `deletestatus`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Enangudi', 0, 0, 1, 1, '2024-05-05 16:03:56', '0000-00-00 00:00:00'),
(2, 'Chennai', 0, 0, 1, 1, '2024-05-05 16:04:14', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `blockstatus` tinyint(4) NOT NULL DEFAULT 0,
  `deletestatus` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `location_id`, `type_id`, `blockstatus`, `deletestatus`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Balakrishnan ', 1, 1, 0, 0, 1, 1, '2024-04-27 21:11:08', '2024-05-05 16:14:36'),
(2, 'Rizwan Ahmed', 2, 1, 0, 0, 1, 1, '2024-05-05 15:38:56', '2024-05-05 16:14:50'),
(3, 'eeee', 1, NULL, 0, 0, NULL, NULL, '2024-06-09 12:02:33', '0000-00-00 00:00:00'),
(4, 'rrrrr', 3, NULL, 0, 0, NULL, NULL, '2024-06-09 12:04:47', '0000-00-00 00:00:00'),
(5, 'ttttt', 4, NULL, 0, 0, NULL, NULL, '2024-06-09 12:13:59', '0000-00-00 00:00:00'),
(6, 'test', 1, NULL, 0, 0, NULL, NULL, '2024-06-09 17:53:17', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `project_type`
--

CREATE TABLE `project_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `blockstatus` tinyint(4) NOT NULL DEFAULT 0,
  `deletestatus` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_type`
--

INSERT INTO `project_type` (`id`, `type`, `blockstatus`, `deletestatus`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Residence', 0, 0, 1, 1, '2024-05-05 16:06:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'mushthaq', '$2b$10$bH97eicJkHQhPDFZwvbG.ePYx5Qx9WhTvQQaLJwUY0ZPDLyURay6u', '2024-06-13 18:00:52', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_type`
--
ALTER TABLE `project_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `project_type`
--
ALTER TABLE `project_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
