# Next.js + Laravel CRUD

A full-stack CRUD application using **Next.js** as the frontend and
**Laravel** as the REST API backend.

This project demonstrates how to build a modern SPA with pagination,
validation, and a clean UI using Tailwind CSS.

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   Next.js
-   React
-   Tailwind CSS
-   React Hook Form
-   Zod
-   Axios

### Backend

-   Laravel
-   REST API
-   Eloquent ORM
-   Form Request Validation
-   Pagination

------------------------------------------------------------------------

## Project Structure

    nextjs-laravel-crud
    ├── backend     # Laravel API
    └── frontend    # Next.js application

------------------------------------------------------------------------

## Features

-   Create posts
-   Edit posts
-   Delete posts
-   Pagination
-   Form validation
-   API integration
-   Delete confirmation modal
-   Loading states
-   Responsive UI using Tailwind CSS

------------------------------------------------------------------------

# Backend Setup (Laravel)

### 1. Navigate to backend folder

    cd backend

### 2. Install dependencies

    composer install

### 3. Copy environment file

    cp .env.example .env

### 4. Generate application key

    php artisan key:generate

### 5. Configure database

Edit `.env`

    DB_DATABASE=your_database
    DB_USERNAME=root
    DB_PASSWORD=

### 6. Run migrations

    php artisan migrate

### 7. Start Laravel server

    php artisan serve

Laravel API will run at:

    http://localhost:8000

Example endpoint:

    http://localhost:8000/api/posts

------------------------------------------------------------------------

# Frontend Setup (Next.js)

### 1. Navigate to frontend folder

    cd frontend

### 2. Install dependencies

    npm install

### 3. Start development server

    npm run dev

Frontend will run at:

    http://localhost:3000

------------------------------------------------------------------------

# API Example

### Get posts

    GET /api/posts

Example response:

``` json
{
  "data": [
    {
      "id": 1,
      "title": "Hello",
      "content": "My first post"
    }
  ],
  "current_page": 1,
  "last_page": 3
}
```

------------------------------------------------------------------------

# CRUD Endpoints

  Method   Endpoint          Description
  -------- ----------------- -----------------
  GET      /api/posts        List posts
  POST     /api/posts        Create post
  GET      /api/posts/{id}   Get single post
  PUT      /api/posts/{id}   Update post
  DELETE   /api/posts/{id}   Delete post

------------------------------------------------------------------------

# UI Features

-   Tailwind styled tables
-   Pagination controls
-   Delete confirmation modal
-   Loading spinner
-   Form validation

------------------------------------------------------------------------

# Development Notes

Backend pagination:

    Post::latest()->paginate(5)

Frontend uses:

-   Axios for API calls
-   React Hook Form for form handling
-   Zod for validation

------------------------------------------------------------------------

# Future Improvements

-   Authentication (Laravel Sanctum)
-   Search functionality
-   Sorting
-   Toast notifications
-   Docker setup

------------------------------------------------------------------------

# Author

**Muiz Shukri**

GitHub\
https://github.com/MuizShukri
