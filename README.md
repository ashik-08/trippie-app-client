# Trippie - Client Side

Welcome to Trippie, a comprehensive travel management application that allows users to book hotels, join tours, view guide profiles and make appointments with tour guides. This README provides an overview of the project, setup instructions and credentials for testing different features.

## Table of Contents

- [Trippie - Client Side](#trippie---client-side)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
    - [User Authentication](#user-authentication)
    - [Hotel Booking](#hotel-booking)
    - [Tour Management](#tour-management)
    - [Guide Profiles](#guide-profiles)
  - [Credentials](#credentials)
    - [User](#user)
    - [Admin](#admin)
    - [Hotel Manager](#hotel-manager)
    - [Tour Agent](#tour-agent)
    - [Tour Guide](#tour-guide)
  - [Project Structure](#project-structure)
  - [License](#license)
    - [Summary](#summary)

## Project Description

Trippie is a travel management application designed to simplify the process of booking hotels, joining tours, viewing guide profiles and making appointments with tour guides. The application provides a user-friendly interface and integrates with various external services to offer a seamless experience for users.

## Features

- **User Authentication**: Secure login and registration using Firebase Auth.
- **Hotel Booking**: Search for hotels, view details, select rooms and make bookings.
- **Tour Management**: View available tours, join tours and make payments.
- **Guide Profiles**: View tour guide profiles and make appointments.
- **Email Notifications**: Receive booking and appointment confirmation emails.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, Axios, Tanstack Query
- **Backend**: Express, Mongoose, SendGrid, Bcrypt, JWT, Node-Cron
- **Payment Processing**: Stripe

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ashik-08/trippie-app-client.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your environment variables:

   ```plaintext
   VITE_SERVER_URL=<your_server_url>
   VITE_APIKEY=<your_firebase_api_key>
   VITE_AUTHDOMAIN=<your_firebase_auth_domain>
   VITE_PROJECTID=<your_firebase_project_id>
   VITE_STORAGEBUCKET=<your_firebase_storage_bucket>
   VITE_MESSAGINGSENDERID=<your_firebase_messaging_sender_id>
   VITE_APPID=<your_firebase_app_id>
   VITE_STRIPE_PUBLIC_KEY=<your_stripe_public_key>
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`.

## Usage

### User Authentication

- **Login**: Users can log in using their email and password.
- **Registration**: New users can register by providing their details.

### Hotel Booking

- **Search for Hotels**: Users can search for hotels based on various criteria.
- **View Hotel Details**: Users can view detailed information about a hotel including available rooms.
- **Select Room**: Users can select a room and proceed to booking.
- **Make Booking**: Users can make a booking and receive a confirmation email.

### Tour Management

- **View Tours**: Users can view available tours.
- **Join Tour**: Users can join a tour and make a payment.
- **Receive Confirmation**: Users receive a tour booking confirmation email.

### Guide Profiles

- **View Guide Profiles**: Users can view profiles of tour guides.
- **Make Appointment**: Users can make an appointment with a tour guide.
- **Receive Confirmation**: Users receive an appointment confirmation email.

## Credentials

Use the following credentials to log in and test different features:

### User

- **Email**: <use_your_own_email>

### Admin

- **Email**: admin@trippie.com
- **Password**: Tri@1234

### Hotel Manager

- **Email**: alice@mail.com
- **Password**: Tri@1234

### Tour Agent

- **Email**: t.agent@mail.com
- **Password**: Tri@1234

### Tour Guide

- **Email**: tanjir.gd@gmail.com
- **Password**: Tri@1234
- **Email**: guide-jack@mail.com
- **Password**: Tri@1234
- **Email**: yeamin@gmail.com
- **Password**: Tri@1234

## Project Structure

```plaintext
trippie-app-client/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── layout/
│   ├── pages/
│   ├── Provider/
│   ├── Routes/
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
└── tailwind.config.js
└── vite.config.js
```

## License

This project is licensed under a **Proprietary License**. No part of this project may be used, copied, modified or distributed without explicit permission from the project owner.

---

For any questions or support, please contact Md. Ashikur Rahman Ashik.

### Summary

This detailed README file provides an in-depth overview of the Trippie client-side project including project description, features, technologies used, setup instructions, usage, credentials for testing, project structure and license information.
