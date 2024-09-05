# frontend Wondergems

**Version:** 1.0  
**Author:** Aram Wondergem  

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Installation Steps](#installation-steps)
4. [Usage](#usage)
5. [Roles and Test Accounts](#roles-and-test-accounts)

## Introduction

This document provides the installation guide for the frontend of the Wonder Gems application. Wonder Gems is a web application that allows a hobby chef to send a menu to friends and family, and manage all aspects of menu orders and delivery.

In this guide, you'll find the required software and steps to set up the Wonder Gems frontend. Additionally, it explains how to use the frontend, including login credentials for various test accounts.


## Requirements

- **WebStorm**: A JavaScript IDE by JetBrains for web development. [Download WebStorm](https://www.jetbrains.com/webstorm/download).

## Installation Steps

### Run the Backend Locally
Follow the README of the [backend](https://github.com/AramWondergem/final-assignment-bootcamp-backend) of the web application.

### Setting Up with WebStorm

1. **Download and Install WebStorm**: Get WebStorm from [here](https://www.jetbrains.com/webstorm/download).
2. **Open the Project**: Launch WebStorm and open the `wondergems-frontend` folder.
3. **Install Dependencies and Start the App**: Open the terminal in WebStorm and run:
   ```bash
   npm install
   npm run start
4.Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage

### Cook Features

- Log in or create an account, then click **"Become Cook"** on your profile page.
- Create and manage menus from the dashboard. Add customers by email.
- Accept or decline orders and communicate delivery times using the dashboard options.

### Customer Features

- Log in to view available menus and place orders.
- Manage your profile and order history.

## Roles and Test Accounts

| Username       | Password     | Roles           | Description                                   |
|----------------|--------------|-----------------|-----------------------------------------------|
| user@test.nl   | Hallo1test!  | USER            | A customer linked to cook@test.nl.            |
| cook@test.nl   | Hallo1test!  | USER, COOK      | A cook who can create and send menus.         |
| admin@test.nl  | Hallo1test!  | USER, COOK, ADMIN | Admin with full access.                     |


