// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Language data
const translations = {
  en: {
    name: "Allahverdiyev Heydar",
    nav_about: "About",
    nav_education: "Education",
    nav_skills: "Skills",
    nav_contact: "Contact",
    role_kicker: "Linguist · Translator",
    hero_title: "Precision in language, clarity in meaning.",
    hero_summary:
      "I am a linguistics and translation specialist focused on delivering clear, culturally aware communication across languages. My work combines academic depth with practical, human-centered translation.",
    education_title: "Education",
    education_university: "Khazar University",
    education_program: "Linguistics / Translation",
    education_description:
      "Academic training in linguistics, translation theory, and practice with a focus on accuracy, style, and cross-cultural communication.",
    skills_title: "Skills",
    skill_translation: "Translation (RUS ↔ EN)",
    skill_linguistics: "Applied Linguistics",
    skill_localization: "Localization & Adaptation",
    skill_proofreading: "Editing & Proofreading",
    skill_academic: "Academic Writing",
    skill_terminology: "Terminology Management",
    contact_title: "Contact",
    contact_intro:
      "For collaborations, translation projects, or consultations, feel free to reach out.",
    contact_email_label: "Email",
    footer_text: "© {year} Your Name. All rights reserved.",
  },
  az: {
    name: "Allahverdiyev Heyder",
    nav_about: "Haqqımda",
    nav_education: "Təhsil",
    nav_skills: "Bacarıqlar",
    nav_contact: "Əlaqə",
    role_kicker: "Dilçi · Tərcüməçi",
    hero_title: "Dildə dəqiqlik, mənada aydınlıq.",
    hero_summary:
      "Mən dillər və tərcümə sahəsində ixtisaslaşmış mütəxəssisəm. Məqsədim müxtəlif dillər arasında aydın, mədəni cəhətdən həssas və insan yönümlü kommunikasiya yaratmaqdır.",
    education_title: "Təhsil",
    education_university: "Xəzər Universiteti",
    education_program: "Linqvistika / Tərcümə",
    education_description:
      "Linqvistika, tərcümə nəzəriyyəsi və praktikası üzrə elmi baza, dəqiqlik, üslub və mədəniyyətlərarası ünsiyyətə xüsusi diqqət.",
    skills_title: "Bacarıqlar",
    skill_translation: "Tərcümə (RUS ↔ EN)",
    skill_linguistics: "Tətbiqi Linqvistika",
    skill_localization: "Lokallaşdırma və Adaptasiya",
    skill_proofreading: "Redaktə və korrektə",
    skill_academic: "Elmi-akademik yazı",
    skill_terminology: "Terminologiya idarəçiliyi",
    contact_title: "Əlaqə",
    contact_intro:
      "Birgə əməkdaşlıq, tərcümə layihələri və ya məsləhətləşmə üçün mənimlə əlaqə saxlaya bilərsiniz.",
    contact_email_label: "E-poçt",
    footer_text: "© {year} Sizin Adınız. Bütün hüquqlar qorunur.",
  },
};

let currentLang = "en";

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key || !(key in dict)) return;

    let value = dict[key];
    if (key === "footer_text") {
      value = value.replace("{year}", new Date().getFullYear());
    }

    el.textContent = value;
  });

  document.documentElement.lang = lang === "az" ? "az" : "en";

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  currentLang = lang;
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (lang && lang !== currentLang) {
      applyLanguage(lang);
    }
  });
});

applyLanguage(currentLang);

// Golden dust canvas animation
const canvas = document.getElementById("golden-dust");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCountBase = 80;
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initParticles();
}

function initParticles() {
  const densityFactor = Math.min(1.2, Math.max(0.4, width / 1440));
  const targetCount = Math.floor(particleCountBase * densityFactor);
  particles = [];

  for (let i = 0; i < targetCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const depth = Math.random(); // 0 (near) - 1 (far)

    particles.push({
      x,
      y,
      radius: 0.5 + (1.6 - depth * 1.2),
      baseRadius: 0.5 + (1.6 - depth * 1.2),
      depth,
      vx: (Math.random() * 0.15 + 0.03) * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.random() * 0.05 - 0.025,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }
}

let lastTime = 0;

function drawParticle(p, time) {
  const twinkle = 0.35 + 0.25 * Math.sin(time * 0.0015 + p.twinkleOffset);
  const size = p.baseRadius * (0.8 + 0.5 * twinkle);

  const gradient = ctx.createRadialGradient(
    p.x,
    p.y,
    0,
    p.x,
    p.y,
    size * 2.5
  );

  gradient.addColorStop(0, `rgba(255, 243, 178, ${0.75 * (1 - p.depth)})`);
  gradient.addColorStop(0.4, `rgba(251, 191, 36, ${0.25 * (1 - p.depth)})`);
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 248, 220, ${0.9 * (1 - p.depth)})`;
  ctx.arc(p.x, p.y, size * 0.7, 0, Math.PI * 2);
  ctx.fill();
}

function update(time) {
  const dt = (time - lastTime) || 16;
  lastTime = time;

  ctx.clearRect(0, 0, width, height);

  ctx.save();
  const gradientBg = ctx.createLinearGradient(0, 0, width, height);
  gradientBg.addColorStop(0, "rgba(15,23,42,0.7)");
  gradientBg.addColorStop(1, "rgba(2,6,23,0.9)");
  ctx.fillStyle = gradientBg;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  particles.forEach((p) => {
    p.x += p.vx * dt * (0.05 + 0.2 * (1 - p.depth));
    p.y += p.vy * dt * (0.05 + 0.2 * (1 - p.depth));

    if (p.x < -50) p.x = width + 50;
    if (p.x > width + 50) p.x = -50;
    if (p.y < -50) p.y = height + 50;
    if (p.y > height + 50) p.y = -50;

    drawParticle(p, time);
  });

  requestAnimationFrame(update);
}

resizeCanvas();
requestAnimationFrame(update);

window.addEventListener("resize", () => {
  resizeCanvas();
});

