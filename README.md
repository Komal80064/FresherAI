# 🚀 FresherAI – AI-Powered Career Preparation Platform

FresherAI is an AI-powered career preparation platform designed to help students and freshers prepare for technical interviews, evaluate their resumes, and create personalized career roadmaps.

## 🌐 Live Demo

**Frontend:** https://d1ft4y6n9f4v6f.cloudfront.net/

## ✨ Features

- **AI Mock Interviews:** Practice Technical and HR interviews with AI-generated questions and feedback.
- **Resume Scorer:** Analyze resumes and get AI-powered suggestions to improve them.
- **AI Career Roadmap:** Generate personalized learning roadmaps based on career goals.
- **Learning Resources:** Get relevant documentation and YouTube learning resources.
- **User Authentication:** Secure login and signup functionality.
- **Dashboard:** Manage interview activity, roadmaps, and career preparation progress.

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT Authentication
- Microservices Architecture

### AI & Integrations
- LangChain
- LangGraph
- Groq API
- GPT-OSS-120B
- YouTube Data API

### Deployment & DevOps
- AWS CloudFront
- AWS Application Load Balancer
- AWS ECR
- Docker
- Docker Compose

## 🏗️ Architecture

FresherAI follows a microservices-based architecture.

- **Gateway Service:** Handles incoming API requests and routes them to the appropriate services.
- **Auth Service:** Manages user authentication and sessions.
- **Resume Service:** Handles resume-related operations and scoring.
- **Interview Service:** Manages AI-powered mock interviews and feedback.
- **Roadmap Service:** Generates personalized career roadmaps and learning resources.
- **Billing Service:** Handles billing-related operations.

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Komal80064/FresherAI.git
cd FresherAI
```

### 2. Install dependencies

Install dependencies in the frontend and each backend service directory.

```bash
npm install
```

### 3. Configure environment variables

Create `.env` files according to the requirements of each service.

Add the required configuration:

- MongoDB connection string
- Redis connection details
- JWT secret
- Groq API key
- YouTube API key
- Firebase service account credentials
- Other service-specific environment variables

**Never commit actual API keys, passwords, private keys, or `.env` files to GitHub.**

### 4. Run the application

Start the backend services and frontend according to their individual configurations.

## 🔐 Security

- Environment variables are used for sensitive configuration.
- Authentication is handled through backend services.
- Private credentials are excluded from version control.

## 👩‍💻 Developer

**Komal Panwar**

B.Tech Information Technology Student | Frontend Developer

- GitHub: https://github.com/Komal80064
- LinkedIn: https://www.linkedin.com/in/komal-panwar800

---

⭐ If you find this project interesting, consider giving it a star!