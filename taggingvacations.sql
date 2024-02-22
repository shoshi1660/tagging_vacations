-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 02:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taggingvacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `followingId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `following`
--

INSERT INTO `following` (`followingId`, `id`, `vacationId`) VALUES
(96, 105, 235),
(97, 105, 234),
(98, 104, 237),
(99, 104, 234),
(100, 107, 234),
(101, 107, 235);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `userName`, `password`, `role`) VALUES
(2, 'שושנה', 'לוין', 'shoshanaLevin', 'shoshana1660', 'admin'),
(104, 'יוסי', 'לוין', 'יוסףצבי', 'לוין3615', NULL),
(105, 'חיים', 'לוין', 'חייםלוין', 'חייםלוין', NULL),
(106, 'מוישי', 'לוין', 'מוישילוין', 'מוישילוין', NULL),
(107, 'משה', 'משה', 'משהמשה', 'מושיקומושיקו', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(6) NOT NULL,
  `description` varchar(50) NOT NULL,
  `destination` varchar(40) NOT NULL,
  `Image` varchar(20) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `amountFollowers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `Image`, `startDate`, `endDate`, `price`, `amountFollowers`) VALUES
(234, 'סופ\"ש משפחתי בקפריסין הטורקית: ', 'קפריסין', 'קפריסין.jpg', '2023-05-31', '2023-06-02', 1234, 3),
(235, 'לאונרדו רויאל ריזורט אילת', 'אילת', '25201445341.png', '2023-05-30', '2023-06-06', 1234, 2),
(236, 'בילוי משפחתי, אתגרי או רומנטי.', 'הוטל נווה אילן', '10-3.jpg', '2023-06-05', '2023-07-06', 1234, 0),
(237, 'חופשה מלאת אקשן וחוויות בלתי נשכחות', 'יו ספלאש ריזורט – פתאל', 'u-pool.jpg', '2023-06-05', '2023-07-06', 1234, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`followingId`),
  ADD KEY `id` (`id`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName_2` (`userName`),
  ADD KEY `userName` (`userName`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `following`
--
ALTER TABLE `following`
  MODIFY `followingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `following`
--
ALTER TABLE `following`
  ADD CONSTRAINT `following_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `following_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
