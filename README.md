# SMU Health & Wellness Platform

Welcome to the **SMU Health & Wellness Platform**, developed for the SMU Hackathon. This platform promotes mental and physical well-being among students by providing various services, such as mental health resources, telemedicine consultations, peer support sessions, and fitness tracking.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Features

- **Mental Health Resources**: Access a variety of resources to improve your mental health and well-being.
- **Fitness Tracker**: Keep track of your fitness goals and monitor daily activities.
- **Telemedicine**: Book appointments with healthcare professionals and join video consultations.
- **Peer Support**: Connect with peers for emotional support and mental well-being.
- **Chatbot Integration**: An intelligent assistant to answer your general health-related queries.
- **Video Calls**: Real-time video consultations via WebRTC between students and doctors.

## Technologies Used

The project utilizes the following technologies:

- **Frontend**:
  - React.js: A JavaScript library for building user interfaces.
  - Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
  
- **Backend**:
  - Node.js: JavaScript runtime built on Chrome's V8 engine.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database is used to store data.

- **Real-Time Communication**:
  - WebRTC: Technology for real-time peer-to-peer communication between users for video/audio calls.
  - Peer.js: Simplifies WebRTC connections for video chat.
  - Socket.io: Used for real-time notifications (e.g., call alerts).

- **Authentication**:
  - JWT (JSON Web Tokens): Used for securely transmitting information between frontend and backend.

## Contributors

- **[Sai Preetham Dongari](https://github.com/preethamdnr)**:  Frontend & Backend Developer
- **[Rama Krishna Aruva](https://github.com/Ramaruva)**: Frontend & Backend Developer 


## Features

The platform offers the following key features:

- **Mental Health Resources**: Provides students access to curated mental health resources.
- **Fitness Tracker**: A section where students can log, track, and monitor their fitness activities.
- **Telemedicine**: Book appointments with health professionals via the platform.
- **Peer Support**: Students can book peer support sessions with mentors or experts to help with emotional and mental challenges.
- **Real-Time Video Calls**: Video chat functionality between students and professionals via WebRTC.
- **Real-Time Notifications**: Get notified when a peer mentor or doctor initiates a video call, allowing users to accept or decline.
## Setup and Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Install Node.js here](https://nodejs.org)
- **MongoDB**: [Install MongoDB here](https://www.mongodb.com)
- **npm**: Installed with Node.js for managing dependencies.

### Installation Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/health-wellness-platform.git
   cd health-wellness-platform
## Usage

### Peer Support Booking

- Browse available peer mentors and doctors.
- Select a peer mentor, choose an available date, and book a session based on time slots.
- Once a session is confirmed, students can access the video chat feature to join a video call with their mentor/doctor at the scheduled time.

### Video Calls with WebRTC

- Real-time video calls between students and mentors/doctors using WebRTC.
- When a call is initiated, notifications will appear, allowing the recipient to accept or decline the call.
- WebRTC and Peer.js are used for the video connection, while Socket.io handles the real-time notifications.

### Fitness Tracker

- The fitness tracker allows students to input and track daily activities, set fitness goals, and monitor their progress.

### Telemedicine

- Students can book telemedicine consultations with a doctor for serious concerns, facilitated through the video call feature.


## Project Structure

The project consists of a **frontend** built with React and a **backend** using Node.js, Express.js, MongoDB, and Socket.io for real-time communication.

```bash
hackSmu-SealFour/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── api/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md


