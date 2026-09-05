# Pietro Zunino — Personal Academic & Research Website

A clean, modern, zero-slop personal website for **Pietro Zunino** (Ph.D. Candidate in EV Grid Integration at the Technical University of Denmark - DTU).

Featuring a custom scientific twilight/plasma palette (`#360185`, `#8F0177`, `#DE1A58`, `#F4B342`), 3 distinct research pillars, first-author publication cards with interactive BibTeX copying, and an academic/industry credentials timeline.

---

## 🚀 How to Preview Locally

Because this site is built with pure semantic HTML5, CSS, and vanilla JavaScript, it has **zero dependencies** and requires no Node.js compilation.

1. Open PowerShell or your terminal in this directory:
   ```powershell
   python -m http.server 8000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## 📁 File Structure

```
personal website/
├── index.html               # Main page (structure, content, and sections)
├── css/
│   └── style.css            # Twilight/plasma design system, typography, dark/light themes
├── js/
│   └── main.js              # Theme toggle, clipboard actions, and interactivity
├── assets/
│   └── Pietro_Zunino_CV.pdf # Place your actual CV PDF here
└── README.md                # Documentation & GitHub deployment guide
```

---

## 🌐 How to Deploy to GitHub Pages (100% Free Hosting)

1. Create a new public repository on GitHub named:
   `yourusername.github.io`
   *(Replace `yourusername` with your actual GitHub handle).*

2. Initialize and push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Pietro Zunino personal website"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. Go to **Settings → Pages** in your GitHub repository and ensure **Source** is set to `Deploy from a branch` (`main` / `/root`).

Your website will be live at:
`https://yourusername.github.io`

---

## ✏️ How to Update Content

* **Add a new paper:** Duplicate one `<article class="pub-card">` block in `index.html`, fill in the title, authors, DOI, and paste the BibTeX snippet into the corresponding `<div class="bibtex-box">`.
* **Change social links:** Search for `https://linkedin.com` or `https://scholar.google.com` in `index.html` and replace them with your exact profile URLs.
* **Update CV:** Drop your latest resume into `assets/Pietro_Zunino_CV.pdf`.
