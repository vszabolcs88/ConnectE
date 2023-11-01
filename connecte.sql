-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 01:49 PM
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
(179, 'Bookshelf', 'Check out my new bookshelf!!!', 'http://localhost:3000/images/pexels-pixabay-159711.jpg1687857704054.jpg', '20', '2023-06-27 10:21:44'),
(180, 'Travelling to Budapest', 'Outstanding architecture, illustrious history, and unbeatable culture: there’s so much to discover on Budapest holidays', 'http://localhost:3000/images/pexels-szabolcs-toth-3148096.jpg1687858029732.jpg', '20', '2023-06-27 10:27:09'),
(230, 'Post to delete', 'dummy text', 'http://localhost:3000/images/Dr_Trouble_Double_Oak_Smoked_Chilli_Sauce.jpg1690360554780.jpg', '20', '2023-07-26 09:35:54'),
(234, 'Delete', 'Post to delete', NULL, '41', '2023-10-25 21:20:27');

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
(5, 19, 179),
(77, 19, 180),
(78, 20, 180),
(80, 20, 179),
(81, 20, 230),
(86, 41, 234),
(87, 19, 230);

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
(19, 'robert', 'robert@gmail.com', '$2b$10$6OaYSqB4dF4Lo6ybn1gZKOJcP6BRnraT5TCbhOFNd3i23oY4ynbPC', '2023-06-14 18:06:10'),
(20, 'szabolcs', 'szabolcs@gmail.com', '$2b$10$N4nao4YtEBwMZUzZchJF7.YyKzzimSbTfUBk8MV9UVIPf0HinBqDu', '2023-06-14 18:06:10'),
(41, 'test', 'test@gmail.com', '$2b$10$PiiTRDMK54PSqc.vO8yTEetdIWA8mfiVDG9pbJNVw5hNzS8nwi8wG', '2023-10-25 21:19:33');

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
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `read_table`
--
ALTER TABLE `read_table`
  MODIFY `read_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
