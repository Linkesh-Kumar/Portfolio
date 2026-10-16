# Linkesh Kumar E — Modern Portfolio & Resume Website

A modern, high-performance personal portfolio and interactive resume website built for **Linkesh Kumar E** (B.Tech Computer Science & Engineering, CGPA: 9.20).

Designed specifically to impress technical recruiters, engineering leaders, and hiring managers with sleek dark glassmorphism, responsive UI, interactive project modals, and a printable PDF resume engine.

---

## 🌟 Key Highlights

- **⚡ Zero Setup Required:** Built purely with semantic HTML5, CSS3, and vanilla JavaScript. No complex build tools, `npm run build`, or bundlers needed.
- **✨ Dark Glassmorphism Aesthetic:** Cyber-slate backdrop, electric cyan & indigo accents, glowing border hover effects, and custom typography.
- **🌌 Interactive Constellation Canvas:** Background particle network connecting nodes dynamically upon mouse movement.
- **⌨️ Dynamic Typing Subtitle:** Highlights core specializations (Data Analytics, PyTorch AI, 9.20 CGPA).
- **📂 Interactive Project Showcase & Deep Dives:**
  - **Panclive:** Multi-Modal XAI for Pancreatic Cancer Diagnosis (PyTorch, Vision Transformer, BioBERT, SHAP, Grad-CAM).
  - **ParkIt:** Smart Parking Management System (Flutter, Node.js, MySQL, IoT, ANPR).
  - **ABC Payor Performance Analytics:** CorroHealth & Deloitte enterprise dashboarding.
  - Interactive modal dialogs with detailed engineering architecture and metric cards.
- **📑 Live Printable Resume:**
  - Click **"Resume"** or **"Print / Save as PDF"** to open a clean modal.
  - Features custom `@media print` CSS that formats a pristine monochrome resume ready for job applications.
- **📋 One-Click Copy-to-Clipboard:** Instant click-to-copy for email and phone numbers with animated feedback toast.
- **📱 100% Fully Responsive:** Flawless experience across mobile phones, tablets, laptops, and ultra-wide screens.

---

## 🚀 How to Run Locally

### Option 1: Direct File Launch (Easiest)
Simply open the folder:
```
C:\Users\linke\.gemini\antigravity\scratch\portfolio-linkesh\
```
And double-click **`index.html`** in your file manager (File Explorer). It will launch immediately in your default web browser (Chrome, Edge, Brave, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
If you have Python installed, open terminal in this folder and run:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## 📁 File Structure

```
portfolio-linkesh/
│
├── index.html       # Semantic HTML5 markup, SEO meta tags, and structured sections
├── style.css        # CSS variables, glassmorphic styling, animations, and print media rules
├── script.js        # Constellation canvas, typing effect, modals, filters, and form logic
└── README.md        # Comprehensive documentation and deployment guide
```

---

## 🌐 Free 1-Click Hosting Options

### 1. GitHub Pages (Recommended)
1. Initialize a repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/Linkesh-Kumar/portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Source**, select **`main`** branch and `/ (root)`.
   - Click **Save**. Your site will be live at: `https://linkesh-kumar.github.io/portfolio/`

### 2. Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New"** > **"Project"** and select your portfolio repository.
3. Click **"Deploy"**. Done!

### 3. Netlify Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `portfolio-linkesh` folder directly onto the page.
3. Your site gets deployed instantly with a live HTTPS URL.

---

## ✏️ How to Customize

- **Add New Projects:** Duplicate any `.project-card` block in `index.html` and add corresponding modal details in `script.js` inside `projectDetails`.
- **Change Socials / Contacts:** Search for `linkeshkumar14@gmail.com` or `+91-9342447645` across `index.html` to update your links or profile info.
- **Update Skills:** Modify the percentage widths in `.skill-progress` inside `index.html` to tweak skill level meters.

---

© 2026 Linkesh Kumar E. Designed for high-impact tech opportunities.
