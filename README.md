# Smart Wardrobe Frontend

现代化的「智能电子衣橱」前端原型，基于 **Vue 3 + Vite + Tailwind CSS + Pinia + Vue Router + Motion One (Framer Motion)** 与 **Chart.js** 构建。提供衣物增删改查、统计可视化、深浅色主题切换等体验，可与 Spring Boot 等后端服务对接。

## ✨ 功能亮点

- 🧥 **衣物管理**：支持添加、编辑、删除衣物信息，包含类别、颜色、季节、标签、图片等字段。
- 📊 **数据统计**：顶部统计卡片与动态图表展示类别、颜色分布与偏好。
- 🌗 **主题切换**：一键切换浅色/深色主题，自动记忆偏好。
- 💫 **动效体验**：借助 Framer 团队的 Motion One 实现卡片、弹窗、图表的轻盈动效。
- 📱 **响应式设计**：最大宽度 1000px 的居中布局，在移动端自动调整为单列卡片。

## 🛠️ 技术栈

| 模块 | 技术 | 说明 |
| --- | --- | --- |
| 框架 | [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) | 现代化前端开发体验 |
| 状态管理 | [Pinia](https://pinia.vuejs.org/) | 统一管理衣物数据与统计信息 |
| 路由 | [Vue Router](https://router.vuejs.org/) | 多页面导航（衣橱 / 统计 / 设置）|
| 样式 | [Tailwind CSS](https://tailwindcss.com/) | 科技感主题与响应式布局 |
| 动画 | [@motionone/vue](https://motion.dev/) | Framer Motion 技术栈的 Vue 方案 |
| 图表 | [Chart.js](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/) | 类别/颜色占比图表 |
| 网络 | [Axios](https://axios-http.com/) | 调用后端 API |

## 📦 本地开发

```bash
# 安装依赖
yarn install # 或 npm install / pnpm install

# 启动开发服务器
yarn dev

# 构建生产包
yarn build

# 预览生产包
yarn preview
```

若需自定义后端接口地址，可在「设置」页面输入 `API Base URL` 并保存。

## 🔧 环境变量

在项目根目录创建 `.env` 文件，自定义接口地址：

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📚 目录结构

```
src/
├── api/               # Axios 请求封装
├── assets/            # 全局样式与资源
├── components/        # 复用组件（统计卡片、图表、弹窗等）
├── pages/             # 页面视图
├── router/            # 路由配置
├── store/             # Pinia store
└── types.ts           # 全局 TypeScript 接口定义
```

## 🤝 接口约定

```ts
interface Clothing {
  id: number
  name: string
  category: string
  color: string
  season: string
  tags?: string
  imageUrl?: string
  createTime: string
}
```

## 📄 许可

MIT License © {{ new Date().getFullYear() }} Smart Wardrobe
