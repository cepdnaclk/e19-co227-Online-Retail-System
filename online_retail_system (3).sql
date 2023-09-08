-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2023 at 04:23 PM
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
-- Database: `online_retail_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartID` int(50) NOT NULL,
  `customerID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cartID` int(50) NOT NULL,
  `productID` int(50) NOT NULL,
  `sellerID` int(50) NOT NULL,
  `qty` int(10) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryID` int(10) NOT NULL,
  `categoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `categoryName`) VALUES
(1, 'Electronics'),
(2, 'Men\'s Fashion');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` int(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `addressL1` varchar(100) NOT NULL,
  `addressL2` varchar(100) DEFAULT NULL,
  `addressL3` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `firstName`, `lastName`, `email`, `phoneNumber`, `addressL1`, `addressL2`, `addressL3`, `password`, `role`) VALUES
(49, 'Nipul', 'Viduranga', 'nipulviduranga@gmail.com', '+94713966820', 'gggggggg', 'gggggggg', 'nipulviduranga@gmail.com', '$2b$10$s0qkzQOiyDSAfrBWkA8XouNvxm9zRTrAdUo9.MV.E41iY6BI54Nbm', 'seller'),
(50, 'Nipul', 'Viduranga', 'viduranga@gmail.com', '+94713966820', 'gggggggg', 'gggggggg', 'nipulviduranga@gmail.com', '$2b$10$ExG6udgL0TfAix144XkIu.C4FPZWfRxzgJboxLs/5GfCudejZC.RS', ''),
(51, 'Nipul', 'Viduranga', 'nipul@gmail.com', '+94713966820', 'gggggggg', 'gggggggg', '12345678', '$2b$10$smdYhY41O5k0BhgOdd5MmOsn2uhzgTxpK643d0IG9EBIfddc1m9Y2', ''),
(52, 'Nipul', 'Viduranga', 'ranga@gmail.com', '+94713966820', 'gggggggg', 'gggggggg', '12345678', '$2b$10$D3T1SSU9/.hvxx5xqRFBQOBfrUYqhs73AKjIRKcyt5lJqqt1Pf3ia', ''),
(53, 'Nipul', 'Viduranga', 'nianga@gmail.com', '+94713966820', 'gggggggg', 'gggggggg', '12345678', '$2b$10$MbKD7noAYbD7XLbVCmWGRON/jLn3UJ9EpYMti/rDXdsAaN2xAVxrO', '');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderID` int(50) NOT NULL,
  `customerID` int(50) NOT NULL,
  `sellerID` int(50) NOT NULL,
  `orderDate` varchar(100) NOT NULL,
  `orderTotal` float NOT NULL,
  `orderStatus` varchar(100) DEFAULT NULL,
  `transactionID` int(50) DEFAULT NULL,
  `trackingID` int(50) DEFAULT NULL,
  `deliveryCompany` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `orderID` int(50) NOT NULL,
  `productID` int(50) NOT NULL,
  `itemQty` int(10) NOT NULL,
  `totalPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productID` int(50) NOT NULL,
  `sellerID` int(50) NOT NULL,
  `productName` varchar(200) NOT NULL,
  `categoryID` int(10) NOT NULL,
  `productPrice` double NOT NULL,
  `productQty` int(10) NOT NULL,
  `productImage1` varchar(500) NOT NULL,
  `productImage2` varchar(500) DEFAULT NULL,
  `productImage3` varchar(500) DEFAULT NULL,
  `productImage4` varchar(500) DEFAULT NULL,
  `productImage5` varchar(500) DEFAULT NULL,
  `productDetails` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `sellerID`, `productName`, `categoryID`, `productPrice`, `productQty`, `productImage1`, `productImage2`, `productImage3`, `productImage4`, `productImage5`, `productDetails`) VALUES
(1, 0, 'Selfie Light', 1, 5, 5, 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-3.jpg?alt=media&token=3a6043b7-5d6f-43f1-bd2c-104ba5529f20', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-4.jpg?alt=media&token=337912ea-e367-45b9-a013-f5ac5bb914d5', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-1.jpg?alt=media&token=8d073381-525f-4e07-a944-ec2b9f4d755d', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-2.jpg?alt=media&token=228d876a-ca31-430d-a9c3-4257957b2b17', '', 'selfie light'),
(2, 1, 'Selfie Light', 1, 5, 5, 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-3.jpg?alt=media&token=3a6043b7-5d6f-43f1-bd2c-104ba5529f20', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-4.jpg?alt=media&token=337912ea-e367-45b9-a013-f5ac5bb914d5', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-1.jpg?alt=media&token=8d073381-525f-4e07-a944-ec2b9f4d755d', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fnovelty-led-fill-light-ring-selfie-lamp_main-2.jpg?alt=media&token=228d876a-ca31-430d-a9c3-4257957b2b17', '', 'selfie light'),
(3, 1, 'Night Light', 1, 5, 5, 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fmini-wireless-infrared-motion-sensor-cei_description-0.jpg?alt=media&token=a24198e7-dcff-443c-8bb1-09222f9afb92', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fmini-wireless-infrared-motion-sensor-cei_description-3.jpg?alt=media&token=880b616a-ea85-4a99-9ddf-dbb0ccffe352', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fmini-wireless-infrared-motion-sensor-cei_description-2.jpg?alt=media&token=19806fdf-0960-4d9e-9709-fb33583c872d', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2Fmini-wireless-infrared-motion-sensor-cei_description-1.jpg?alt=media&token=c1f94747-9540-4d42-b91a-dfd420f23758', 'https://firebasestorage.googleapis.com/v0/b/online-retail-system.appspot.com/o/product%2F1%2FMain.jpg?alt=media&token=545ae47f-434e-42be-bd77-553bac042da9', 'wrlvjnlwjnrlvnlwrnvl');

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `sellerID` int(50) NOT NULL,
  `customerID` int(50) NOT NULL,
  `shopName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`sellerID`, `customerID`, `shopName`) VALUES
(1, 49, 'SellFirst');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `subCategoryID` int(10) NOT NULL,
  `categoryID` int(10) NOT NULL,
  `subCategoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`subCategoryID`, `categoryID`, `subCategoryName`) VALUES
(1, 1, 'Lights'),
(2, 1, 'Mobile Phones'),
(3, 1, 'Watch'),
(4, 2, 'T-Shirts'),
(5, 2, 'Shirts');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transactionID` int(50) NOT NULL,
  `customerID` int(50) NOT NULL,
  `paymentMethod` varchar(100) DEFAULT NULL,
  `totalPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`sellerID`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`subCategoryID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transactionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartID` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderID` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `sellerID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `subCategoryID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transactionID` int(50) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`);

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `sub_category_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
