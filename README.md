# Slate - A Modern Note-Taking Application

Slate is a clean, intuitive note-taking application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, organize, and manage notes with features like tagging, search, and pinning important content.

![Slate App Screenshot](/home-screenshot.png)

## Features

- **User Authentication**: Secure signup and login functionality with JWT
- **Note Management**: Create, edit, and delete notes
- **Organization**: Tag notes and pin important ones to the top
- **Search**: Find notes quickly with a real-time search feature
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend

- React 19
- React Router 7
- Tailwind CSS 4
- React Icons
- React Modal
- React Toastify
- Axios for API requests
- date-fns for date formatting

### Backend

- Node.js
- Express.js 5
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin resource sharing

## Project Structure

```
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/            # API integration
│   │   ├── components/     # Reusable UI components
│   │   │   └── cards/      # Card components
│   │   ├── context/        # React Context for state management
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── models/
│   │   ├── note.model.js   # Note schema
│   │   └── user.model.js   # User schema
│   ├── utils/
│   │   └── auth.js         # Authentication middleware
│   ├── index.js            # Server entry point
│   └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/slate-notes-app.git
   cd slate-notes-app
   ```

2. Install dependencies

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Environment setup

   - Create a `.env` file in the client directory:
     ```
     VITE_BASE_URL=http://localhost:8000
     ```
   - Create a `.env` file in the server directory:
     ```
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     ACCESS_TOKEN=your_jwt_secret_key
     ```

4. Running the application

   ```bash
   # Start backend server
   cd server
   npm run dev

   # In a new terminal, start frontend
   cd client
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Usage

### User Authentication

- Register a new account with your name, email, and password
- Log in with your credentials

### Managing Notes

- Create new notes using the "New Note" button
- Edit notes by clicking the edit icon
- Delete notes with the delete icon
- Pin important notes using the pin icon
- Add tags to organize your notes

### Searching

- Use the search bar to find notes by title, content, or tags

## API Endpoints

### Authentication

- `POST /create-account`: Register a new user

  - Request: `{ fullName, email, password }`
  - Response: `{ error, user, accessToken, message }`

- `POST /login`: Authenticate user and return token

  - Request: `{ email, password }`
  - Response: `{ error, email, accessToken, message }`

- `GET /get-user`: Get current user information (protected)
  - Response: `{ error, message, user }`

### Notes

- `POST /add-note`: Create a new note (protected)

  - Request: `{ title, content, tags }`
  - Response: `{ error, note, message }`

- `GET /get-all-notes`: Retrieve all notes for the authenticated user (protected)

  - Response: `{ error, notes, message }`

- `PUT /edit-note/:noteId`: Update an existing note (protected)

  - Request: `{ title, content, tags }`
  - Response: `{ error, note, message }`

- `DELETE /delete-note/:noteId`: Remove a note (protected)

  - Response: `{ error, message }`

- `PUT /update-note-pinned/:noteId`: Toggle pin status (protected)

  - Request: `{ isPinned }`
  - Response: `{ error, note, message }`

- `GET /search-notes`: Search for notes by query (protected)
  - Query: `?query=searchterm`
  - Response: `{ error, notes, message }`

## Database Models

### User Model

```javascript
{
  fullName: String,
  email: String,
  password: String,
  timestamps: true
}
```

### Note Model

```javascript
{
  title: String,
  content: String,
  tags: [String],
  isPinned: Boolean,
  userId: String,
  timestamps: true
}
```

## Security Considerations

The current implementation uses plain text password storage, which is not secure for production. For a production application, consider implementing:

- Password hashing with bcrypt
- Stronger JWT encryption
- HTTPS for all API requests
- Input validation and sanitization
- Rate limiting for API requests

## Responsive Design

Slate is designed to be fully responsive:

- Clean, distraction-free interface
- Mobile-friendly navigation and components
- Adaptive layout that works on screens of all sizes

## Future Enhancements

- Password hashing for improved security
- Note categories/folders
- Rich text formatting
- Collaborative note sharing
- File attachments
- Note reminders/alerts
- Dark mode
- Export/import functionality

## License

[MIT](LICENSE)

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [JWT](https://jwt.io/)
