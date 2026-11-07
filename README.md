# Arslan Portfolio

Next.js and Tailwind portfolio for Arslan Sabir. The visual system follows the Kianro reference: dark canvas, lime actions, sticky project frames, and scroll-led type.

## Change the content

All names, projects, prices, services, and FAQs live in `data/site.js`. Edit that file when the words or numbers change.

## Change a section

| Area | File |
| --- | --- |
| Navigation | `components/layout/Navbar.jsx` |
| Footer | `components/layout/Footer.jsx` |
| Home hero | `components/home/Hero.jsx` |
| Intro and stats | `components/home/Intro.jsx` |
| Services accordion | `components/home/Services.jsx` and `components/ui/ServiceAccordion.jsx` |
| Featured projects | `components/home/FeaturedProjects.jsx` |
| Process | `components/home/Process.jsx` |
| Pricing | `components/home/Pricing.jsx` and `components/ui/PricingCards.jsx` |
| Notes marquee | `components/home/Testimonials.jsx` |
| FAQ | `components/home/Faq.jsx` |
| Contact band | `components/home/ContactBand.jsx` |
| Services page cards | `components/services/ServiceCards.jsx` |
| Inner pages | `components/views/` |

Routes are thin files in `app/`. They only load a view.

## Run

```bash
npm install
npm run dev
```

Work images are in `public/work`. The portrait is `public/arslan.jpg`. The resume download is `public/Arslan-Sabir.pdf`.
