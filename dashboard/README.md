# Tourism Dashboard

## Overview

Tourism Dashboard is a comprehensive web application designed to manage and visualize tourism data for the Wilaya (province) administration. It provides an intuitive interface for monitoring various aspects of tourism activities, including accommodations, tourist spots, and transportation options.

## Features

- **Dashboard Overview**: Get a quick glance at key metrics and statistics.
- **Client Management**: Keep track of individual tourists, clubs, and tourism agencies.
- **Accommodation Tracking**: Manage information about hotels, tourist complexes, and hostels.
- **Tourist Spots**: Monitor and update information about various tourist attractions.
- **Transportation Management**: Track and manage different transportation options available for tourists.
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices.
- **Interactive Charts**: Visualize data with interactive charts and graphs.
- **User Authentication**: Secure login system with role-based access control.

## Tech Stack

- **Frontend**: React.js with Next.js (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **API Routes**: Next.js API routes for backend functionality

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tourism-dashboard.git
   ```

2. Navigate to the project directory:
   ```
   cd tourism-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
tourism-dashboard/
├── app/
│   ├── api/
|   | 
│   ├── dashboard/
│   │   ├── blacklist/
│   │   ├── employants/
│   │   ├── hebregement/
│   │   └── reservation/
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/
├── public/
├── lib/
|   ├──Jotai.ts
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Configuration

To configure the application for your specific needs:

1. Update the `next.config.js` file for any Next.js specific configurations.
2. Modify the `.env.` file (create if not present) for environment-specific variables.

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Jotai](https://jotai.org/)
- [Axios](https://axios-http.com/)



If you have any questions or need help with the dashboard, please open an issue in the GitHub repository.