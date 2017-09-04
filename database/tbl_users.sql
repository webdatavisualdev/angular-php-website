-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2017 at 10:40 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_alert`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `userid` int(8) NOT NULL,
  `clientid` int(8) NOT NULL,
  `usr_username` varchar(50) NOT NULL,
  `usr_password` varchar(30) NOT NULL,
  `usr_email` varchar(50) NOT NULL,
  `roleid` int(11) NOT NULL,
  `usr_picture` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`userid`, `clientid`, `usr_username`, `usr_password`, `usr_email`, `roleid`, `usr_picture`) VALUES
(1, 4500001, 'User 1 fist name last name', 'password', 'user1@client1.com', 1, ''),
(2, 4500002, 'User 2 fist name last name', 'password', 'user2@client2.com', 2, ''),
(3, 4500003, 'User 3 fist name last name', 'password', 'user3@client3.com', 3, ''),
(4, 4500004, 'User 4 fist name last name', 'password', 'user4@client4.com', 4, ''),
(5, 4500005, 'User 5 fist name last name', 'password', 'user5@client5.com', 5, ''),
(6, 4500006, 'User 6 fist name last name', 'password', 'user6@client6.com', 6, ''),
(7, 4500007, 'User 7 fist name last name', 'password', 'user7@client7.com', 7, ''),
(8, 4500008, 'User8 fist name last name', 'password', 'user8@client8.com', 8, ''),
(9, 4500009, 'User9 fist name last name', 'password', 'user9@client9.com', 9, ''),
(10, 4500010, 'User10 fist name last name', 'password', 'user10@client10.com', 10, ''),
(11, 4500011, 'User11 fist name last name', 'password', 'user11@client11.com', 11, ''),
(12, 4500001, 'User 12 fist name last name', 'password', 'user12@client1.com', 12, ''),
(13, 4500003, 'User 13 fist name last name', 'password', 'user13@client3.com', 12, ''),
(14, 4500004, 'User 14 fist name last name', 'password', 'user14@client4.com', 12, ''),
(15, 4500001, 'aaa', 'aaaa', 'aaa@gmail.com', 2, 0x4b6f616c612e6a7067);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD UNIQUE KEY `userid` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `userid` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
