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

这个 demo 是纯静态网页，没有数据库。

你在网页端添加、修改、删除的内容会保存在当前浏览器的 `localStorage` 中。

这意味着：

- 换电脑或换浏览器后，看不到之前编辑的内容。
- 清理浏览器缓存可能会删除数据。
- 建议经常使用左侧的“导出数据”保存 JSON 备份。
- 在新设备上可以用“导入数据”恢复内容。

如果以后想实现真正的跨设备同步，需要接入后端数据库，例如 Firebase、Supabase、GitHub API 或自己写服务器。
