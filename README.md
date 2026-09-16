# Laboratory of Food Bioactives & Molecular Health (LFBMH)

[![Website Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![Institution](https://img.shields.io/badge/University-University%20of%20Chittagong-003366.svg)](https://cu.ac.bd)
[![Department](https://img.shields.io/badge/Department-Biochemistry%20%26%20Molecular%20Biology-1b8a5a.svg)](https://cu.ac.bd)
[![Tech Stack](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-orange.svg)](#technology-stack)
[![Backend](https://img.shields.io/badge/Backend-Google%20Apps%20Script-4285F4.svg)](#google-apps-script-integration)
[![License](https://img.shields.io/badge/License-Academic%20%2F%20MIT-blue.svg)](LICENSE)

Official website and administrative web application for the **Laboratory of Food Bioactives & Molecular Health (LFBMH)**, Department of Biochemistry and Molecular Biology, University of Chittagong, Bangladesh.

---

## 🔬 About the Laboratory

Established in 2006, the **Laboratory of Food Bioactives & Molecular Health (LFBMH)** is an academic research group bridging natural product biochemistry, molecular biology, and *in-vivo* pharmacology.

The laboratory is led jointly by:
- **Prof. Dr. Dwaipayan Sikdar** — Principal Investigator
- **Prof. Dr. Suman Mojumder** — Principal Investigator

### Core Research Pillars
1. **Natural Product Isolation & Characterization**: Extracting and identifying novel bioactive phytochemicals and marine-derived compounds from indigenous flora and fauna of Bangladesh.
2. **Nutraceuticals & Functional Foods**: Investigating therapeutic potentials for metabolic disorders, oxidative stress, and chronic diseases.
3. ***In-Vivo* & Biochemical Modeling**: Utilizing *Caenorhabditis elegans* (*C. elegans*) and rodent models to study longevity, neuroprotection, and stress resistance.
4. **Computational Biology & In-Silico Modeling**: Molecular docking, network pharmacology, and dynamic simulations of bioactive ligand-target interactions.

---

## 🌐 Website Features & Structure

This repository contains a full-featured, responsive, accessible, and modern static web platform coupled with a client-side administrative portal:

### Public Pages
- **[Home (`index.html`)](./index.html)**: Dynamic hero background carousel, research pillar previews, lab impact metrics, featured publications, and latest news.
- **[About Us (`about.html`)](./about.html)**: Laboratory history, vision, mission, and PI profiles.
- **[Research Wings (`research.html`)](./research.html)**: Comprehensive breakdown of experimental domains, including specialized wings:
  - *Food & Nutraceutical Sciences* (`lab-food-nutraceutical.html`)
  - *Applied Biosciences* (`lab-applied-biosciences.html`)
- **[Publications (`publications.html`)](./publications.html)**: Interactive, filterable archive of peer-reviewed journal articles, conference papers, and book chapters.
- **[Team & People (`people.html`)](./people.html)**: Directory of PIs, research fellows, graduate researchers, undergraduate trainees, and lab alumni.
- **[Lab Protocols (`lab-protocols.html`)](./lab-protocols.html)**: Standard Operating Procedures (SOPs), extraction protocols, and bioassay guidelines.
- **[Facilities (`facilities.html`)](./facilities.html)**: Inventory of specialized equipment, instrumentation, and laboratory infrastructure.
- **[Resources (`resources.html`)](./resources.html)**: Downloadable academic resources, chemical safety sheets, computational guides, and forms.
- **[Gallery (`gallery.html`)](./gallery.html)**: High-resolution media showcase with responsive modal lightbox viewer (`gallery-lightbox.js`).
- **[News & Events (`news-events.html`)](./news-events.html)**: Conferences, workshops, student achievements, and academic seminars.
- **[Collaborations (`collaborations.html`)](./collaborations.html)**: Domestic and international research networks and partners.
- **[Join Us (`join-us.html`)](./join-us.html)**: Research intake information and prospective student application form.
- **[Contact (`contact.html`)](./contact.html)**: Campus location map, contact directory, and inquiry form.

### 💼 Lab Management Portal (`/portal`)
Located in `/portal`, this dedicated administrative web app facilitates internal laboratory operations:
- **Expense & Procurement Management**: Log and categorize purchases (reagents, consumables, lab equipment, maintenance).
- **Role-Based Views**: Permissions tailored for Principal Investigators and Lab Managers.
- **Client-Side Export**: Generate formatted Excel (`.xlsx`) and CSV reports using SheetJS.
- **Live Inventory & Spending Analytics**: Instant summary of budgets and supply levels.

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 (WAI-ARIA compliant accessibility)
- **Styling**: Vanilla Modern CSS3
  - Custom responsive design system with CSS custom properties (variables)
  - Dark-mode ready, glassmorphism UI accents, flexbox, and CSS grid
  - Mobile-first responsiveness (`css/responsive.css`)
- **Scripting**: Vanilla JavaScript (ES6+)
  - Publication filtering and search (`js/publications-filter.js`)
  - Touch-friendly lightbox gallery (`js/gallery-lightbox.js`)
  - Mobile navigation and smooth scroll interactions (`js/main.js`)
- **Portal Engine**: Standalone Single-Page Application (SPA) with SheetJS integration
- **Backend / Form Processing**: Google Apps Script (`google-apps-script/Code.gs`)
  - Automatic student intake logging to Google Sheets
  - File upload to Google Drive
  - Automated transactional email confirmations

---

## 📂 Repository Organization

```text
.
├── index.html                      # Homepage
├── about.html                      # About the lab & PIs
├── research.html                   # Research overview & wings
├── lab-food-nutraceutical.html     # Food & Nutraceutical wing
├── lab-applied-biosciences.html    # Applied Biosciences wing
├── publications.html               # Searchable publication archive
├── people.html                     # Lab members, PIs & alumni
├── lab-protocols.html              # SOPs & wet-lab protocols
├── facilities.html                 # Laboratory equipment & spaces
├── resources.html                  # Academic forms & guides
├── gallery.html                    # Photo gallery
├── news-events.html                # Announcements & seminars
├── collaborations.html             # Institutional collaborations
├── join-us.html                    # Application & recruitment
├── contact.html                    # Contact details & campus map
├── 404.html                        # Custom 404 error page
├── sitemap.xml                     # Search engine sitemap
├── robots.txt                      # Crawler directives
│
├── css/
│   ├── style.css                   # Global styles & design system tokens
│   └── responsive.css              # Breakpoints & mobile optimizations
│
├── js/
│   ├── main.js                     # Navigation, hero sliders & core interactions
│   ├── publications-filter.js      # Dynamic publication search & filter
│   └── gallery-lightbox.js         # Fullscreen image viewer
│
├── portal/                         # Administrative Expense & Procurement Portal
│   ├── index.html                  # Portal dashboard UI
│   ├── login.html                  # Portal authentication gate
│   ├── styles.css                  # Portal styling
│   └── app.js                      # Expense tracking & Excel export logic
│
├── google-apps-script/
│   └── Code.gs                     # Google Apps Script intake backend
│
├── scripts/                        # Utility & maintenance scripts
│   ├── reorder_nav.py              # Navigation consistency helper
│   └── _audit_unused.js            # Asset audit script
│
├── Gallery/                        # Laboratory & research photos
├── Team/                           # Faculty, researcher & student portraits
└── Collaboration/                  # Institutional logos & partner graphics
```

---

## 🚀 Getting Started

### Running Locally

Because this project is built entirely on native web standards (HTML5/CSS3/JavaScript), it requires no package manager or build step. You can run it with any static server:

#### Option 1: VS Code Live Server Extension (Recommended)
1. Open this repository in [Visual Studio Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will open automatically at `http://127.0.0.1:5500`.

#### Option 2: Python HTTP Server
If you have Python installed, run in your terminal:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

#### Option 3: Node.js `npx serve`
```bash
npx serve .
```

---

## ⚙️ Google Apps Script Configuration

The student intake form on `join-us.html` integrates with a Google Apps Script Web App (`google-apps-script/Code.gs`):

1. Create a new project at [script.google.com](https://script.google.com/).
2. Paste the contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
3. Set your Google Sheet ID (`SHEET_ID`) and Google Drive folder name (`DRIVE_FOLDER_NAME`) at the top of the file:
   ```javascript
   const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
   const DRIVE_FOLDER_NAME = 'LFBMH Undergraduate Applications';
   ```
4. Run `testSubmission()` in the Apps Script editor to authorize permissions.
5. Click **Deploy > New Deployment > Web app**:
   - **Execute as**: *Me*
   - **Who has access**: *Anyone*
6. Copy the resulting Web App URL and update the form action URL in `join-us.html`.

---

## 🚢 Deploying to GitHub Pages

To host this website for free using **GitHub Pages**:

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of LFBMH website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages** (under *Code and automation*).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Click **Save**. Within a few minutes, your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 👥 Laboratory Leadership & Contact

**Laboratory of Food Bioactives and Molecular Health (LFBMH)**  
Department of Biochemistry and Molecular Biology  
Faculty of Biological Sciences, University of Chittagong  
Chattogram-4331, Bangladesh  

- 🌐 **Website**: [University of Chittagong Profile](https://cu.ac.bd)
- 📧 **Inquiries**: Refer to [`contact.html`](./contact.html) for direct faculty email addresses and office locations.

---

## 📄 License & Attribution

All research data, publications, logos, and laboratory photography are copyright © Laboratory of Food Bioactives and Molecular Health (LFBMH), University of Chittagong.  
The source code layout and scripts are made available for academic and educational usage under the [MIT License](LICENSE).
