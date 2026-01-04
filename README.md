# Task Manager App 📱

A modern, feature-rich task management mobile application built with React Native and Expo. Manage your tasks efficiently with categories, priorities, due dates, and collaborative features.

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [Design Inspiration](#design-inspiration)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Backend](#backend)
- [Features in Detail](#features-in-detail)
- [Contributing](#contributing)
- [Author](#author)

---

## Overview

Task Manager App is a comprehensive mobile application that helps you organize, track, and manage your tasks efficiently. Built with React Native and Expo, it offers a smooth, native-like experience on both iOS and Android platforms.

### Features

- ✅ **Task Management**: Create, update, and delete tasks with ease
- 📁 **Categories**: Organize tasks by categories with visual statistics
- 🎯 **Priorities**: Set task priorities (low, medium, high)
- 📅 **Due Dates**: Track task deadlines with date picker
- 👥 **Task Assignment**: Assign tasks to team members via email
- 📋 **Task Status**: Multiple status options (upcoming, in-progress, in-review, completed)
- 🔢 **Task Counts**: See task counts in tabs (e.g., "Active (5)")
- 👤 **Assigned to Others**: Dedicated tab for tasks you created but assigned to others
- 💬 **Comments**: Add comments to tasks with timestamps and user names
- 🌓 **Dark Mode**: Automatic dark/light mode support
- 🔐 **Authentication**: Secure sign-in and sign-up with JWT
- 📊 **Statistics**: View category-wise task completion statistics
- 🔄 **Real-time Updates**: Optimistic UI updates for instant feedback
- 🔔 **Toast Notifications**: Non-blocking toast notifications that don't interfere with interactions
- 📱 **Auto-scroll**: Inputs and dropdowns auto-scroll into view when focused in modals

### Links

- **Backend Repository**: [GitHub](https://github.com/KareemEhab/task-manager-app-backend)
- **Backend Live Server**: [Netlify](https://iridescent-otter-de871f.netlify.app/)

---

## Design Inspiration

The UI/UX design of this application was inspired by the following Figma community designs:

1. **[Task Management - A Mobile App UI Kit](https://www.figma.com/community/file/1511353615262415613/task-management-a-mobile-app-ui-kit)**

2. **[Task Management App Design](https://www.figma.com/community/file/1025672621370192050)**

These designs served as the foundation for creating a polished, professional task management experience.

---

## My Process

### Built With

#### Frontend Technologies

- **[Expo](https://expo.dev/)** (~54.0.30) – React Native framework for cross-platform development
- **[React Native](https://reactnative.dev/)** (0.81.5) – Mobile app framework
- **[React](https://reactjs.org/)** (19.1.0) – JavaScript library for building UIs
- **[TypeScript](https://www.typescriptlang.org/)** (~5.9.2) – Typed JavaScript for better development experience
- **[Expo Router](https://docs.expo.dev/router/introduction/)** (~6.0.21) – File-based routing for navigation
- **[Axios](https://axios-http.com/)** (^1.13.2) – HTTP client for API requests

#### Key Libraries & Tools

- **[@gorhom/bottom-sheet](https://github.com/gorhom/bottom-sheet)** – Smooth bottom sheet modals
- **[expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)** – Secure token storage
- **[expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** – Beautiful gradient backgrounds
- **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)** – Smooth animations
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)** – Native gesture handling
- **[@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)** – Date and time selection

#### Backend Technologies

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication tokens
- **Joi** – Input validation

### Project Structure

```
task-manager-app/
├── app/                      # Expo Router file-based routing
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home screen
│   │   ├── categories.tsx   # Categories screen
│   │   ├── calendar.tsx     # Calendar screen
│   │   ├── task-details/   # Task detail screens
│   │   └── category/        # Category-specific tasks
│   ├── sign-in.tsx          # Sign in screen
│   ├── sign-up.tsx          # Sign up screen
│   ├── onboarding.tsx       # Onboarding screen
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── common/              # Common UI components
│   ├── modals/              # Modal components
│   └── ui/                  # UI-specific components
├── contexts/                # React Context providers
│   ├── tasks-context.tsx    # Global tasks state
│   └── theme-context.tsx   # Theme management
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts          # Authentication logic
│   ├── useTasks.ts         # Task operations
│   ├── useFetchTasks.ts    # Task fetching
│   └── useCategories.ts    # Category management
├── services/                # API services
│   └── api.ts              # Axios configuration
├── utils/                   # Utility functions
│   ├── task-transform.ts   # Data transformation
│   ├── task-validation.ts  # Form validation
│   └── validation.ts       # General validation
├── constants/               # App constants
│   └── theme.ts            # Theme colors
├── assets/                  # Images, fonts, etc.
│   └── images/             # App icons and images
├── app.json                # Expo configuration
└── package.json            # Dependencies
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **[npm](https://www.npmjs.com/)** or **[yarn](https://yarnpkg.com/)**
- **[Expo Go](https://expo.dev/client)** app installed on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KareemEhab/task-manager-app-assessment
   ```

2. **Navigate to the project directory**

   ```bash
   cd task-manager-app
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

   or if you're using yarn:

   ```bash
   yarn install
   ```

### Running the App

1. **Start the Expo development server**

   ```bash
   npm start
   ```

   or

   ```bash
   npx expo start
   ```

   This will start the Metro bundler and display a QR code in your terminal.

2. **Run on your mobile device**

   #### For Android:

   - Open the **Expo Go** app on your Android device
   - Tap **"Scan QR code"** from the home screen
   - Point your camera at the QR code displayed in the terminal
   - The app will load on your device

   #### For iOS:

   - Open the **Camera** app on your iPhone
   - Point it at the QR code displayed in the terminal
   - Tap the notification banner that appears
   - The app will open in Expo Go

   #### Alternative: Using Expo Dev Tools

   After running `npm start`, you can also:

   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator (macOS only)
   - Press `w` to open in web browser

3. **Development Tips**

   - **Hot Reload**: Changes you make to the code will automatically reload in the app
   - **Shake Device**: Shake your device to open the developer menu
   - **Reload**: Press `r` in the terminal to reload the app
   - **Clear Cache**: Press `c` in the terminal to clear the cache

---

## Backend

**Note**: The application comes with a **pre-configured live backend server** that is ready to use out of the box. You don't need to set up or configure anything unless you want to use your own backend server.

### Default Backend Configuration

- **Live Server**: The backend API URL is already configured in `app.json` and the app will connect to the live backend automatically
- **Backend Repository**: [task-manager-app-backend](https://github.com/KareemEhab/task-manager-app-backend)

### Using Your Own Backend (Optional)

If you want to use your own backend server instead of the default one:

1. Visit the [backend repository](https://github.com/KareemEhab/task-manager-app-backend)
2. Follow the setup instructions in its README
3. Configure your MongoDB connection
4. Set up environment variables
5. Deploy your backend or run it locally
6. Update the API URL in `app.json`:

   ```json
   {
     "expo": {
       "extra": {
         "apiUrl": "https://your-backend-url.com"
       }
     }
   }
   ```

### API Endpoints

The backend provides the following main endpoints:

- `POST /api/users` – User registration
- `POST /api/auth` – User authentication
- `GET /api/users/me` – Get current user
- `GET /api/tasks` – Get all tasks assigned to the current user
- `GET /api/tasks/created-by-me` – Get tasks created by the user but assigned to others
- `POST /api/tasks` – Create a task
- `PUT /api/tasks/:id` – Update a task
- `DELETE /api/tasks/:id` – Delete a task (soft delete)
- `GET /api/tasks/categories` – Get category statistics
- `POST /api/tasks/:id/comments` – Add a comment to a task
- `DELETE /api/tasks/:id/comments/:commentId` – Delete a comment (soft delete)

---

## Features in Detail

### Authentication

- Secure JWT-based authentication
- Sign up with name, email, and password
- Sign in with email and password
- Automatic token storage using Expo SecureStore
- Protected routes and API calls

### Task Management

- **Create Tasks**: Add tasks with title, description, priority, status, due date, categories, and assignment
- **Update Tasks**: Edit any task details
- **Delete Tasks**: Soft delete (tasks are marked as deleted, not permanently removed)
- **Task Status**: Multiple status options:
  - **Upcoming**: Tasks that haven't started yet
  - **In Progress**: Tasks currently being worked on
  - **In Review**: Tasks awaiting review
  - **Completed**: Finished tasks
- **Mark as Done**: Change task status to completed
- **Filter Tasks**: View active, completed, or assigned-to-others tasks
- **Task Counts**: See the number of tasks in each tab (e.g., "Active (5)", "Completed (3)")
- **Assigned to Others**: Dedicated tab showing tasks you created but assigned to other team members
- **Task Details**: View full task information with comments, assignment details, and metadata
- **Assigned To Display**: Shows "You" if assigned to current user, otherwise displays assigned user's email

### Categories

- **Dynamic Categories**: Categories are automatically generated from tasks assigned to you
- **Smart Filtering**: Categories only show tasks assigned to the current user (excludes tasks you created but assigned to others)
- **Statistics**: View task count and completion percentage per category
- **Category View**: Filter tasks by specific category with date sorting (newest first)
- **Visual Indicators**: Beautiful gradient cards for each category
- **Real-time Updates**: Category statistics update automatically when tasks are completed or status changes

### Comments

- **Add Comments**: Add comments to tasks with your name and timestamp
- **View Comments**: See all comments with author names and timestamps
- **Delete Comments**: Remove comments (soft delete - comments are marked as deleted, not permanently removed)
- **Comment Management**: Comments are tied to tasks and support full CRUD operations

### User Experience

- **Optimistic Updates**: Instant UI updates without waiting for server response
- **Global State**: Tasks managed globally using React Context API for efficient state management
- **Non-blocking Toasts**: Toast notifications don't block user interactions - you can continue using the app while toasts are visible
- **Auto-scroll**: Inputs, dropdowns, and date pickers automatically scroll into view when focused in modals
- **Navigation Protection**: Prevents accidental swipe-back navigation to onboarding when logged in
- **Dark Mode**: Automatic theme switching based on system preferences
- **Smooth Animations**: Polished transitions and interactions with React Native Reanimated
- **Error Handling**: User-friendly error messages and toast notifications
- **Loading States**: Clear loading indicators during API operations
- **Empty States**: Helpful messages when no tasks or categories exist

---

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## Author

**Kareem Ehab**

- GitHub: [@KareemEhab](https://github.com/KareemEhab)
- Backend Repository: [task-manager-app-backend](https://github.com/KareemEhab/task-manager-app-backend)

---

## License

This project is private and not licensed for public use.

---

## Acknowledgments

- Design inspiration from the Figma community designs mentioned above
- Expo team for the amazing development platform
- React Native community for excellent libraries and support
