# VicharStream

<p align="center">
  <img src="https://img.shields.io/badge/Powered_by-Spring_Boot-green?style=for-the-badge&logo=spring-boot" alt="Powered by Spring Boot">
  <img src="https://img.shields.io/badge/Powered_by-React-blue?style=for-the-badge&logo=react" alt="Powered by React">
  <img src="https://img.shields.io/badge/Powered_by-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Powered by Tailwind CSS">
  <img src="https://img.shields.io/badge/Powered_by-PostgreSQL-316192?style=for-the-badge&logo=postgresql" alt="Powered by PostgreSQL">
</p>

## Overview

VicharStream is a web application that provides user registration, OTP verification, and other functionalities. It is built using Spring Boot for the backend and React for the frontend, with Tailwind CSS for styling.

<p align="center">
  <img src="public/demo/home.png" width="1000" alt="Home Image" style="border: 2px solid beige;">
</p>


## Features

- User Registration and Login
- OTP Verification for Password Recovery
- Protected Routes for Authenticated Users
- User Management
- Email Notifications


## Backend

The backend is built using Spring Boot and provides RESTful APIs for user management, OTP verification, and email notifications.

### Key Files and Directories

- [`server/src/main/java/com/application/server/controller/ForgotPasswordController.java`](server/src/main/java/com/application/server/controller/ForgotPasswordController.java): Handles password recovery requests.
- [`server/src/main/java/com/application/server/controller/UserController.java`](server/src/main/java/com/application/server/controller/UserController.java): Manages user registration, verification, and login.
- [`server/src/main/java/com/application/server/service/Impl/UserServiceImpl.java`](server/src/main/java/com/application/server/service/Impl/UserServiceImpl.java): Implements user-related services.
- [`server/src/main/java/com/application/server/service/Impl/EmailService.java`](server/src/main/java/com/application/server/service/Impl/EmailService.java): Sends email notifications.
- [`server/src/test/java/com/application/server/service/EmailServiceTest.java`](server/src/test/java/com/application/server/service/EmailServiceTest.java): Unit tests for the email service.

### User Registration and OTP Verification
<p align="center">
  <img src="public/demo/authentication-system.png" width="1000" alt="Decentralized Exchange">
</p>


## Frontend

The frontend is built using React and styled with Tailwind CSS. It provides a user-friendly interface for registration, login, and other functionalities.

### Key Files and Directories

- [`client/src/App.js`](client/src/App.js): Main application component that sets up routing.
- [`client/src/components/ForgotPassword.js`](client/src/components/ForgotPassword.js): Component for password recovery.
- [`client/src/components/Footer.js`](client/src/components/Footer.js): Footer component.
- [`client/src/pages/Home.js`](client/src/pages/Home.js): Home page component.
- [`client/src/index.css`](client/src/index.css): Tailwind CSS configuration.

## Getting Started

### Prerequisites

- Node.js
- npm
- Java
- Maven

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/vicharstream.git
cd vicharstream
```

2. Install frontend dependencies:

```sh
cd client
npm install
```

3. Install backend dependencies:

```sh
cd ../server
./mvnw install
```

### Running the Application

1. Start the backend server:

```sh
cd server
./mvnw spring-boot:run
```

2. Start the frontend development server:

```sh
cd client
npm start
```

### Running Tests

#### Backend Tests
To run backend tests, use the following command:
```sh
cd server
./mvnw clean package
```

#### Frontend Tests
To build the frontend for production, use the following command:
```sh
cd client
npm run build
```