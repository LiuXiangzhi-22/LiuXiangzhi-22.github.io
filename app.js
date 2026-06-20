const STORAGE_KEY = "mercurys-lab-data-v1";
const THEME_KEY = "mercurys-lab-theme";

const defaultData = {
  study: [
    {
      id: crypto.randomUUID(),
      title: "PTE Write Essay 模板",
      type: "PTE模板",
      date: "",
      content:
        "Introduction: Nowadays, [topic] has become a common issue in modern society.\n\nBody 1: First of all, it can bring many benefits because...\n\nBody 2: Moreover, it may also create some problems such as...\n\nConclusion: In conclusion, I believe [your opinion] because it is more practical and useful."
    },
    {
      id: crypto.randomUUID(),
      title: "PTE Describe Image 流程",
      type: "PTE模板",
      date: "",
      content:
        "The image shows information about ...\nThe highest point is ...\nThe lowest point is ...\nOverall, the image is clear and useful."
    },
    {
      id: crypto.randomUUID(),
      title: "Programming 2 Assignment 1",
      type: "学习计划",
      date: "2026-06-30",
      content: "完成 Albums Archive 1.0：菜单、CSV读取、显示、添加、标记完成、保存退出。"
    }
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Albums Archive 1.0",
      language: "Python",
      url: "https://github.com/",
      content: "一个使用 CSV 管理专辑列表的命令行 Python 程序。"
    },
    {
      id: crypto.randomUUID(),
      title: "Mercury's Lab",
      language: "HTML / CSS / JavaScript",
      url: "",
      content: "我的个人数字学习房间网页。"
    }
  ],
  calendar: [
    {
      id: crypto.randomUUID(),
      title: "AI Ethics 考试",
      date: "2026-06-24",
      category: "考试",
      content: "复习重点概念，提前准备。"
    },
    {
      id: crypto.randomUUID(),
      title: "Deep Learning Report Formal I",
      date: "2026-06-29",
      category: "作业",
      content: "完成 Research Report Formal I。"
    }
  ],
  gallery: [
    {
      id: crypto.randomUUID(),
      title: "Study Desk",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      content: "我的学习空间灵感图。"
    },
    {
      id: crypto.randomUUID(),
      title: "AI Lab Mood",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      content: "适合做项目时看的科技感图片。"
    }
  ],
  quotes: [
    {
      id: crypto.randomUUID(),
      title: "Small steps",
      author: "Mercury's Lab",
      content: "Small steps also count. Finish one small thing today."
    },
    {
      id: crypto.randomUUID(),
      title: "Keep going",
      author: "Unknown",
      content: "You do not need to be perfect. You only need to keep moving."
    },
    {
      id: crypto.randomUUID(),
      title: "Learning",
      author: "Unknown",
      content: "A little progress every day becomes a big result."
    }
  ],
  memos: [
    {
      id: crypto.randomUUID(),
      title: "今日待办",
      tag: "Daily",
      content: "1. 复习 PTE 模板\n2. 写一点 Programming 作业\n3. 整理 report 资料"
    }
  ],
  recipes: [
    {
      id: crypto.randomUUID(),
      title: "番茄鸡蛋面",
      time: "15分钟",
      content:
        "材料：番茄、鸡蛋、面条、葱。\n步骤：先炒鸡蛋，再炒番茄，加水煮开，下面条，最后调味。"
    },
    {
      id: crypto.randomUUID(),
      title: "空气炸锅鸡翅",
      time: "25分钟",
      content:
        "材料：鸡翅、生抽、蚝油、黑胡椒、蒜粉。\n步骤：腌制后放入空气炸锅，180度约20-25分钟，中途翻面。"
    }
  ]
};

const moduleConfig = {
  study: {
    name: "学习内容",
    listId: "studyList",
    searchId: "studySearch",
    fields: [
      { name: "title", label: "标题", type: "text", required: true },
      { name: "type", label: "类型", type: "text", placeholder: "例如：PTE模板 / 学习计划" },
      { name: "date", label: "日期/截止日期", type: "date" },
      { name: "content", label: "内容", type: "textarea", required: true }
    ],
    card: item => `
      <article class="item-card">
        <div class="meta">${escapeHTML(item.type || "学习")}${item.date ? " · " + formatDate(item.date) : ""}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.content)}</p>
        ${cardActions("study", item.id)}
      </article>
    `
  },
  projects: {
    name: "编程项目",
    listId: "projectsList",
    searchId: "projectsSearch",
    fields: [
      { name: "title", label: "项目名称", type: "text", required: true },
      { name: "language", label: "技术/语言", type: "text", placeholder: "例如：Python / JavaScript" },
      { name: "url", label: "GitHub链接", type: "url", placeholder: "https://github.com/..." },
      { name: "content", label: "项目说明", type: "textarea", required: true }
    ],
    card: item => `
      <article class="item-card">
        <div class="meta">${escapeHTML(item.language || "Project")}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.content)}</p>
        <div class="card-actions">
          ${item.url ? `<a class="link-btn" href="${escapeAttr(item.url)}" target="_blank" rel="noreferrer">打开项目</a>` : "<span></span>"}
          <span>
            <button class="edit-btn" data-edit="projects" data-id="${item.id}">编辑</button>
            <button class="danger-btn" data-delete="projects" data-id="${item.id}">删除</button>
          </span>
        </div>
      </article>
    `
  },
  calendar: {
    name: "日期提醒",
    listId: "calendarList",
    searchId: "calendarSearch",
    fields: [
      { name: "title", label: "提醒标题", type: "text", required: true },
      { name: "date", label: "日期", type: "date", required: true },
      { name: "category", label: "分类", type: "text", placeholder: "例如：考试 / 作业 / 生活" },
      { name: "content", label: "说明", type: "textarea" }
    ],
    card: item => {
      const days = daysUntil(item.date);
      return `
        <article class="item-card">
          <div class="meta">${escapeHTML(item.category || "提醒")} · ${formatDate(item.date)} · ${daysText(days)}</div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.content || "无说明")}</p>
          ${cardActions("calendar", item.id)}
        </article>
      `;
    }
  },
  gallery: {
    name: "图片",
    listId: "galleryList",
    searchId: "gallerySearch",
    fields: [
      { name: "title", label: "图片标题", type: "text", required: true },
      { name: "image", label: "图片链接/本地路径", type: "text", required: true, placeholder: "https://... 或 assets/photo.jpg" },
      { name: "content", label: "图片说明", type: "textarea" }
    ],
    card: item => `
      <article class="gallery-card">
        <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" onerror="this.src=''; this.alt='图片加载失败，请检查链接或路径';" />
        <div class="gallery-body">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.content || "")}</p>
          <div class="card-actions">
            <span></span>
            <span>
              <button class="edit-btn" data-edit="gallery" data-id="${item.id}">编辑</button>
              <button class="danger-btn" data-delete="gallery" data-id="${item.id}">删除</button>
            </span>
          </div>
        </div>
      </article>
    `
  },
  quotes: {
    name: "句子",
    listId: "quotesList",
    searchId: "quotesSearch",
    fields: [
      { name: "title", label: "标题", type: "text", required: true },
      { name: "author", label: "作者/来源", type: "text" },
      { name: "content", label: "句子内容", type: "textarea", required: true }
    ],
    card: item => `
      <article class="item-card">
        <div class="meta">${escapeHTML(item.author || "Unknown")}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>“${escapeHTML(item.content)}”</p>
        ${cardActions("quotes", item.id)}
      </article>
    `
  },
  memos: {
    name: "备忘录",
    listId: "memosList",
    searchId: "memosSearch",
    fields: [
      { name: "title", label: "标题", type: "text", required: true },
      { name: "tag", label: "标签", type: "text", placeholder: "例如：Daily / School / Life" },
      { name: "content", label: "内容", type: "textarea", required: true }
    ],
    card: item => `
      <article class="item-card">
        <div class="meta">${escapeHTML(item.tag || "Memo")}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.content)}</p>
        ${cardActions("memos", item.id)}
      </article>
    `
  },
  recipes: {
    name: "菜谱",
    listId: "recipesList",
    searchId: "recipesSearch",
    fields: [
      { name: "title", label: "菜名", type: "text", required: true },
      { name: "time", label: "用时", type: "text", placeholder: "例如：20分钟" },
      { name: "content", label: "材料和步骤", type: "textarea", required: true }
    ],
    card: item => `
      <article class="item-card">
        <div class="meta">${escapeHTML(item.time || "Recipe")}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.content)}</p>
        ${cardActions("recipes", item.id)}
      </article>
    `
  }
};

let data = loadData();
let editing = { module: null, id: null };

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultData);

  try {
    const parsed = JSON.parse(saved);
    return { ...structuredClone(defaultData), ...parsed };
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
  renderAll();
}

function cardActions(moduleName, id) {
  return `
    <div class="card-actions">
      <span></span>
      <span>
        <button class="edit-btn" data-edit="${moduleName}" data-id="${id}">编辑</button>
        <button class="danger-btn" data-delete="${moduleName}" data-id="${id}">删除</button>
      </span>
    </div>
  `;
}

function renderModule(moduleName) {
  const config = moduleConfig[moduleName];
  const container = document.getElementById(config.listId);
  const search = document.getElementById(config.searchId)?.value.trim().toLowerCase() || "";

  let items = [...data[moduleName]];
  if (moduleName === "calendar") {
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  const filtered = items.filter(item => JSON.stringify(item).toLowerCase().includes(search));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">暂时没有内容，点击右上角添加。</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => config.card(item)).join("");
}

function renderStats() {
  const stats = [
    ["学习内容", data.study.length, "📚"],
    ["编程项目", data.projects.length, "💻"],
    ["日期提醒", data.calendar.length, "📅"],
    ["菜谱收藏", data.recipes.length, "🍜"]
  ];

  document.getElementById("statsGrid").innerHTML = stats.map(([label, number, icon]) => `
    <div class="stat-card">
      <strong>${icon} ${number}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderRandomQuote() {
  const quotes = data.quotes;
  const target = document.getElementById("randomQuoteText");
  if (!quotes.length) {
    target.textContent = "还没有句子。去“随机句子”模块添加一句吧。";
    return;
  }
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  target.textContent = `“${random.content}” — ${random.author || "Unknown"}`;
}

function renderUpcoming() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = data.calendar
    .filter(item => item.date)
    .map(item => ({ ...item, days: daysUntil(item.date) }))
    .sort((a, b) => a.days - b.days)
    .slice(0, 5);

  const container = document.getElementById("upcomingList");

  if (!upcoming.length) {
    container.innerHTML = `<div class="empty-state">暂无提醒。</div>`;
    return;
  }

  container.innerHTML = upcoming.map(item => `
    <div class="mini-item">
      <strong>${escapeHTML(item.title)}</strong>
      <span>${formatDate(item.date)} · ${daysText(item.days)}</span>
    </div>
  `).join("");
}

function renderAll() {
  Object.keys(moduleConfig).forEach(renderModule);
  renderStats();
  renderUpcoming();
}

function openEditor(moduleName, id = null) {
  const config = moduleConfig[moduleName];
  const item = id ? data[moduleName].find(entry => entry.id === id) : {};

  editing = { module: moduleName, id };
  document.getElementById("dialogTitle").textContent = id ? `编辑${config.name}` : `添加${config.name}`;

  document.getElementById("formFields").innerHTML = config.fields.map(field => {
    const value = item?.[field.name] || "";
    const required = field.required ? "required" : "";
    const placeholder = field.placeholder ? `placeholder="${escapeAttr(field.placeholder)}"` : "";

    if (field.type === "textarea") {
      return `
        <div class="field">
          <label for="${field.name}">${field.label}</label>
          <textarea id="${field.name}" name="${field.name}" ${required} ${placeholder}>${escapeHTML(value)}</textarea>
        </div>
      `;
    }

    return `
      <div class="field">
        <label for="${field.name}">${field.label}</label>
        <input id="${field.name}" name="${field.name}" type="${field.type}" value="${escapeAttr(value)}" ${required} ${placeholder} />
      </div>
    `;
  }).join("");

  document.getElementById("editorDialog").showModal();
}

function closeEditor() {
  document.getElementById("editorDialog").close();
  editing = { module: null, id: null };
}

function handleSave(event) {
  event.preventDefault();
  const { module: moduleName, id } = editing;
  const config = moduleConfig[moduleName];
  const formData = new FormData(event.currentTarget);

  const item = { id: id || crypto.randomUUID() };
  config.fields.forEach(field => {
    item[field.name] = String(formData.get(field.name) || "").trim();
  });

  if (id) {
    data[moduleName] = data[moduleName].map(entry => entry.id === id ? item : entry);
  } else {
    data[moduleName].unshift(item);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
  closeEditor();
  renderAll();
}

function deleteItem(moduleName, id) {
  const config = moduleConfig[moduleName];
  const item = data[moduleName].find(entry => entry.id === id);
  if (!item) return;

  if (confirm(`确定删除“${item.title || config.name}”吗？`)) {
    data[moduleName] = data[moduleName].filter(entry => entry.id !== id);
    saveData();
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mercurys-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = event => {
    try {
      const imported = JSON.parse(event.target.result);
      data = { ...structuredClone(defaultData), ...imported };
      saveData();
      alert("导入成功！");
    } catch {
      alert("导入失败：请选择正确的 JSON 备份文件。");
    }
  };
  reader.readAsText(file);
}

function daysUntil(dateString) {
  const target = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function daysText(days) {
  if (Number.isNaN(days)) return "未设置日期";
  if (days > 0) return `还有 ${days} 天`;
  if (days === 0) return "就是今天";
  return `已过去 ${Math.abs(days)} 天`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value).replaceAll("\n", " ");
}

function initSectionHeaders() {
  customElements.define("section-header", class extends HTMLElement {
    connectedCallback() {
      const template = document.getElementById("sectionHeaderTemplate");
      const clone = template.content.cloneNode(true);
      clone.querySelector("h2").textContent = this.getAttribute("title") || "";
      this.replaceWith(clone);
    }
  });
}

function initEvents() {
  document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.section).classList.add("active");
    });
  });

  document.addEventListener("click", event => {
    const addBtn = event.target.closest("[data-add]");
    const editBtn = event.target.closest("[data-edit]");
    const deleteBtn = event.target.closest("[data-delete]");

    if (addBtn) openEditor(addBtn.dataset.add);
    if (editBtn) openEditor(editBtn.dataset.edit, editBtn.dataset.id);
    if (deleteBtn) deleteItem(deleteBtn.dataset.delete, deleteBtn.dataset.id);
  });

  Object.values(moduleConfig).forEach(config => {
    document.getElementById(config.searchId)?.addEventListener("input", () => {
      const moduleName = Object.keys(moduleConfig).find(key => moduleConfig[key] === config);
      renderModule(moduleName);
    });
  });

  document.getElementById("editorForm").addEventListener("submit", handleSave);
  document.getElementById("closeDialog").addEventListener("click", closeEditor);
  document.getElementById("cancelDialog").addEventListener("click", closeEditor);
  document.getElementById("randomQuoteBtn").addEventListener("click", renderRandomQuote);
  document.getElementById("exportBtn").addEventListener("click", exportData);
  document.getElementById("importInput").addEventListener("change", event => importData(event.target.files[0]));

  document.getElementById("themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    localStorage.setItem(THEME_KEY, document.documentElement.classList.contains("light") ? "light" : "dark");
  });
}

function initTheme() {
  if (localStorage.getItem(THEME_KEY) === "light") {
    document.documentElement.classList.add("light");
  }
}

initTheme();
initSectionHeaders();
initEvents();
renderAll();
renderRandomQuote();
