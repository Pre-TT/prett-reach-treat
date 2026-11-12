# PreTT Insights

### BRAND  

- **Company name:** PreTT ApS
- **Tagline:** *See it. Reach it. Treat it.*
- **Colors (use exclusively):**
    - Deep blue: `#023047`
    - Off-white / cream: `#FCF8F0`
    - Warm yellow: `#FFB703`
- **Logo:** I will upload the logo file. Use it as the navbar logo and as the favicon. Also embed it as a large, faded watermark in the hero section background (inspired by MaveriX Oncology's homepage).
- **Font:** Choose a clean, modern sans-serif that fits a premium biotech aesthetic.

---

### CONTENT

All website copy, descriptions, and visuals must be based **exclusively** on the files I upload (company knowledge base and infographics). Do not invent, assume, or use placeholder scientific content. Use `[PLACEHOLDER]` where information is missing from the uploaded materials.

---

### PAGES & STRUCTURE

#### 1. Home

- Full-screen hero with tagline *"See it. Reach it. Treat it."*, a CTA button, and the company logo embedded as a large faded watermark in the background
- Brief intro section
- Teaser sections linking to Technology, Pipeline, and Team pages
- Subtle scroll-triggered animations on section titles (inspired by BioAge Labs)

#### 2. About Us

- Company story, mission, and vision — from uploaded content only

#### 3. Technology

- Present the technology in a visually engaging, card/module-based layout inspired by the technology presentation on **actithera.com/platform-pipeline** (the section above the pipeline)
- Use infographics I upload where relevant

#### 4. Pipeline

- Display the pipeline in the structured table/grid style of **bioagelabs.com/overview**
- Each pipeline stage bar should animate and fill on scroll, inspired by **actithera.com/platform-pipeline**
- Pipeline data pulled dynamically from **Supabase** (table: `pipeline`)

#### 5. Team

- Grid of team member cards (photo, name, title, short bio)
- Data pulled dynamically from **Supabase** (table: `team`)

#### 6. News

- Card-based news feed (title, date, short excerpt, link)
- Data pulled dynamically from **Supabase** (table: `news`)

#### 7. Contact

- Simple contact form: Name, Email, Message
- Display company info: PreTT ApS · Ole Maaløes Vej 3, 2200 Copenhagen, Denmark · info@pre-tt.com
- LinkedIn link: https://www.linkedin.com/company/pre-tt/posts/
- Embed a Google Maps location for the address

---

### NAVIGATION

Sticky top navbar with logo on the left and page links on the right: Home · About Us · Technology · Pipeline · Team · News · Contact

---

### ANIMATIONS & INTERACTIONS

- Section title animations on hover/scroll (BioAge Labs style)
- Pipeline stage bars fill on scroll (ActiThera style)
- Smooth page transitions and scroll behavior throughout

---

### BACKEND — SUPABASE

Connect to Supabase for dynamic content on Team, Pipeline, and News pages.

- **Project URL:** https://yuygdwvycnwbdcowvvll.supabase.co
- **Anon/public API key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eWdkd3Z5Y253YmRjb3d2dmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTA4NzUsImV4cCI6MjEwMzQ4Njg3NX0.c9d7EzTQuSMTswPoUYSJwbywY0TQ3HfQGGdteTxFCqw
- Tables to connect: `team`, `pipeline`, `news`

---

### LEGAL & COMPLIANCE

- **GDPR cookie consent banner:** Simple style, appears on first visit
- **Privacy Policy page:** Generate a GDPR-compliant placeholder. Include in the footer.
- **Footer must include:** PreTT ApS · CVR: DK43121618 · Ole Maaløes Vej 3, 2200 Copenhagen, Denmark · Privacy Policy link · LinkedIn link
- **Language:** English only

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7eb7b346-c9c7-4e0b-a7fc-26d424de5533).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
