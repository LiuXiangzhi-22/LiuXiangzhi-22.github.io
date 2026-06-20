# Mercury's Lab Demo

这是一个适合 GitHub Pages 发布的个人数字学习房间网页。

## 功能

- 学习计划 / PTE 模板
- 编程作品 / GitHub 项目
- 日历 / 日期提醒
- 图片展示
- 随机句子 / 鼓励 / 名言
- 备忘录
- 收集的菜谱
- 所有模块都支持网页端新增、编辑、删除
- 支持深色/浅色模式
- 支持导出/导入 JSON 备份

## 使用方法

1. 解压这个文件夹。
2. 把 `index.html`、`style.css`、`app.js` 上传到你的 GitHub 仓库根目录。
3. 在 GitHub 仓库中打开：
   - Settings
   - Pages
   - Build and deployment
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main` 和 `/root`
4. 保存后等待一会儿，GitHub 会生成你的网页地址。

## 重要说明

这个网页是纯静态网页，发布在 GitHub Pages 上；数据同步使用 Supabase。

未登录时，网页端添加、修改、删除的内容会保存在当前浏览器的 `localStorage` 中。

登录 Supabase 后，网页会把数据保存到云端表 `mercury_lab_data`，同一个邮箱账号在不同设备登录后可以看到同一份内容。

## Supabase 设置

在 Supabase 项目的 SQL Editor 里运行下面这段 SQL：

```sql
create table if not exists public.mercury_lab_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.mercury_lab_data enable row level security;

create policy "Users can read their own Mercury Lab data"
on public.mercury_lab_data
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own Mercury Lab data"
on public.mercury_lab_data
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own Mercury Lab data"
on public.mercury_lab_data
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

然后在 Supabase 的 Authentication 设置里确认：

- Email 登录已开启。
- Site URL 设置为你的 GitHub Pages 地址，例如 `https://liuxiangzhi-22.github.io`。
- Redirect URLs 里也加入同一个地址。

建议仍然偶尔使用左侧的“导出数据”保存 JSON 备份。
