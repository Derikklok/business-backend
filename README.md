# Business Panel Backend

A modern business server application built with cutting-edge technologies.

## 🛠️ Technology Stack

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Elysia](https://img.shields.io/badge/Elysia-8B5CF6?style=for-the-badge&logo=elysia&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📋 About

This is a backend server application for the Business Panel project built with:

- **Bun** - Fast JavaScript runtime and package manager
- **Elysia** - Lightweight TypeScript web framework
- **MongoDB** - NoSQL database for data persistence
- **TypeScript** - Type-safe JavaScript development
- **Vercel** - Deployment and hosting platform

## 🚀 Getting Started

### Installation

Install dependencies using Bun:

```bash
bun install
```

### Environment Setup

Create a `.env` file in the root directory and add:

```env
MONGO_URI=your_mongodb_connection_string
```

### Development

To start the development server run:

```bash
bun run dev
```

The server will start at `http://localhost:3000/`

### Production

To build and run for production:

```bash
bun run start
```

## 📁 Project Structure

```
src/
├── index.ts              # Application entry point
├── config/
│   └── db.ts             # MongoDB connection configuration
├── controllers/
│   └── auth.controller.ts # Authentication business logic
├── models/
│   └── User.ts           # MongoDB User schema
├── routes/
│   └── auth.routes.ts    # API routes
└── types/
    ├── user.types.ts     # User-related TypeScript interfaces
    └── error.types.ts    # Error handling DTOs
```

## 🔐 API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - User login
- **PATCH** `/api/auth/update-password` - Update user password

## 📦 Features

- ✅ User registration with validation
- ✅ User login authentication
- ✅ Password update functionality
- ✅ CORS enabled for all domains
- ✅ Error handling and validation
- ✅ MongoDB integration
- ✅ TypeScript support

## 📝 License

MIT
