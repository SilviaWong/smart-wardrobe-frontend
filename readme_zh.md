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

## 🔗 与后端对接指南

本项目前端默认连接 `http://localhost:8080/api`，可与 Spring Boot 或其他 REST 服务对接。下面以 Spring Boot 为例说明端到端配置步骤：

### 1. 约定接口路由

前端通过 `src/api/wardrobe.ts` 调用以下 REST 接口（均返回 `application/json`）：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/clothing` | 返回 `Clothing[]` 列表 |
| `POST` | `/clothing` | 创建衣物，Body 为 `Omit<Clothing, 'id' \| 'createTime'>` |
| `PUT` | `/clothing/{id}` | 更新衣物，Body 为局部字段 |
| `DELETE` | `/clothing/{id}` | 删除指定衣物 |

所有接口均需在成功时返回最新数据，并在发生错误时返回合适的 HTTP 状态码及错误信息。

### 2. Spring Boot 控制器示例

```java
@RestController
@RequestMapping("/api/clothing")
@CrossOrigin(origins = "http://localhost:5173")
public class ClothingController {
    private final ClothingService service;

    public ClothingController(ClothingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Clothing> findAll() {
        return service.findAll();
    }

    @PostMapping
    public Clothing create(@RequestBody @Valid ClothingRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public Clothing update(@PathVariable Long id, @RequestBody ClothingRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
```

> **提示**：`ClothingRequest` 应只包含可编辑字段（名称、类别、颜色、季节、标签、imageUrl），并由服务层统一生成 `id` 与 `createTime`。

### 3. 数据模型与示例响应

```json
// GET /api/clothing 响应示例
[
  {
    "id": 1,
    "name": "云感羽绒服",
    "category": "上衣",
    "color": "白色",
    "season": "冬季",
    "tags": "保暖/通勤",
    "imageUrl": "https://...",
    "createTime": "2024-11-30T10:00:00.000Z"
  }
]
```

POST/PUT 请求示例：

```json
{
  "name": "黑色高腰牛仔裤",
  "category": "裤子",
  "color": "黑色",
  "season": "四季",
  "tags": "百搭",
  "imageUrl": "https://..."
}
```

### 4. 跨域与部署

- 本地开发阶段需允许 `http://localhost:5173`（Vite 默认端口）跨域访问。
- 生产部署时建议将前后端托管在同一域名或通过反向代理（Nginx）转发到 `/api`，以避免额外的 CORS 配置。

### 5. 自定义接口地址

1. 在项目根目录创建 `.env` 或 `.env.local`，设置后端地址：

   ```env
   VITE_API_BASE_URL=https://your-domain.com/api
   ```

2. 重新启动前端开发服务器；或在设置页的「API Base URL」输入框中保存新的地址并刷新页面，即可让 Axios 客户端读取最新配置。

3. 若接口不可用，前端会在控制台输出错误并自动回退至内置示例数据，确保页面仍能展示内容。

## 📄 许可

MIT License © {{ new Date().getFullYear() }} Smart Wardrobe
