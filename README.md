# Flashcard Application

A web-based flashcard application that allows users to create, manage, and study flashcards on various topics. Built with Next.js, Firebase, and Material-UI, this application provides a user-friendly interface for learning and memorization.

## Features

- User authentication with Clerk
- Create and manage flashcard collections
- View and study flashcards
- Responsive design for mobile and desktop
- Easy navigation with a bottom navigation bar

## Technologies Used

- **Frontend**: Next.js, React, Material-UI
- **Backend**: Firebase Firestore
- **Authentication**: Clerk
- **Icons**: Material-UI Icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase project with Firestore enabled
- Clerk account for user authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/flashcard-app.git
   cd flashcard-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add your Firebase and Clerk credentials:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Sign in or create an account using Clerk.
- Create new flashcard collections and add flashcards.
- Click on a flashcard collection to view and study the flashcards.
- Use the delete option to remove collections as needed.

## Deployment

This application is deployed on Vercel. To deploy your own version:

1. Push your code to a GitHub repository.
2. Sign up for a Vercel account and connect your GitHub repository.
3. Configure environment variables in the Vercel dashboard.
4. Deploy your application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Clerk](https://clerk.dev/)
- [Material-UI](https://mui.com/)