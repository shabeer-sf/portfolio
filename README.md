# Shabeer Portfolio - Full Stack & React Native Developer

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and shadcn/ui components showcasing my skills, projects, and professional experience.

![Shabeer Portfolio](https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg)

## Features

- 🌗 Sleek dark theme design with gradient accents
- 🖼️ Responsive layout for all device sizes
- ✨ Smooth animations and transitions using Framer Motion
- 🧩 Modular component architecture
- 📊 PostgreSQL database integration with Prisma ORM
- 📱 Mobile-first approach
- 🚀 Performance optimized with Next.js App Router
- 📋 Contact form with server actions

## Technologies

- **Frontend:**
  - Next.js 14 (App Router)
  - React 18
  - Tailwind CSS
  - shadcn/ui Components
  - Framer Motion
  - Lucide Icons
  - Swiper

- **Backend:**
  - Next.js Server Actions
  - Prisma ORM
  - PostgreSQL
  - Zod Validation

## Sections

- Hero section with introduction and tech stack slider
- Services offered (Full Stack, React Native, etc.)
- Professional experience timeline
- Featured projects with filtering
- Contact form with validation
- Footer with navigation and social links

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm, yarn, or pnpm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shabeer-portfolio.git
   cd shabeer-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up your environment variables:
   ```
   # Create a .env file with the following variables
   DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-here" # Generate a secure random string
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the admin user:
   ```bash
   npm run seed-admin
   # or
   yarn seed-admin
   # or
   pnpm seed-admin
   ```
   This will create an admin user with email `admin@example.com` and password `Admin123!`

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the public portfolio.
   
8. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) using the admin credentials.

## Database Schema

The portfolio uses a PostgreSQL database with the following models:
- Contact: Stores messages from the contact form
- Project: Displays portfolio projects
- Experience: Shows work history and professional experience
- Service: Lists services offered
- SocialLink: Manages social media links
- Profile: Stores personal information
- User: Handles authentication for the admin area

## Admin Dashboard

The portfolio includes a complete admin dashboard that allows you to:

### Messages Management
- View all contact messages with status indicators
- Filter messages by status (Unread, Read, Replied, Archived)
- Update message status
- Delete messages

### Projects Management
- Create new projects
- Edit existing projects
- Toggle featured status
- Delete projects
- Manage project details (title, description, image, links, technologies)
- Set project ordering

### Experience Management
- Add new work experiences
- Edit existing experiences
- Set current position status
- Manage experience details (company, location, dates, description, roles, skills)
- Delete experiences

### Security
- Protected routes using NextAuth.js
- Admin-only access
- Role-based authentication
- Secure password storage with bcrypt

### UI/UX
- Matching design system with the frontend
- Dark theme interface
- Responsive layouts
- Interactive components
- Real-time notifications using Sonner toasts

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## License

MIT

## Contact

For inquiries, please reach out via the contact form on the website or email directly at mohammedshabeer2520@gmail.com.