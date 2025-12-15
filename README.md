# SkillBridge Monorepo

This is a monorepo structure for the SkillBridge application, containing both frontend and backend applications.

## Project Structure

```
.
├── apps/
│   ├── frontend/          # React/Vite frontend application
│   └── backend/           # Express.js backend server
│       └── server/        # Main server code
│           ├── api/       # Vercel serverless functions
│           ├── routes/    # Express route handlers
│           ├── models/    # Database models
│           ├── middleware/# Custom middleware
│           └── services/  # External services
├── docs/                  # Documentation
├── data/                  # Sample data
└── archive/              # Archived files
```

## Getting Started

### Prerequisites
- Node.js 20.x
- MongoDB (for local development)
- npm or yarn

### Installation
```bash
# Install all dependencies
npm install

# Install dependencies for a specific app
npm install --workspace=apps/frontend
npm install --workspace=apps/backend
```

### Development
```bash
# Run both frontend and backend in development mode
npm run dev

# Run only frontend
npm run dev:frontend

# Run only backend
npm run dev:backend
```

### Building
```bash
# Build the frontend application
npm run build

# Build frontend from backend (for deployment)
npm run build-frontend --workspace=apps/backend
```

## Deployment

### Vercel
The application is configured for Vercel deployment with separate frontend and backend functions.

### Render
The application can also be deployed to Render using the provided render.yaml configuration.

## Environment Variables

Each application (frontend and backend) has its own `.env` file:
- `apps/frontend/.env` - Frontend environment variables
- `apps/backend/server/.env` - Backend environment variables

## Workspaces

This project uses npm workspaces to manage the monorepo structure:
- `apps/frontend` - Frontend application
- `apps/backend` - Backend application

## API Endpoints

All API endpoints are prefixed with `/api/`:
- `GET /api/health` - Health check endpoint
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- Other endpoints as defined in the routes directory

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request