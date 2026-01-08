# TLC.Detailing Website

Modern, mobile-optimized website for TLC.Detailing - Bakersfield's premier mobile car detailing service.

**Live Site:** <https://tlcdetailing.vercel.app>

**GitHub:** <https://github.com/rahullalia/tlcdetailing>

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vercel** - Deployment (auto-deploy from GitHub)

## Features

- **Cinematic Ken Burns hero slideshow** - Auto-rotating images with slow zoom effect
- Dark theme with glassmorphism design
- Animated counters and parallax effects
- Mobile-first responsive design
- Sticky mobile CTA bar
- Real Google review testimonials
- SEO optimized with Schema.org structured data
- One-page scrolling layout
- GPS-tagged images for local SEO

## Performance Optimizations

- **Throttled scroll handlers** - 100ms throttle prevents jank
- **Lazy image loading** - Blur placeholders for instant feedback
- **AVIF/WebP formats** - Automatic modern image compression
- **Content-visibility CSS** - Off-screen sections skip rendering
- **Mobile-specific optimizations** - Ken Burns disabled, noise texture hidden

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
public/
└── gallery/          # 9 GPS-tagged detail photos
    ├── car.jpeg
    ├── RR.jpg
    ├── bmw-convertible.jpg
    ├── vintage.jpg
    └── ...
```

## Sections

1. **Hero** - Cinematic Ken Burns slideshow with 9 images, progress dots
2. **Stats** - 5.0★ rating, 315+ reviews, 5+ years
3. **Services** - Ceramic coating, paint correction, polishing, headlight restoration
4. **Gallery** - Masonry grid showcasing real work
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

- **Production URL:** <https://tlcdetailing.vercel.app>
- **GitHub Repo:** <https://github.com/rahullalia/tlcdetailing>
- **Auto-deploy:** Pushes to `main` branch auto-deploy via Vercel

To manually redeploy:

```bash
npx vercel --prod --yes
```

## Gallery Images

All 9 images are GPS-tagged with Bakersfield, CA coordinates (35.3212°N, 119.0510°W) for local SEO:

- car.jpeg, RR.jpg, RR_wheel.jpg
- bmw.jpg, bmw-suv.jpg, bmw-convertible.jpg
- vintage.jpg, vintage-2.jpg, Bike.jpg

## License

Private - RSL Media Hub client project
