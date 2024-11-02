# AI Model Integration

This project integrates an AI model for prediction tasks, combining both front-end and back-end components.

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
   - [Front-End](#front-end)
   - [Back-End](#back-end)
5. [Running the Project](#running-the-project)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The AI Model Integration project allows users to interact with an AI model through a user-friendly front-end, providing predictions based on various input parameters. The front-end is built using React, while the back-end is built using FastAPI (or an equivalent API framework).

---

## Project Structure

```
AI-Model-Integration
├── backend
│   ├── app.py                   # Main FastAPI server file
│   ├── model                    # Directory containing AI model files
│   └── requirements.txt         # Backend dependencies
│
├── frontend
│   ├── src
│   │   ├── components           # Contains React components
│   │   ├── App.js               # Main application file
│   │   └── index.js             # Entry point for React app
│   └── package.json             # Frontend dependencies
│
└── README.md
```

---

## Prerequisites

- **Node.js** and **npm**: Required for the front-end (React) setup.
- **Python 3.7+**: Required for the back-end (FastAPI) setup.
- **Virtual Environment**: Recommended for isolating back-end dependencies.

---

## Setup Instructions

### 1. Front-End Setup

1. **Navigate to the `frontend` folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Update configuration**:
   - Modify any API endpoints or configurations as necessary in `src/config.js`.

### 2. Back-End Setup

1. **Navigate to the `backend` folder**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Unix
   .\venv\Scripts\activate   # For Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI server**:
   ```bash
   uvicorn app:app --reload
   ```
   The server will start on `http://127.0.0.1:8000`.

---

## Running the Project

1. **Start the Back-End Server**:
   Ensure the FastAPI server is running:
   ```bash
   cd backend
   uvicorn app:app --reload
   ```

2. **Start the Front-End Server**:
   Open a new terminal and run:
   ```bash
   cd frontend
   npm start
   ```
   The React app will start on `http://localhost:3000`.

---

## Configuration

### 1. Front-End Configuration
- API Endpoint: The endpoint for interacting with the AI model is defined in the front-end. Update it to match the back-end's IP and port if necessary.

### 2. Back-End Configuration
- **Model Location**: Place your trained model files in the `backend/model` directory and update any paths in the back-end code as needed.
- **Dependencies**: Add any additional libraries required by the model in `requirements.txt`.

---

## Troubleshooting

1. **CORS Issues**: If there are CORS errors when connecting between the front-end and back-end, update the CORS settings in the FastAPI server (`app.py`).

2. **API Errors**: Check the console logs in both the front-end and back-end terminals for specific error messages.

3. **Dependency Errors**: Ensure all libraries in `requirements.txt` (back-end) and `package.json` (front-end) are installed correctly.

4. **Port Conflicts**: Ensure no other applications are running on ports `3000` (React) and `8000` (FastAPI) when starting the servers.
