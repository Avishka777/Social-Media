# Social Media Application

This project is a full-stack social media application developed using Angular for the frontend and Node.js (with Express) for the backend. It enables users to create, update, delete, like posts, and interact with comments in real-time.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
  - [Backend](#backend-setup)
  - [Frontend](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

---

## Features

### Backend:
- RESTful API to manage posts, likes, and comments.
- Authentication and authorization using JWT.
- Real-time updates with Socket.IO.
- Secure user data management.

### Frontend:
- Angular-based UI for seamless user interaction.
- Dynamic post and comment sections.
- Modals for updating posts.
- SweetAlert2 integration for alerts and confirmations.

---

## Technologies Used

### Backend:
- **Node.js**
- **Express.js**
- **Socket.IO**
- **MongoDB**
- **JWT for Authentication**

### Frontend:
- **Angular 19**
- **SweetAlert2**
- **FormsModule**
- **Socket.IO-Client**

---

## Installation and Setup

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   Create a `.env` file with the following variables:
   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. **Run the server**
   ```bash
   npm start
   ```
   The backend will be available at `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```
   The frontend will be available at `http://localhost:4200`.

---

## API Endpoints

### Authentication
- `POST /login` - User login.
- `POST /register` - User registration.

### Posts
- `GET /posts` - Fetch all posts.
- `POST /posts` - Create a new post.
- `PUT /posts/:id` - Update a post.
- `DELETE /posts/:id` - Delete a post.

### Likes
- `POST /like/:postId` - Like or unlike a post.

### Comments
- `POST /comment/:postId` - Add a comment to a post.
- `PUT /comment/:commentId` - Update a comment.
- `DELETE /comment/:commentId` - Delete a comment.

---

## Usage

1. **User Authentication**
   - Register or log in to gain access.
   - User data is authenticated with JWT.

2. **Post Management**
   - Create, edit, or delete posts.
   - Toggle likes on posts.

3. **Comment Interaction**
   - Add, update, or delete comments on posts.

4. **Real-time Updates**
   - Posts and comments are updated in real-time using Socket.IO.

---

## Future Enhancements

- Implement user profile pages.
- Add support for image uploads to posts.
- Improve responsiveness and design.
- Add pagination for posts and comments.
- Notifications for user interactions.

---

This project demonstrates the integration of Angular, Node.js, and MongoDB to build a full-stack, feature-rich social media platform.

