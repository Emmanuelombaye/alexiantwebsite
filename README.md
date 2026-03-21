# Alexiant Real Estate & Properties

![Alexiant Real Estate Banner](https://alexiantrealestate.co.ke/og-image.svg)

> **The Gold Standard for Premium Property in South Coast Kenya.**

Alexiant Real Estate is an elite coastal property advisory specializing in plots for sale in Diani Beach, Ukunda land, beachfront villas, and prestigious commercial spaces across Kwale County. We bridge the gap between traditional local brokerage and the efficiency of modern global standards.

## ✨ Features

- **Elite Property Showcase:** A hand-picked selection of the most desirable homes, land, and commercial assets.
- **Strategic Advisory:** Comprehensive support for investors, including market trends, due diligence, and closing management.
- **Coastal Intelligence:** In-depth knowledge of Diani, Galu, Tiwi, and Msambweni market dynamics.
- **Integrated Admin Portal:** Bespoke CMS for managing properties, blog posts, and CRM leads.
- **Advanced Security:** Multi-layered protection including HMAC-signed sessions, bot detection, and rate limiting.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

The project is organized in a monorepo-style structure:

```text
alexiant/
├── web/                # Main Next.js application
│   ├── src/            # Source code
│   │   ├── app/        # Next.js App Router pages
│   │   ├── components/ # Reusable UI components
│   │   ├── lib/        # Core logic & utilities
│   │   └── data/       # Static site content
│   ├── public/         # Static assets
│   └── package.json    # Application dependencies
├── vercel.json         # Vercel deployment configuration
└── package.json        # Root proxy for Vercel detection
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm (or yarn/pnpm)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/alexiant.git
   cd alexiant
   ```

2. **Install dependencies:**
   ```bash
   cd web
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the `web/` directory with the following:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ADMIN_PORTAL_PASSWORD=your_secure_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**.

Because the application resides in the `web/` subdirectory, the repository includes root-level `vercel.json` and `package.json` files that automatically configure the build process.

1. Connect your repository to Vercel.
2. Vercel will automatically detect the configuration and deploy the `web/` folder.
3. For best results, ensure the **Root Directory** in Vercel settings is set to `web`, or let the provided root-level files handle it.

## 🔒 Security Measures

Alexiant Real Estate implements a robust security strategy:
- **Bot Detection:** Automated blocking of malicious scrapers and bad bots.
- **Rate Limiting:** Protects API endpoints and login routes from brute-force attacks.
- **Signed Sessions:** Uses HMAC signatures for secure administrator authentication.
- **Secure Headers:** Strict HSTS, CSP, and X-Robots policies.

## 📞 Contact

- **Website:** [alexiantrealestate.co.ke](https://alexiantrealestate.co.ke)
- **Email:** info@alexiantrealestate.co.ke
- **Phone:** +254 759 636 615
- **Office:** New Beach Road, Diani, Kwale County, Kenya

---
*© 2026 Alexiant Real Estate And Properties. Built for the discerning buyer.*
