# Bistroteka 🍽️

A modern, responsive landing page for Bistroteka — a restaurant in Saint Petersburg. Built as a lightweight static site with online table reservation via the remarked.ru CRM widget.

---

## Features

- **Responsive Design:** Mobile‑first layout with a hamburger menu, smooth scrolling, and scroll‑triggered animations.
- **Interactive Menu:** Modal‑based menu browsing with category tabs (kitchen, cocktails, bar snacks).
- **Merchandise Showcase:** Flippable cards for branded merchandise (t‑shirts, longsleeves, caps).
- **Image Carousels:** Touch‑friendly carousels for interiors, food, cocktails, and team photos.
- **Online Booking:** Integration with the remarked.ru CRM widget — guests can reserve a table directly on the page.
- **Legal Pages:** Public offer agreement and cookie policy pages (no external dependencies).

---

## Technology Stack

### Frontend
- **Vite 5** — build tool and dev server
- **TypeScript 5** — type‑safe JavaScript
- **Tailwind CSS 3** — utility‑first CSS framework
- **PostCSS + Autoprefixer** — CSS processing

### Deployment
- **Render.com** — primary hosting with SPA redirect support via `public/_headers`
- **sweb.ru** — additional hosting (mirror)

### External Services
- **remarked.ru** — CRM widget for table reservations
- **Google Fonts** — "Poiret One" typeface

### Tools
- **npm** — package management
- **Git + GitHub** — version control

---

## Build and Run Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173` with hot‑module replacement.

### Production Build

```bash
npm run build
```

Static files are output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
bistroteka/
├── public/
│   ├── _headers              # SPA + CSP headers for Render.com
│   ├── public-offer.html     # Public offer agreement
│   └── cookie-policy.html    # Cookie policy
├── src/
│   ├── main.ts               # Application entry point
│   ├── style.css             # Global styles + Tailwind directives
│   └── ...
├── index.html                # Single‑page application shell
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind theme customization
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

---

## Deployment

### Render.com

The project is configured for static site deployment on Render.com:

1. Connect the GitHub repository to Render.
2. Set **Build Command** to `npm run build`.
3. Set **Publish Directory** to `dist`.
4. The `public/_headers` file handles SPA routing and Content‑Security‑Policy headers automatically.

### sweb.ru

Upload the contents of the `dist/` directory via FTP/sweb.ru control panel. Ensure the `_headers` file (from `public/`) is placed in the root if the hosting supports it.

---

## Customization

### Colors & Theme

Edit `tailwind.config.js` to adjust the brand palette (`bistro-red`, `bistro-bg`, `bistro-text`, etc.).

### Menu Items

Menu data and images are embedded directly in `index.html`. Update the HTML to add, remove, or modify categories and items.

### CRM Widget Token

The remarked.ru widget uses a hardcoded token (for deployments where `GetToken` fails). To refresh the token:

1. Open the site on a working domain (e.g. Render.com).
2. Open browser console (F12).
3. Click the booking button to trigger the widget.
4. Run `copy(window.__crmToken)` in the console.
5. Update the token in `index.html` inside the `widgetArea` override script.

---

## License

This project is licensed under the MIT License — see the [LICENSE.md](docs/LICENSE.md) file for details.

---

## Contact

For questions or feedback: [limosha@inbox.ru](mailto:limosha@inbox.ru)
