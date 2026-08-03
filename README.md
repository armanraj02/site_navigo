# 🚍 Navigo - Modern Transit Tracking

Navigo is a sleek, modern public transit tracking interface built with **Next.js**, **Tailwind CSS**, and the **Google Maps API**. Designed with a premium glassmorphic aesthetic, Navigo provides a seamless experience for simulating and tracking live bus routes.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)

---

## ✨ Key Features

- **🗺️ Interactive Map Experience:** Built on top of the Google Maps API for smooth panning, zooming, and location tracking.
- **✨ Premium UI/UX:** Stunning glassmorphic design system using Tailwind CSS with beautiful backdrop blurs, clean typography, and fluid micro-interactions powered by Framer Motion.
- **📱 Fully Responsive:** Carefully optimized layout that works flawlessly across desktop, tablet, and mobile devices (including Safari iOS safe-area adjustments).
- **🚌 Live Tracking Simulation:** View simulated active routes, bus identifiers, and live updates.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Mapping:** Google Maps JavaScript API (`@react-google-maps/api`)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/armanraj02/site_navigo.git
cd site_navigo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
You need a Google Maps API key with the **Maps JavaScript API** enabled to render the maps.

Create a `.env.local` file in the root of your project:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Deployment (GitHub Pages)

This project is configured to be exported as a static site and deployed to GitHub pages.

1. Ensure your `.env.production` file contains your public Google Maps API Key.
2. Ensure `next.config.ts` is configured with the correct `basePath` (e.g., `/site_navigo`).
3. Commit and push to the `main` branch. GitHub Actions will automatically handle the static export and deployment to GitHub Pages.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/armanraj02/site_navigo/issues) if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
