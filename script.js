/* ==========================================================================
   LINKESH KUMAR E - INTERACTIVE SCRIPTS
   Constellation Canvas, Typing Engine, Filtering, Modals, Clipboard, & Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initParticleCanvas();
  initTypingEffect();
  initNavigation();
  initSkillsFilter();
  initProjectsFilter();
  initScrollTop();
});

/* ==========================================================================
   1. CONSTELLATION / NEURAL PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 16), 65);
  const maxDistance = 140;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248,' : 'rgba(129, 140, 248,';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      const isLight = document.body.classList.contains('light-theme');
      ctx.beginPath();
      ctx.arc(this.x, this.y, isLight ? this.radius * 1.25 : this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? `rgba(2, 132, 199, ${Math.max(this.alpha, 0.65)})` : `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null, maxDist: 180 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.body.classList.contains('light-theme');

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect to mouse with high-contrast glowing lines
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight 
            ? `rgba(2, 132, 199, ${0.75 * (1 - dist / mouse.maxDist)})`
            : `rgba(56, 189, 248, ${0.45 * (1 - dist / mouse.maxDist)})`;
          ctx.lineWidth = isLight ? 1.5 : 1.0;
          ctx.stroke();
        }
      }

      // Connect to neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isLight
            ? `rgba(2, 132, 199, ${0.28 * (1 - dist / maxDistance)})`
            : `rgba(56, 189, 248, ${0.15 * (1 - dist / maxDistance)})`;
          ctx.lineWidth = isLight ? 0.9 : 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw subtle cursor dot (without the big outer circle)
    if (mouse.x !== null && mouse.y !== null) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.85)' : 'rgba(56, 189, 248, 0.9)';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingTarget = document.getElementById('typing-text');
  if (!typingTarget) return;

  const roles = [
    'Data Analyst (Power BI & SQL)',
    'Deep Learning & AI Researcher',
    'B.Tech CSE Graduate (9.20 CGPA)',
    'Full-Stack Developer (Flutter & Node.js)',
    'Problem Solver Ready to Deliver'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 350; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION, HEADER BLUR, & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky header class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (mobileDrawer.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }
}

function closeMobileMenu() {
  const mobileDrawer = document.getElementById('mobile-drawer');
  const menuToggle = document.getElementById('menu-toggle');
  if (mobileDrawer && menuToggle) {
    mobileDrawer.classList.remove('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
}

/* ==========================================================================
   4. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECTS FILTERING
   ========================================================================== */
function initProjectsFilter() {
  const buttons = document.querySelectorAll('.proj-filter-btn');
  const projects = document.querySelectorAll('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projects.forEach((proj) => {
        const category = proj.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          proj.style.display = '';
          proj.style.opacity = '0';
          setTimeout(() => {
            proj.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            proj.style.opacity = '1';
          }, 10);
        } else {
          proj.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. RESUME MODAL & PRINTING
   ========================================================================== */
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   7. PROJECT DEEP-DIVE MODAL ENGINE
   ========================================================================== */
const projectDetails = {
  panclive: {
    title: 'Panclive — Multi-Modal XAI for Pancreatic Cancer Diagnosis',
    subtitle: 'Vision Transformer, BioBERT, Survival Analysis & Clinical Interpretability (Sep 2025 – Apr 2026)',
    content: `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div style="background:rgba(129, 140, 248, 0.1); border:1px solid rgba(129, 140, 248, 0.25); border-radius:12px; padding:1.2rem;">
          <h4 style="color:#818cf8; margin-bottom:0.4rem; font-size:1.05rem;"><i class="fa-solid fa-microscope"></i> Project Summary &amp; Research Problem</h4>
          <p style="font-size:0.92rem; color:#cbd5e1; line-height:1.6;">
            Pancreatic cancer is notoriously aggressive and difficult to detect in early imaging stages. Uni-modal models relying solely on CT scans miss critical contextual patient history and lab biomarkers. Panclive resolves this by fusing <strong>computed tomography (CT) images</strong>, <strong>clinical diagnostic narratives</strong>, and <strong>structured genomic/clinical attributes</strong> into a unified multimodal tensor space.
          </p>
        </div>

        <div>
          <h4 style="color:#f8fafc; margin-bottom:0.6rem; font-size:1.02rem;"><i class="fa-solid fa-diagram-project"></i> Deep Architecture &amp; Methodology</h4>
          <ul style="list-style:disc; padding-left:1.4rem; font-size:0.9rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.55rem; line-height:1.6;">
            <li><strong>Visual Feature Extractor:</strong> Fine-tuned Vision Transformer (ViT-B/16) on segmented abdominal CT volumes.</li>
            <li><strong>Textual Representation:</strong> BioBERT embedding pipeline processing clinical doctor notes and pathology notes.</li>
            <li><strong>Cross-Attention Fusion:</strong> Novel cross-modal multi-head attention module bridging visual patch embeddings with linguistic tokens.</li>
            <li><strong>Survival Forecasting:</strong> Multi-task DeepSurv loss predicting cumulative hazard rates and prognosis horizons.</li>
            <li><strong>Clinical Explainability (XAI):</strong> Integrated <em>Grad-CAM</em> to generate visual heatmaps of pancreatic lesions and <em>SHAP</em> (SHapley Additive exPlanations) to rank influential biochemical markers.</li>
          </ul>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.8rem; background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06); text-align:center;">
          <div><div style="font-size:1.3rem; font-weight:800; color:#34d399;">91.4%</div><div style="font-size:0.75rem; color:#94a3b8;">Diagnostic Accuracy</div></div>
          <div><div style="font-size:1.3rem; font-weight:800; color:#38bdf8;">0.82</div><div style="font-size:0.75rem; color:#94a3b8;">C-Index Survival</div></div>
          <div><div style="font-size:1.3rem; font-weight:800; color:#818cf8;">90.8%</div><div style="font-size:0.75rem; color:#94a3b8;">Precision Rate</div></div>
          <div><div style="font-size:1.3rem; font-weight:800; color:#fbbf24;">90.1%</div><div style="font-size:0.75rem; color:#94a3b8;">F1-Score</div></div>
        </div>

        <div>
          <h4 style="color:#f8fafc; margin-bottom:0.5rem; font-size:0.95rem;">Key Technologies:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            <span class="stack-badge">PyTorch</span>
            <span class="stack-badge">Vision Transformer</span>
            <span class="stack-badge">BioBERT</span>
            <span class="stack-badge">Grad-CAM</span>
            <span class="stack-badge">SHAP</span>
            <span class="stack-badge">DeepSurv</span>
            <span class="stack-badge">5-Fold CV</span>
          </div>
        </div>
      </div>
    `
  },
  parkit: {
    title: 'ParkIt — Smart Parking Management System',
    subtitle: 'Flutter Mobile App, IoT Hardware, ANPR, & High-Speed Node.js Backend (Sep 2023 – Nov 2023)',
    content: `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div style="background:rgba(56, 189, 248, 0.1); border:1px solid rgba(56, 189, 248, 0.25); border-radius:12px; padding:1.2rem;">
          <h4 style="color:#38bdf8; margin-bottom:0.4rem; font-size:1.05rem;"><i class="fa-solid fa-car"></i> Smart Urban Mobility Challenge</h4>
          <p style="font-size:0.92rem; color:#cbd5e1; line-height:1.6;">
            Urban congestion caused by drivers hunting for parking wastes immense fuel and time. ParkIt is a full-stack, connected IoT platform enabling real-time parking spot discovery, pre-booking, ticketless barrier entry via automatic plate recognition, and automated digital billing.
          </p>
        </div>

        <div>
          <h4 style="color:#f8fafc; margin-bottom:0.6rem; font-size:1.02rem;"><i class="fa-solid fa-layer-group"></i> Architecture &amp; Key Innovations</h4>
          <ul style="list-style:disc; padding-left:1.4rem; font-size:0.9rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.55rem; line-height:1.6;">
            <li><strong>Cross-Platform Mobile App:</strong> Built with Flutter for smooth iOS and Android performance, providing a dynamic visual parking lot grid with live availability indicators.</li>
            <li><strong>IoT Sensor Mesh:</strong> Ultrasonic distance sensors installed at bay positions reporting occupied / vacant states over MQTT/HTTP.</li>
            <li><strong>ANPR Automated Boom Barrier:</strong> Integrated computer vision plate recognition at entry and exit gates, matching plates to booked reservations for zero-friction access.</li>
            <li><strong>Optimized Relational Database:</strong> Indexed MySQL schema with concurrency lock mechanisms preventing double bookings; reduced backend API latency by 40%.</li>
          </ul>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.8rem; background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06); text-align:center;">
          <div><div style="font-size:1.3rem; font-weight:800; color:#34d399;">-60%</div><div style="font-size:0.75rem; color:#94a3b8;">Search Time Saved</div></div>
          <div><div style="font-size:1.3rem; font-weight:800; color:#38bdf8;">95%</div><div style="font-size:0.75rem; color:#94a3b8;">Booking Accuracy</div></div>
          <div><div style="font-size:1.3rem; font-weight:800; color:#818cf8;">-40%</div><div style="font-size:0.75rem; color:#94a3b8;">API Latency</div></div>
          <div><div style="font-size:1.3rem; font-weight:800; color:#fbbf24;">100%</div><div style="font-size:0.75rem; color:#94a3b8;">Contactless Entry</div></div>
        </div>

        <div>
          <h4 style="color:#f8fafc; margin-bottom:0.5rem; font-size:0.95rem;">Key Technologies:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            <span class="stack-badge">Flutter</span>
            <span class="stack-badge">Dart</span>
            <span class="stack-badge">Node.js</span>
            <span class="stack-badge">Express.js</span>
            <span class="stack-badge">MySQL</span>
            <span class="stack-badge">IoT Hardware</span>
            <span class="stack-badge">ANPR</span>
          </div>
        </div>
      </div>
    `
  },
  analytics: {
    title: 'ABC Payor Performance & Workforce Grading Suite',
    subtitle: 'CorroHealth Infotech Internship Project — Power BI, SQL & SSMS (June 2024 – July 2024)',
    content: `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div style="background:rgba(52, 211, 153, 0.1); border:1px solid rgba(52, 211, 153, 0.25); border-radius:12px; padding:1.2rem;">
          <h4 style="color:#34d399; margin-bottom:0.4rem; font-size:1.05rem;"><i class="fa-solid fa-chart-line"></i> Enterprise Business Context</h4>
          <p style="font-size:0.92rem; color:#cbd5e1; line-height:1.6;">
            At <strong>CorroHealth Infotech</strong>, executive leadership required actionable visibility into health insurance claim adjudication cycles, insurance payor SLAs, denial codes, and team performance metrics.
          </p>
        </div>

        <div>
          <h4 style="color:#f8fafc; margin-bottom:0.6rem; font-size:1.02rem;"><i class="fa-solid fa-list-check"></i> Core Deliverables &amp; Engineering</h4>
          <ul style="list-style:disc; padding-left:1.4rem; font-size:0.9rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.55rem; line-height:1.6;">
            <li><strong>Payor Performance Dashboard:</strong> Architected Power BI reports dissecting claims across payment turnaround times, rejection trends, and recovery yields.</li>
            <li><strong>Automated 5-Tier Grading Engine:</strong> Designed a standardized statistical framework evaluating employees into Grade A, B, C, D, and E cohorts by combining attendance, skill assessment scores, QA accuracy rates, and output volume.</li>
            <li><strong>SQL Server &amp; SSMS Pipeline:</strong> Authored optimized T-SQL scripts for data extraction, handling messy records, date dimension modeling, and star-schema integration.</li>
            <li><strong>DAX KPI Modeling:</strong> Built dynamic time-intelligence measures (MTD, YTD, variance vs. benchmark) with drill-down slices for departmental heads.</li>
          </ul>
        </div>

        <div>
          <h4 style="color:#f8fafc; margin-bottom:0.5rem; font-size:0.95rem;">Key Technologies:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            <span class="stack-badge">Power BI</span>
            <span class="stack-badge">SQL Server (SSMS)</span>
            <span class="stack-badge">DAX</span>
            <span class="stack-badge">Data Modeling</span>
            <span class="stack-badge">Excel</span>
            <span class="stack-badge">Workforce Analytics</span>
          </div>
        </div>
      </div>
    `
  }
};

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('proj-modal-title');
  const sub = document.getElementById('proj-modal-sub');
  const body = document.getElementById('proj-modal-body');

  if (modal && title && sub && body) {
    title.textContent = data.title;
    sub.textContent = data.subtitle;
    body.innerHTML = data.content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function handleModalOverlayClick(event, modalId) {
  if (event.target.id === modalId) {
    if (modalId === 'resume-modal') closeResumeModal();
    if (modalId === 'project-modal') closeProjectModal();
  }
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResumeModal();
    closeProjectModal();
  }
});

/* ==========================================================================
   8. COPY TO CLIPBOARD & TOAST SYSTEM
   ========================================================================== */
function copyText(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showToast(message || 'Copied to clipboard!');
  } catch (err) {
    showToast('Failed to copy. Please copy manually.');
  }
  document.body.removeChild(textArea);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove('hidden');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

/* ==========================================================================
   9. INTERACTIVE CONTACT FORM HANDLER
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const subject = document.getElementById('user-subject').value.trim();
  const message = document.getElementById('user-message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.');
    return;
  }

  // Compose formatted mailto link
  const recipient = 'linkeshkumar14@gmail.com';
  const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject || 'Opportunity Inquiry'}`);
  const mailtoBody = encodeURIComponent(
    `Hi Linkesh,\n\n${message}\n\n---\nBest regards,\n${name}\nEmail: ${email}`
  );

  const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Launch default mail client
  window.location.href = mailtoUrl;

  showToast(`Thank you, ${name}! Launching your email client...`);
  event.target.reset();
}

/* ==========================================================================
   10. SCROLL TO TOP HELPER
   ========================================================================== */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* ==========================================================================
   11. LIGHT & DARK THEME SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('lk-portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    applyTheme('light', false);
  } else {
    applyTheme('dark', false);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme, true);
  localStorage.setItem('lk-portfolio-theme', newTheme);
  showToast(newTheme === 'light' ? 'Light mode activated ☀️' : 'Dark mode activated 🌙');
}

function applyTheme(theme, notify) {
  const toggleBtn = document.getElementById('theme-toggle');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle');

  if (theme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Dark Mode</span>';
    }
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      toggleBtn.setAttribute('title', 'Switch to Light Mode');
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Light Mode</span>';
    }
  }
}
