# TLC.Detailing Website

Mobile car detailing website for TLC.Detailing, a Bakersfield, CA-based mobile detailing service.

## Pre-Compact Context Preservation

**MANDATORY RULE:** Before ANY auto-compact occurs, Claude MUST run `/wrap` to save session context.

---

## Workspace Resources

**Parent Workspace:** `/Users/rahullalia/Developer/`

**See parent CLAUDE.md for:**
- MCP Integrations (Notion, Google Calendar, Google Drive)
- Google OAuth credentials: `3-Resources/client_secret_*.json`
- Workspace naming conventions (camelCase requirement)
- PARA organization method
- Other projects and shared resources

**Quick Access:**
- Notion MCP: SSE transport at `https://mcp.notion.com/sse`
- Task database: "Lalia's Ultimate Tasks" in Notion
- Google Calendar tokens: `~/.config/google-calendar-mcp/tokens.json`
- Google Drive tokens: `~/.config/google-drive-mcp/tokens.json`
- Timezone: PST (Pacific Standard Time)
- Setup docs: `3-Resources/claude-notion-calendar-setup.md`

**When you need to:**
- Access Notion databases → Use MCP Notion tools (already configured)
- Create calendar events → Use MCP Google Calendar tools
- Work with Google Docs/Sheets → Use MCP Google Drive tools
- Reference other projects → Check `/Users/rahullalia/Developer/1-Projects/`
- Find credentials → Check `/Users/rahullalia/Developer/3-Resources/`

---

## Project Overview

**Client:** TLC.Detailing (Trevor)
**Location:** Bakersfield, CA 93314
**Type:** Mobile car detailing service
**Website:** https://tlcdetailing.vercel.app

**Services Offered:**
- Ceramic Coating
- Paint Correction
- Polishing & Waxing
- Headlight Restoration

**Business Info:**
- Phone: (832) 466-1100
- Hours: 7 AM - 7 PM, every day
- Instagram: @tlc.detailing_661
- Rating: 5.0 stars (315+ reviews)
- Founded: 2020

---

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Domain:** tlcdetailing.vercel.app

---

## Project Structure

```
tlcdetailing/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout, metadata, SEO, schema.org
│       ├── page.tsx        # Main page with all sections
│       ├── globals.css     # Global styles, animations (Ken Burns, vignette)
│       └── favicon.ico
├── public/
│   └── gallery/            # 9 detail photos (GPS tagged for 93311)
│       ├── car.jpeg        # Main hero image
│       ├── RR.jpg          # Rolls Royce
│       ├── RR_wheel.jpg    # Wheel detail
│       ├── bmw.jpg         # BMW
│       ├── bmw-suv.jpg     # BMW SUV
│       ├── bmw-convertible.jpg
│       ├── vintage.jpg     # Vintage car
│       ├── vintage-2.jpg   # Classic car
│       └── Bike.jpg        # Motorcycle
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Deploy to Vercel
npx vercel --prod --yes

# Set up custom subdomain
npx vercel alias [deployment-url] tlcdetailing.vercel.app
```

---

## Key Components (page.tsx)

| Component | Purpose |
|-----------|---------|
| `Navigation` | Sticky nav with mobile menu |
| `Hero` | Cinematic slideshow with Ken Burns effect |
| `Stats` | Animated counter cards (5.0★, 315+, 5+ years) |
| `Services` | Bento grid of 4 services |
| `Gallery` | Masonry grid for work photos |
| `Testimonials` | Horizontal scroll on mobile |
| `About` | Trevor intro + highlights |
| `Contact` | CTA + info cards + map |
| `MobileCTA` | Sticky bottom bar on mobile |
| `Footer` | Social links + copyright |

---

## Design System

**Colors:**
- Primary: Amber/Gold (`#d4af37`, `amber-400`)
- Background: Black (`#000000`)
- Text: White with opacity variants
- Glass: `rgba(255,255,255,0.05)` with backdrop-blur

**Effects:**
- Glassmorphism (`.glass`, `.glass-strong`)
- Gradient text (`.gradient-text`)
- Glow effects (`.glow`, `.glow-text`)
- Shine animation (`.shine`)
- Ken Burns effect (`.kenburns`) - cinematic slow zoom
- Vignette overlay (`.vignette`)
- Noise texture overlay

**Typography:**
- Font: System fonts (Geist via Next.js)
- Headlines: `font-black`, `tracking-tight`
- Body: `text-white/60` to `text-white/80`

---

## SEO & Schema

**Implemented in layout.tsx:**
- Full metadata (title, description, keywords)
- Open Graph tags
- Twitter Card tags
- Schema.org LocalBusiness structured data
- Canonical URL

---

## Deployment

**Current Production URL:** https://tlcdetailing.vercel.app

**To redeploy after changes:**
```bash
npx vercel --prod --yes
```

**Vercel Project:** rahul-lalia/tlcdetailing

---

## Pending Tasks

- [x] Add real images from client (gallery, hero background) - DONE
- [ ] Get owner (Trevor) photo for About section
- [ ] Add more testimonials if available
- [ ] Consider adding pricing section if client provides
- [ ] Set up Google Analytics or similar tracking
- [ ] Connect custom domain if client purchases one

---

## MCP Use Cases for This Project

**Notion:**
- Track client deliverables in "Lalia's Ultimate Tasks"
- Log client feedback and revision requests

**Google Calendar:**
- Schedule client review calls
- Set deployment milestones

**Google Drive:**
- Store client assets (logos, photos)
- Share deliverables with client

---

## Client Communication

**Owner:** Trevor
**Contact:** (832) 466-1100
**Status:** Website live with images and slideshow

---

## Session History

### 2025-01-07 - Initial Build & Deployment
- Created Next.js 16 project with Tailwind CSS v4
- Built modern one-page design with glassmorphism effects
- Fixed React hooks violation (useCounter called inside .map())
- Corrected business info (was wrong Virginia business, updated to Bakersfield)
- Added 3 real testimonials from Google reviews (Kristian, Eric, Elissa)
- Deployed to Vercel production
- Set up clean subdomain: tlcdetailing.vercel.app
- Created project documentation (CLAUDE.md, README.md)
- Cleaned up public/ folder (removed unused default SVGs)

### 2025-01-07 - Gallery Images & Hero Slideshow
- Added 9 real detail photos from client to public/gallery/
- GPS tagged all images with Bakersfield 93311 coordinates
- Updated Gallery section with masonry grid of real images
- Created cinematic Ken Burns hero slideshow:
  - Auto-rotating every 5 seconds through all 9 photos
  - Ken Burns effect (slow zoom) on each image
  - Smooth 1.5s crossfade transitions
  - Clickable progress dots
  - Vignette overlay for depth
- Created GitHub repo: github.com/rahullalia/tlcdetailing
- Connected Vercel to GitHub for auto-deploy on push
- Removed empty public/images/ folder

**Last Updated:** 2025-01-07
