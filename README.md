# TestPilotAI

A modern AI-powered API Testing and Test Automation Platform designed to simplify API validation, test generation, reporting, and automation workflows.

## Overview

TestPilotAI helps developers, QA engineers, and testers perform API testing through a clean and intuitive interface. The platform provides real-time API execution, response analysis, request history tracking, collections management, reporting, and AI-assisted testing capabilities.

The goal of TestPilotAI is to become a unified testing platform that combines API testing, automated test generation, UI automation, reporting, and AI-driven insights.

---

## Current Features

### API Testing

* Send GET, POST, PUT, DELETE requests
* Custom headers support
* Request body editor
* Real-time response viewer
* Response status tracking
* Response time measurement
* JSON response formatting

### Dashboard

* Modern analytics dashboard
* Testing metrics overview
* Recent activity tracking

### Authentication UI

* Login page
* Signup page
* Protected route structure

### User Experience

* Responsive modern interface
* Professional SaaS design
* Dark/light-ready architecture
* Sidebar navigation
* Profile management UI

### Backend

* Express.js REST API
* MongoDB Atlas integration
* Mongoose database layer
* API proxy engine
* Environment configuration

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Axios
* dotenv

### Development Tools

* Git
* GitHub
* VS Code
* Gemini AI Studio
* Google AI Studio

---

## Project Structure

```plaintext
TestPilotAI
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── services
│   │   └── App.tsx
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   └── models
│   │
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/TestPilotAI.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```plaintext
http://localhost:3000
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run at:

```plaintext
http://localhost:5000
```

### Environment Variables

Create:

```plaintext
backend/.env
```

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## Screenshots

### Landing Page

![alt text](image.png)

### Dashboard

![alt text](image-1.png)

### API Testing

![alt text](image-2.png)

---

## Roadmap

### Phase 1

* [x] Frontend UI
* [x] API Testing Engine
* [x] MongoDB Integration
* [ ] Request History
* [ ] Dashboard Analytics

### Phase 2

* [ ] Collections
* [ ] Environment Variables
* [ ] Saved Requests
* [ ] Import Collections

### Phase 3

* [ ] Authentication
* [ ] User Profiles
* [ ] Workspaces
* [ ] Team Collaboration

### Phase 4

* [ ] AI Test Generator
* [ ] Automated Test Creation
* [ ] Smart Recommendations
* [ ] AI-Powered Reports

### Phase 5

* [ ] UI Automation
* [ ] Scheduled Testing
* [ ] PDF Reports
* [ ] CI/CD Integration

---

## Author

**Charu Kalyani**

Building TestPilotAI to simplify modern software testing through automation and AI-powered workflows.
