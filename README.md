# TLC.Detailing Website

Modern, mobile-optimized website for TLC.Detailing - Bakersfield's premier mobile car detailing service.

**Live Site:** https://tlcdetailing.vercel.app

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vercel** - Deployment

## Features

- Dark theme with glassmorphism design
- Animated counters and parallax effects
- Mobile-first responsive design
- Sticky mobile CTA bar
- Real Google review testimonials
- SEO optimized with Schema.org structured data
- One-page scrolling layout

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod --yes
```

## Project Structure

```
src/
└── app/
    ├── layout.tsx    # Metadata, SEO, schema.org
    ├── page.tsx      # All page sections
    ├── globals.css   # Global styles, animations
    └── favicon.ico
```

## Sections

1. **Hero** - Full-screen with parallax, CTAs
2. **Stats** - 5.0★ rating, 315+ reviews, 5+ years
3. **Services** - Ceramic coating, paint correction, polishing, headlight restoration
4. **Gallery** - Work showcase (images pending)
5. **Testimonials** - Real Google reviews
6. **About** - Meet Trevor, owner
7. **Contact** - Hours, service area, phone

## Business Info

- **Business:** TLC.Detailing
- **Owner:** Trevor
- **Location:** Bakersfield, CA
- **Phone:** (832) 466-1100
- **Hours:** 7 AM - 7 PM, every day
- **Instagram:** @tlc.detailing_661

## Deployment

Production URL: https://tlcdetailing.vercel.app

To redeploy:
```bash
npx vercel --prod --yes
```

## License

Private - RSL Media Hub client project
