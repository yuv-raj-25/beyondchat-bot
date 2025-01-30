# BeyondChats - Chatbot Setup UI

**Live Site:** [BeyondChats Deployment](https://beyondchat-bot-z5xj.vercel.app)

## Overview
BeyondChats is a chatbot company, and this project is a UI/UX implementation for setting up a new chatbot for businesses. The application allows users to register, set up their organization, train a chatbot, and integrate it into their website.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Express.js
- **Hosting:** Vercel (Frontend & Backend)

## Features
### 1. User Registration
- Users can sign up with Name, Email, and Password.
- "Continue with Google" option for easy sign-up.
- Email verification to ensure authenticity.

### 2. Setup Organization
- Users enter Company Name, Website URL, and Description.
- **Auto-fetch meta description from the website URL** (works in localhost but has CORS issues in production, see details below).

### 3. Chatbot Training
- UI displays detected web pages.
- Users can track which pages are **scraped**, **pending**, or **completed**.
- Clicking on a webpage shows the extracted data chunks.

### 4. Chatbot Integration & Testing
- **"Test Chatbot" Button**: Opens the client’s website with a dummy chatbot integration in the bottom-right corner.
- **Topbar Feedback Option**: Users can report issues.
- **Integration Options**:
  - Copy-paste a simple `<script>` tag into the `<head>` section of their website.
  - Email integration instructions to a developer.
- **Integration Testing**:
  - Confetti/SUCCESS UI when chatbot integration is successful.
  - "Explore Admin Panel" and "Start Talking to Your Chatbot" buttons.
  - Social media sharing buttons.

## Auto-Fetching Meta Description Issue
The application attempts to auto-fetch the meta description from a given website URL. This works in **localhost**, but in **production**, CORS restrictions prevent direct access to metadata. Here’s why:

1. **Direct fetch from frontend** using `fetch` or `axios` fails due to browser security policies. Browsers block metadata access for cross-origin requests.
2. **Possible Solutions:**
   - Use a **CORS proxy** like `https://api.allorigins.win/get?url=` (limited reliability, might not work for all sites).
   - A backend API (Express) can fetch the metadata, but it also needs to handle CORS properly.
   - If running in production, the backend needs to set `Access-Control-Allow-Origin: *` for successful metadata retrieval.

## Setup & Installation
### Prerequisites
- Node.js & npm/yarn installed

### Clone the Repository
```bash
git clone https://github.com/your-repo/beyondchats-setup.git
cd beyondchats-setup
```

### Install Dependencies
```bash
npm install  # or yarn install
```

### Environment Variables
Create a `.env` file in the root directory with the following:
```
REACT_APP_API_URL=https://beyondchat-server.vercel.app
```

### Run Locally
```bash
npm run dev
```

### Deploying to Vercel
1. Push your code to GitHub/GitLab.
2. Connect the repository to Vercel.
3. Set up environment variables in Vercel.
4. Deploy!

## Conclusion
This project successfully implements a chatbot setup UI. While the auto-fetch meta description feature works locally, CORS restrictions limit its functionality in production. Possible fixes include using a backend API or a CORS proxy.

🚀 Happy Coding!

