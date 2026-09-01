# ZentStay - Technical Architecture

# Project Structure

ZentStay

backend/

frontend/

docs/

---

# Backend Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation
- Cloudinary
- Multer

---

# Frontend Stack

- Next.js
- React
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- TanStack Query
- Zustand
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React
- Sonner
- next-themes

---

# Backend Architecture

Request

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

Database

---

# Folder Structure

backend/src

config/

controllers/

interfaces/

middleware/

repositories/

routes/

services/

utils/

validation/

types/

---

# Frontend Structure

frontend/src

app/

components/

features/

hooks/

lib/

services/

types/

constants/

styles/

---

# Coding Standards

- TypeScript Strict Mode
- No any unless unavoidable
- Reusable Components
- Feature Based Structure
- Single Responsibility Principle

---

# Naming Convention

Files

kebab-case

Variables

camelCase

Components

PascalCase

Interfaces

PascalCase

Constants

UPPER_CASE

---

# API Standard

Success Response

{
success,
message,
data
}

Error Response

{
success,
message,
errors
}

---

# Authentication

JWT Access Token

Refresh Token

Role Based Authorization

Roles

- Student
- Owner
- Admin

---

# Validation

Use Zod for

- Body
- Params
- Query

Never trust client input.

---

# Error Handling

Centralized Error Middleware

Custom AppError

Meaningful Messages

---

# Logging

Server Logs

API Errors

Database Errors

Deployment Logs

---

# Security

Helmet

CORS

Password Hashing

JWT

Input Validation

Rate Limiting (Future)

---

# Database

Prisma ORM

Migration Based Development

Never modify production database manually.

---

# Git Workflow

main

develop

feature/*

bugfix/*

hotfix/*

---

# Commit Format

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

# Testing Strategy

Unit Testing (Future)

Integration Testing

Postman Collection

Frontend Testing

End-to-End Testing

---

# Deployment

Backend

Render

Frontend

Vercel

Database

Neon PostgreSQL

Images

Cloudinary

---

# Scalability

Service Layer

Repository Pattern

Pagination

Filtering

Caching (Future)

Microservices (Future)

---

# Performance Goals

API Response

<300ms

Page Load

<2 seconds

Image Optimization

Lazy Loading

Code Splitting

Server Components where applicable.

---

# Development Rule

Plan

↓

Design

↓

Develop

↓

Review

↓

Test

↓

Deploy

Never skip any step.