# Contributing to the LFBMH Website & Portal

Thank you for your interest in contributing to the **Laboratory of Food Bioactives & Molecular Health (LFBMH)** web platform!

Whether you are a lab member updating publications and protocols, or an open-source contributor helping with accessibility and features, this document outlines the workflow and guidelines.

---

## 🛠️ Development Workflow

1. **Fork or Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Serve the Site Locally**:
   - Use VS Code Live Server, or:
   ```bash
   python -m http.server 8000
   ```

4. **Make and Test Your Changes**:
   - Verify responsiveness across mobile, tablet, and desktop breakpoints.
   - Ensure image paths and hyperlinks are relative and valid.
   - Maintain semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`).

5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "feat: descriptive summary of changes"
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**:
   - Open a PR against the `main` branch with a clear summary of your updates.

---

## 📝 Updating Common Lab Content

### Adding a New Publication
1. Open [`publications.html`](./publications.html).
2. Locate the appropriate category and year container.
3. Duplicate an existing publication card and update:
   - Paper title, author list (highlighting LFBMH members), journal name, volume, pages, and year.
   - DOI link and citation badges.
   - Pertinent search filter tags (`data-year`, `data-topic`).

### Adding a New Team Member
1. Open [`people.html`](./people.html).
2. Save their photo (preferably 400x400px aspect ratio) in the [`Team/`](./Team/) directory.
3. Add a profile card under their respective section (PI, Graduate Student, Undergraduate Researcher, or Alumni).

### Updating SOPs & Protocols
1. Open [`lab-protocols.html`](./lab-protocols.html).
2. Follow standard laboratory safety procedures and document steps sequentially.

---

## 🎨 Style & Code Standards

- **Vanilla Web Technologies**: Keep dependencies minimal. Avoid introducing heavy external CSS/JS frameworks unless discussed with the lab team.
- **CSS Architecture**: Use the CSS variables defined in [`css/style.css`](./css/style.css) for spacing, typography, and color consistency.
- **Media Optimization**: Compress photos before committing to prevent repository bloat (recommended: WebP or optimized JPEG).
