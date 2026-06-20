const PROFILE = {
  name: "你的名字",
  tagline: "记录学习、收藏与创造",
  about:
    "一名热爱编程与学习的开发者。这个站点用来整理学习笔记、收藏优质内容，并展示个人项目。欢迎常来看看。",
  links: [
    { label: "GitHub", url: "https://github.com/LiuXiangzhi-22", primary: true },
    { label: "邮箱", url: "mailto:your@email.com" },
    { label: "博客", url: "#notes" },
  ],
};

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

function renderProfile() {
  document.getElementById("profileName").textContent = PROFILE.name;
  document.getElementById("profileTagline").textContent = PROFILE.tagline;
  document.getElementById("aboutText").textContent = PROFILE.about;
  document.getElementById("footerName").textContent = PROFILE.name;
  document.getElementById("year").textContent = new Date().getFullYear();

  const linksEl = document.getElementById("profileLinks");
  linksEl.innerHTML = PROFILE.links
    .map(
      (link) =>
        `<a href="${escapeHTML(link.url)}" class="hero-link${link.primary ? " hero-link-primary" : ""}"${link.url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHTML(link.label)}</a>`
    )
    .join("");
}

function renderNotes(notes) {
  const grid = document.getElementById("notesGrid");
  if (!notes.length) {
    grid.innerHTML = `<p class="empty-state">暂无内容。编辑 <code>data/notes.json</code> 添加学习心得。</p>`;
    return;
  }

  grid.innerHTML = notes
    .map(
      (note) => `
    <article class="card">
      <div class="card-meta">
        <span class="card-date">${escapeHTML(note.date)}</span>
        ${(note.tags || []).map((t) => `<span class="card-tag">${escapeHTML(t)}</span>`).join("")}
      </div>
      <h3 class="card-title">
        ${note.url ? `<a href="${escapeHTML(note.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(note.title)}</a>` : escapeHTML(note.title)}
      </h3>
      <p class="card-excerpt">${escapeHTML(note.excerpt)}</p>
      ${note.url ? `<div class="card-footer"><a class="card-link" href="${escapeHTML(note.url)}" target="_blank" rel="noopener noreferrer">阅读全文 →</a></div>` : ""}
    </article>`
    )
    .join("");
}

function renderFavorites(favorites) {
  const grid = document.getElementById("favoritesGrid");
  if (!favorites.length) {
    grid.innerHTML = `<p class="empty-state">暂无收藏。编辑 <code>data/favorites.json</code> 添加内容。</p>`;
    return;
  }

  grid.innerHTML = favorites
    .map(
      (item) => `
    <article class="card">
      <span class="favorite-type">${escapeHTML(item.type || "链接")}</span>
      <h3 class="card-title">
        <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)}</a>
      </h3>
      <p class="card-excerpt">${escapeHTML(item.note || "")}</p>
      <div class="card-meta">
        <span class="card-date">${escapeHTML(item.date)}</span>
      </div>
    </article>`
    )
    .join("");
}

function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");
  if (!projects.length) {
    grid.innerHTML = `<p class="empty-state">暂无项目。编辑 <code>data/projects.json</code> 添加代码作品。</p>`;
    return;
  }

  grid.innerHTML = projects
    .map(
      (project) => `
    <article class="card">
      <div class="card-meta">
        <span class="card-date">${escapeHTML(project.date)}</span>
        ${project.status ? `<span class="card-tag">${escapeHTML(project.status)}</span>` : ""}
      </div>
      <h3 class="card-title">
        ${project.url ? `<a href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.name)}</a>` : escapeHTML(project.name)}
      </h3>
      <p class="card-excerpt">${escapeHTML(project.description)}</p>
      <div class="card-tech">
        ${(project.tech || []).map((t) => `<span class="tech-badge">${escapeHTML(t)}</span>`).join("")}
      </div>
      <div class="card-footer">
        ${project.url ? `<a class="card-link" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">查看项目 →</a>` : ""}
        ${project.demo ? `<a class="card-link" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">在线演示 →</a>` : ""}
      </div>
    </article>`
    )
    .join("");
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

async function init() {
  initTheme();
  renderProfile();

  const [notes, favorites, projects] = await Promise.all([
    loadJSON("data/notes.json"),
    loadJSON("data/favorites.json"),
    loadJSON("data/projects.json"),
  ]);

  renderNotes(notes);
  renderFavorites(favorites);
  renderProjects(projects);
}

init();