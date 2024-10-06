# SMU Health & Wellness Platform

Welcome to the **SMU Health & Wellness Platform**, developed for the SMU Hackathon. This platform promotes mental and physical well-being among students by providing various services, such as mental health resources, telemedicine consultations, peer support sessions, and fitness tracking.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
-  [Setup and Installation](#setup-and-installation)
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
  - MongoDB: NoSQL database used for storing data.

- **Real-Time Communication**:
  - WebRTC: Technology for real-time peer-to-peer communication between users for video/audio calls.
  - Peer.js: Simplifies WebRTC connections for video chat.
  - Socket.io: Used for real-time notifications (e.g., call alerts).

- **Authentication**:
  - JWT (JSON Web Tokens): Used for securely transmitting information between frontend and backend.

## Contributors

- **[Your Name](https://github.com/yourusername)**: Project Lead, Frontend & Backend Developer
- **[Contributor 2](https://github.com/contributor2)**: Peer Support Video Call Integration
- **[Contributor 3](https://github.com/contributor3)**: Fitness Tracker & Telemedicine Features

## Features

The platform offers the following key features:

- **Mental Health Resources**: Provides students access to curated mental health resources.
- **Fitness Tracker**: A section where students can log, track, and monitor their fitness activities.
- **Telemedicine**: Book appointments with health professionals via the platform.
- **Peer Support**: Students can book peer support sessions with mentors or experts to help with emotional and mental challenges.
- **Real-Time Video Calls**: Video chat functionality between students and professionals via WebRTC.
- **Real-Time Notifications**: Get notified when a peer mentor or doctor initiates a video call, allowing users to accept or decline.

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


