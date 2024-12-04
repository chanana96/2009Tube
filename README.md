# Lobstertube - Video Sharing Platform

A modern video sharing platform built with React and Node.js, featuring video uploading, streaming,
and social features.

## Features

- 🎥 Video upload and HLS streaming
- 👤 User authentication and profiles
- 🎨 Modern Material UI design
- ⭐ Video rating system
- 💾 File upload with progress tracking
- 🚀 Responsive layout

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- Material UI v6 components
- React Router v6 for routing
- React Query for data fetching
- Video.js for video playback
- Axios for HTTP requests

### Backend

- Node.js with Express
- TypeScript
- Sequelize ORM
- MySQL database
- Redis for caching
- AWS S3 for storage
- FFmpeg for video processing
- JWT for authentication

### Infrastructure

- AWS S3 for video/image storage
- HLS (HTTP Live Streaming) for video delivery
- Redis caching layer
- Docker containerization
- Jest for testing

## Getting Started

```sh
# Install dependencies
npm install

# Start development servers
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## Environment Variables

Create `.env` files in both frontend and backend directories. See `.env.example` for required
variables.

## API Documentation

The API provides endpoints for:

- User authentication
- Video upload and management
- Profile management
- Video streaming

## License

MIT
