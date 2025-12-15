# DocShare - Document Sharing Frontend

A modern React + Vite application for sharing and collaborating on documents with a clean, modular architecture.

## Features

- ✅ **Authentication**: Login and Signup pages with mock authentication
- ✅ **Dashboard**: Main application interface with two sections
- ✅ **My Documents**: View and manage documents you created
- ✅ **Shared Documents**: View documents shared with you by other users
- ✅ **Create Documents**: Create new documents with title and description
- ✅ **Share Documents**: Share your documents with other users via email
- ✅ **Permission Control**: Set different permission levels (View Only / Can Edit)
- ✅ **User Profile**: Profile icon in navbar with logout functionality
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar with user profile
│   │   ├── Navbar.css
│   │   ├── Login.jsx        # Login page component
│   │   ├── Signup.jsx       # Signup page component
│   │   ├── Auth.css         # Authentication styles
│   │   ├── NoteCard.jsx     # Document card component
│   │   ├── NoteCard.css
│   │   ├── CreateNoteModal.jsx  # Modal for creating documents
│   │   ├── CreateNoteModal.css
│   │   ├── ShareNoteModal.jsx   # Modal for sharing documents
│   │   └── ShareNoteModal.css
│   ├── context/             # React Context for state management
│   │   ├── AuthContext.jsx  # Authentication state and methods
│   │   └── NotesContext.jsx # Notes/documents state management
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard page
│   │   └── Dashboard.css
│   ├── data/
│   │   └── mockData.js      # Mock data for development
│   ├── utils/
│   │   └── ProtectedRoute.jsx  # Route protection for authenticated users
│   ├── services/            # API services (for future backend integration)
│   ├── App.jsx              # Main App component with routing
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Login Credentials

For demo purposes, use these credentials:

- **Email**: john@example.com
- **Password**: password

Or create a new account on the signup page.

## Mock Data

The application uses mock data for development. You'll find predefined:

- User profile information
- Sample documents (user's own and shared)
- Available users for sharing
- Document permissions (View/Edit)

All data is stored in `src/data/mockData.js` and can be easily replaced with real backend API calls.

## Authentication Context

The `AuthContext` provides:

- `user` - Current logged-in user object
- `isAuthenticated` - Boolean flag for authentication state
- `login()` - Login function
- `signup()` - Signup function
- `logout()` - Logout function

## Notes/Documents Context

The `NotesContext` provides:

- `userNotes` - Documents created by the user
- `sharedNotes` - Documents shared with the user
- `createNote()` - Create a new document
- `updateNote()` - Update document
- `deleteNote()` - Delete document
- `shareNoteWithUser()` - Share document with another user
- `removeNoteShare()` - Revoke access from a user

## Styling

The project uses:

- **Bootstrap 5** - For responsive layout and components
- **Custom CSS** - For additional styling and animations
- **Color Scheme**: 
  - Primary: #667eea (Purple-Blue)
  - Secondary: #764ba2 (Purple)
  - Neutral: #f8f9fa (Light Gray)

## Component Communication

The app uses React Context for state management:

1. **AuthProvider** wraps the entire app to provide authentication
2. **NotesProvider** manages all document-related state
3. **ProtectedRoute** component ensures only authenticated users can access the dashboard

## Future Enhancements

When connecting to the backend:

1. Replace `mockData.js` imports with real API calls
2. Update context methods to use API endpoints
3. Add error handling and loading states
4. Implement real JWT token management
5. Add backend validation

## Integration with Backend

To connect with your backend API:

1. Create services in `src/services/` folder
2. Replace mock data calls with actual API endpoints
3. Update context methods to call the API services
4. Implement proper error handling and loading states

Example service structure:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
  login: (email, password) => {
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }).then(res => res.json());
  },
  // ... other auth methods
};

export const notesService = {
  getUserNotes: () => {
    return fetch(`${API_BASE_URL}/notes`).then(res => res.json());
  },
  // ... other note methods
};
```

## License

MIT


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
