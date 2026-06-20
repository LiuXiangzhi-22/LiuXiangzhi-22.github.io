const I18N = {
  zh: {
    metaTitle: "紫苏的主页",
    metaDesc: "紫苏的个人主页 — 学习心得、近期收藏与代码作品",
    navAbout: "关于",
    navNotes: "学习心得",
    navFavorites: "近期收藏",
    navProjects: "代码作品",
    langToggle: "切换为英文",
    themeToggle: "切换主题",
    greeting: "你好，我是",
    aboutTitle: "关于我",
    notesTitle: "学习心得",
    notesDesc: "读书笔记、课程总结与踩坑记录",
    favoritesTitle: "近期收藏",
    favoritesDesc: "文章、工具、视频与其他值得回看的内容",
    projectsTitle: "代码作品",
    projectsDesc: "个人项目与实验性代码",
    footerHosted: "由 GitHub Pages 托管",
    linkEmail: "邮箱",
    linkBlog: "博客",
    readMore: "阅读全文 →",
    viewProject: "查看项目 →",
    viewDemo: "在线演示 →",
    emptyNotes: "暂无内容。编辑 data/notes.json 添加学习心得。",
    emptyFavorites: "暂无收藏。编辑 data/favorites.json 添加内容。",
    emptyProjects: "暂无项目。编辑 data/projects.json 添加代码作品。",
    favoriteTypeDefault: "链接",
  },
  en: {
    metaTitle: "Mercury's Homepage",
    metaDesc: "Mercury's personal site — learning notes, favorites, and projects",
    navAbout: "About",
    navNotes: "Notes",
    navFavorites: "Favorites",
    navProjects: "Projects",
    langToggle: "Switch to Chinese",
    themeToggle: "Toggle theme",
    greeting: "Hi, I'm",
    aboutTitle: "About Me",
    notesTitle: "Learning Notes",
    notesDesc: "Reading notes, course summaries, and lessons learned",
    favoritesTitle: "Recent Favorites",
    favoritesDesc: "Articles, tools, videos, and other worth-revisiting content",
    projectsTitle: "Projects",
    projectsDesc: "Personal projects and experimental code",
    footerHosted: "Hosted on GitHub Pages",
    linkEmail: "Email",
    linkBlog: "Blog",
    readMore: "Read more →",
    viewProject: "View project →",
    viewDemo: "Live demo →",
    emptyNotes: "No notes yet. Edit data/notes.json to add learning notes.",
    emptyFavorites: "No favorites yet. Edit data/favorites.json to add items.",
    emptyProjects: "No projects yet. Edit data/projects.json to add your work.",
    favoriteTypeDefault: "Link",
  },
};

const PROFILE = {
  zh: {
    name: "紫苏",
    tagline: "记录学习、收藏与创造",
    about:
      "一名热爱编程与学习的开发者。这个站点用来整理学习笔记、收藏优质内容，并展示个人项目。欢迎常来看看。",
    links: [
      { labelKey: null, label: "GitHub", url: "https://github.com/LiuXiangzhi-22", primary: true },
      { labelKey: "linkEmail", url: "mailto:your@email.com" },
      { labelKey: "linkBlog", url: "#notes" },
    ],
  },
  en: {
    name: "Mercury",
    tagline: "Learning, collecting, and creating",
    about:
      "A developer passionate about programming and learning. This site collects study notes, curated resources, and personal projects. Drop by anytime.",
    links: [
      { labelKey: null, label: "GitHub", url: "https://github.com/LiuXiangzhi-22", primary: true },
      { labelKey: "linkEmail", url: "mailto:your@email.com" },
      { labelKey: "linkBlog", url: "#notes" },
    ],
  },
};

let currentLang = "zh";
let notesData = [];
let favoritesData = [];
let projectsData = [];

function t(key) {
  return I18N[currentLang][key] ?? I18N.zh[key] ?? key;
}

function pick(value) {
  if (value && typeof value === "object" && !Array.isArray(value) && ("zh" in value || "en" in value)) {
    return value[currentLang] ?? value.zh ?? value.en ?? "";
  }
  return value ?? "";
}

function pickList(value) {
  const list = pick(value);
  return Array.isArray(list) ? list : [];
}

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch {
    return [];
  }
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function applyStaticText() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.getElementById("pageTitle").textContent = t("metaTitle");
  document.getElementById("metaDesc").setAttribute("content", t("metaDesc"));
  document.getElementById("langToggle").setAttribute("aria-label", t("langToggle"));
  document.getElementById("themeToggle").setAttribute("aria-label", t("themeToggle"));
  document.getElementById("langIcon").textContent = currentLang === "zh" ? "EN" : "中";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}

function renderProfile() {
  const profile = PROFILE[currentLang];
  document.getElementById("navLogo").textContent = profile.name;
  document.getElementById("heroGreeting").textContent = t("greeting");
  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileTagline").textContent = profile.tagline;
  document.getElementById("aboutText").textContent = profile.about;
  document.getElementById("footerName").textContent = profile.name;
  document.getElementById("year").textContent = new Date().getFullYear();

  const linksEl = document.getElementById("profileLinks");
  linksEl.innerHTML = profile.links
    .map((link) => {
      const label = link.labelKey ? t(link.labelKey) : link.label;
      return `<a href="${escapeHTML(link.url)}" class="hero-link${link.primary ? " hero-link-primary" : ""}"${link.url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHTML(label)}</a>`;
    })
    .join("");
}

function renderNotes(notes) {
  const grid = document.getElementById("notesGrid");
  if (!notes.length) {
    grid.innerHTML = `<p class="empty-state">${escapeHTML(t("emptyNotes"))}</p>`;
    return;
  }

  grid.innerHTML = notes
    .map((note) => {
      const title = pick(note.title);
      const excerpt = pick(note.excerpt);
      const tags = pickList(note.tags);
      const url = note.url || "";

      return `
    <article class="card">
      <div class="card-meta">
        <span class="card-date">${escapeHTML(note.date)}</span>
        ${tags.map((tag) => `<span class="card-tag">${escapeHTML(tag)}</span>`).join("")}
      </div>
      <h3 class="card-title">
        ${url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(title)}</a>` : escapeHTML(title)}
      </h3>
      <p class="card-excerpt">${escapeHTML(excerpt)}</p>
      ${url ? `<div class="card-footer"><a class="card-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("readMore"))}</a></div>` : ""}
    </article>`;
    })
    .join("");
}

function renderFavorites(favorites) {
  const grid = document.getElementById("favoritesGrid");
  if (!favorites.length) {
    grid.innerHTML = `<p class="empty-state">${escapeHTML(t("emptyFavorites"))}</p>`;
    return;
  }

  grid.innerHTML = favorites
    .map((item) => {
      const title = pick(item.title);
      const note = pick(item.note);
      const type = pick(item.type) || t("favoriteTypeDefault");

      return `
    <article class="card">
      <span class="favorite-type">${escapeHTML(type)}</span>
      <h3 class="card-title">
        <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(title)}</a>
      </h3>
      <p class="card-excerpt">${escapeHTML(note)}</p>
      <div class="card-meta">
        <span class="card-date">${escapeHTML(item.date)}</span>
      </div>
    </article>`;
    })
    .join("");
}

function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");
  if (!projects.length) {
    grid.innerHTML = `<p class="empty-state">${escapeHTML(t("emptyProjects"))}</p>`;
    return;
  }

  grid.innerHTML = projects
    .map((project) => {
      const name = pick(project.name);
      const description = pick(project.description);
      const status = pick(project.status);
      const tech = project.tech || [];

      return `
    <article class="card">
      <div class="card-meta">
        <span class="card-date">${escapeHTML(project.date)}</span>
        ${status ? `<span class="card-tag">${escapeHTML(status)}</span>` : ""}
      </div>
      <h3 class="card-title">
        ${project.url ? `<a href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(name)}</a>` : escapeHTML(name)}
      </h3>
      <p class="card-excerpt">${escapeHTML(description)}</p>
      <div class="card-tech">
        ${tech.map((item) => `<span class="tech-badge">${escapeHTML(item)}</span>`).join("")}
      </div>
      <div class="card-footer">
        ${project.url ? `<a class="card-link" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("viewProject"))}</a>` : ""}
        ${project.demo ? `<a class="card-link" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("viewDemo"))}</a>` : ""}
      </div>
    </article>`;
    })
    .join("");
}

function renderAll() {
  applyStaticText();
  renderProfile();
  renderNotes(notesData);
  renderFavorites(favoritesData);
  renderProjects(projectsData);
}

function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

function initLang() {
  const saved = localStorage.getItem("lang");
  const browserLang = navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
  currentLang = saved || browserLang;

  document.getElementById("langToggle").addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem("lang", currentLang);
    renderAll();
  });
}

async function init() {
  initTheme();
  initLang();

  [notesData, favoritesData, projectsData] = await Promise.all([
    loadJSON("data/notes.json"),
    loadJSON("data/favorites.json"),
    loadJSON("data/projects.json"),
  ]);

  renderAll();
}

init();