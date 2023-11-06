-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2023 at 02:12 AM
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
-- Database: `connecte`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `date_published` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `title`, `body`, `imgUrl`, `userId`, `date_published`) VALUES
(238, 'My new bookshelf!!!', 'Excited to share my newest addition to the home - a beautiful bookshelf! It\'s the perfect spot to display my favorite reads, and I can\'t wait to organize and fill it with all my literary treasures.', 'http://localhost:3000/images/pexels-pixabay-159711.jpg1699145167089.jpg', '43', '2023-11-05 00:46:07'),
(239, 'Journey', 'Exploring new horizons and embracing the journey of a lifetime! Traveling opens our hearts and minds to diverse cultures, creating memories that last a lifetime. ', 'http://localhost:3000/images/pexels-szabolcs-toth-3148096.jpg1699145345426.jpg', '43', '2023-11-05 00:49:05'),
(240, 'A loyal companion by your side.', 'Meet my furry best friend, always there to brighten my day with their unconditional love and endless energy! ', 'http://localhost:3000/images/pexels-stephanie-casanova-15347387.jpg1699145642633.jpg', '44', '2023-11-05 00:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `read_table`
--

CREATE TABLE `read_table` (
  `read_id` int(11) NOT NULL,
  `read_userId` int(11) NOT NULL,
  `read_postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `read_table`
--

INSERT INTO `read_table` (`read_id`, `read_userId`, `read_postId`) VALUES
(92, 43, 238),
(93, 43, 239),
(94, 44, 240);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `account_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `account_created`) VALUES
(43, 'szabolcs', 'szabolcs@example.com', '$2b$10$OkHyj5ZAlZlVT.2zFf73eOe.RIO2nEygr3T6Tvsfb8rnneU9asS3m', '2023-11-05 00:29:13'),
(44, 'robert', 'robert@example.com', '$2b$10$4Mf6MJgv6q/8wgo8fCw3Eu5byyprIOQNrl03ISMCNbkCRK.4SA8oy', '2023-11-05 00:49:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `read_table`
--
ALTER TABLE `read_table`
  ADD PRIMARY KEY (`read_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `read_table`
--
ALTER TABLE `read_table`
  MODIFY `read_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
