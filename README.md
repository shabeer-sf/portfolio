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
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Database Schema

The portfolio uses a PostgreSQL database with the following models:
- Contact: Stores messages from the contact form
- Project: Displays portfolio projects
- Experience: Shows work history and professional experience
- Service: Lists services offered
- SocialLink: Manages social media links
- Profile: Stores personal information
- User: Handles authentication for the admin area

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

For inquiries, please reach out via the contact form on the website or email directly at shabeersggs@gmail.com.