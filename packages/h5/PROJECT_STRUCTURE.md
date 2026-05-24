# GHS-M H5 项目完整结构分析

## 📋 项目概述

**项目名称**: test-table (God Honor Shine - H5 版本)  
**技术栈**: Vue 3 + TypeScript + Vite + UnoCSS  
**包管理**: pnpm 8.1.1  
**开发端口**: 3681  
**目标**: 多媒体内容管理和展示平台（漫画、视频、图片等）

---

## 🗂️ 完整目录结构

```
src/
├── api/                          # API 接口定义层
│   └── index.ts                  # 所有 API 调用函数
├── components/                   # 可复用 Vue 组件
│   ├── bottom-menus/
│   │   └── ghs-bottom-menus.vue  # 底部导航栏（Tabbar）
│   ├── comment/                  # 评论组件
│   ├── dialog/
│   │   └── ghs-dialog.vue        # 自定义对话框容器
│   ├── image/
│   │   ├── component/
│   │   ├── ghs-img.vue           # 图片加载与显示组件
│   │   ├── ghs-img-plain.vue     # 简化图片组件
│   │   ├── hooks/
│   │   └── loading.gif
│   ├── imgViewer/                # 图片查看器组件
│   ├── item/
│   │   └── ghs-item.vue          # 内容项卡片（封面+标题+标签+收藏）
│   ├── menu/
│   │   └── ghs-menu.vue          # 菜单切换组件
│   ├── pagination/
│   │   └── ghs-pagination.vue    # 分页组件
│   ├── player/
│   │   ├── ghs-player.vue        # 视频播放器主组件
│   │   ├── ghs-player-comments.vue
│   │   ├── ghs-player-series.vue # 系列播放列表
│   │   ├── video-html5.vue       # HTML5视频播放
│   │   └── types.ts              # 类型定义
│   ├── scroller/
│   │   └── ghs-scroller.vue      # 可滚动容器
│   ├── search/
│   │   └── search.vue            # 搜索框与搜索历史
│   ├── tag/
│   │   └── ghs-tag.vue           # 标签组件
│   └── text/
│       └── ghs-text.vue          # 文本展示组件
├── hook/                         # Vue 3 Composition API Hooks
│   ├── use-collect.ts            # 收藏管理 Hook
│   ├── use-feature.ts            # 内容详情展示 Hook
│   ├── use-global-ref.ts         # 全局 Ref 管理
│   ├── use-page-state.ts         # 页面状态管理 Hook
│   ├── useGlobalState.ts         # 全局状态 (Reactive)
│   ├── useInitData.ts            # 初始化数据 Hook
│   └── useItemPages.ts           # 项目列表 Hook
├── views/                        # 页面组件
│   ├── item-pages.vue            # 主内容列表页面
│   └── components/
│       ├── collect-view.vue      # 收藏列表视图
│       ├── history-view.vue      # 浏览历史视图
│       └── tags-view.vue         # 标签筛选视图
├── router/                       # 路由配置
│   ├── router.ts                 # 路由定义与动态路由加载
│   └── guard.ts                  # 路由守卫（进度条）
├── utils/                        # 工具函数
│   ├── kit-util.ts               # UI 工具函数（消息提示、宽度适配）
│   ├── nprogress.ts              # 进度条配置
│   └── request.ts                # Axios 请求封装
├── styles/                       # 样式文件
│   └── values.less               # 样式变量定义
├── assets/                       # 静态资源
├── App.vue                       # 应用根组件
├── main.ts                       # 应用入口
├── index.css                     # 全局样式
└── README.md
```

---

## 🔌 API 接口定义 (api/index.ts)

### 配置管理
```typescript
// 获取所有网站配置
listAllWebConfigs(): Promise<WebConfig[]>

// 获取当前网站配置
getCurrentWebConfig(webKey: string): Promise<WebConfig>
```

### 页面加载
```typescript
// 获取主页面数据
getPage(webKey: string): Promise<any>

// 加载指定 URL 的页面
loadPage(url: string): Promise<any>

// 获取详情页数据
getDetailPage(item: Item): Promise<any>

// 获取 HTML 内容
getHtml(url: string): Promise<any>
```

### 搜索与推荐
```typescript
// 搜索内容
search(search: string, item: Item): Promise<any>

// 获取搜索推荐
searchRecommend(search: string): Promise<any>

// 删除搜索记录
deleteSearch(searchValue: string): Promise<any>
```

### 收藏管理
```typescript
// 检查是否已收藏
isCollect(item: Item): Promise<any>

// 保存收藏
saveCollect(item: Item): Promise<any>

// 取消收藏
cancelCollect(item: Item): Promise<any>

// 获取收藏列表
listCollect(webKey: string): Promise<any>
```

### 媒体处理
```typescript
// 获取视频代理 URL
getVideoUrl(url: string): string

// 获取图片
getImage(url: string): Promise<any>

// 清理指定文件后缀的缓存
cacheSuffixClean(fileSuffix: string): Promise<any>
```

---

## 📦 主要组件功能

### 1. **底部导航 (bottom-menus/ghs-bottom-menus.vue)**
- 使用 Vant Tabbar 组件
- 四个主要标签页：
  - **首页** (home): 主内容列表
  - **收藏** (collect): 收藏内容管理
  - **历史** (history): 浏览历史记录
  - **标签** (tags): 标签分类筛选

### 2. **内容项卡片 (item/ghs-item.vue)**
核心展示组件，显示：
- 封面图片 (coverImg)
- 内容标题 (title)
- 标签列表 (tags)
- 星标收藏按钮（切换收藏状态）
- 支持删除按钮（可选）

### 3. **菜单切换 (menu/ghs-menu.vue)**
- 显示所有可用的网站/分类菜单
- 支持网站图标显示
- 切换网站时清空当前 URL 并重新加载

### 4. **搜索框 (search/search.vue)**
- 支持输入搜索
- 实时显示搜索历史与推荐
- 可删除单条搜索历史
- 回车键或点击触发搜索

### 5. **分页组件 (pagination/ghs-pagination.vue)**
- 显示所有分页选项
- 高亮当前页
- 预加载下一页 HTML
- 支持快速跳转

### 6. **视频播放器 (player/ghs-player.vue)**
多功能视频播放器：
- 支持 MP4 和 M3U8 格式
- 多清晰度切换
- 评论显示
- 系列播放列表支持
- 质量标签动态显示

### 7. **图片查看器 (imgViewer/)**
- 图片浏览与放大
- 支持多图片切换

### 8. **标签组件 (tag/ghs-tag.vue)**
- 显示内容分类标签
- 支持不同类型样式

---

## 🎯 View 页面结构

### **item-pages.vue** (主页面)
核心布局：
```
┌─────────────────────────────────┐
│  搜索框  │  菜单按钮  │  分页按钮  │ (固定头部)
├─────────────────────────────────┤
│                                   │
│   GhsItem 内容网格 (瀑布流)        │ (可滚动内容区)
│   - 动态宽高适配                  │
│   - 响应式布局                    │
│   - 无限滚动                      │
│                                   │
│                                   │
├─────────────────────────────────┤
│         底部 Tabbar 导航           │
└─────────────────────────────────┘
```

功能流程：
1. 页面挂载 → 初始化数据 → 加载首页内容
2. 点击菜单 → 切换 webKey → 重新加载内容
3. 搜索 → 调用搜索 API → 显示搜索结果
4. 分页 → 加载新内容
5. 点击项目 → 显示详情（视频/图片/漫画）

### **子视图组件**

#### **collect-view.vue** (收藏视图)
- 展示所有已收藏的内容
- 使用 GhsItem 组件
- 支持删除收藏
- 点击可查看详情

#### **history-view.vue** (历史视图)
- 显示浏览历史
- 按时间顺序排列

#### **tags-view.vue** (标签视图)
- 标签分类筛选
- 按标签加载内容

---

## 🎣 Hooks 体系

### **useGlobalState.ts** (全局状态)
中央状态管理库：
```typescript
// 网站配置
allWebKeys: Ref<string[]>        // 所有网站 Key
webKey: Ref<string>              // 当前网站 Key
webConfig: Ref<BaseConfig>       // 当前网站配置
webConfigs: Ref<BaseConfig[]>    // 所有网站配置

// 页面内容
pagination: Ref<Pagination[]>    // 分页信息
items: Ref<Item[]>               // 内容列表
tags: Ref<Tag[]>                 // 标签列表
urlReplace: Ref<UrlReplace[]>    // URL 替换规则
currentUrl: Ref<any>             // 当前页面 URL

// UI 状态
loading: Ref<boolean>            // 加载中
drawerOpen: Ref<boolean>         // 抽屉打开
active: Ref<string>              // 当前活跃标签
segmentedValue: Ref<SetTag>      // 标签分段器
segmentedData: Computed           // 可用标签选项

// 用户数据
collects: Ref<CollectEntity[]>   // 收藏列表
currentCode: Ref<any>            // 当前代码
```

### **useInitData.ts** (初始化 Hook)
- 页面挂载时加载所有网站配置
- 设置默认 webKey

### **useItemPages.ts** (项目列表 Hook)
- 简单包装，返回项目列表 Ref

### **use-page-state.ts** (页面状态 Hook)
**核心业务逻辑**：
```typescript
// 加载页面数据
load(url: string): Promise<void>
  ├─ 检查 webKey 有效性
  ├─ 调用 API (getPage 或 loadPage)
  ├─ 设置 pagination, items, tags, urlReplace
  ├─ 显示加载状态
  └─ 自动滚动到顶部

// 分页处理
handlePageClick(item: Pagination): Promise<void>

// 搜索处理
handleSearch(value: string): Promise<void>

// 缓存管理
clearCache(suffix: string): Promise<void>
  ├─ 调用清理 API
  └─ 自动刷新页面

// 刷新
refresh(): Promise<void>
```

### **use-feature.ts** (功能 Hook)
**内容展示业务逻辑**：
```typescript
showDetail(item: Item): Promise<void>
  ├─ 调用 API 获取详情
  ├─ 根据 detailType 显示对应形式:
  │  ├─ mp4/m3u8 → 视频播放器
  │  ├─ image → 图片查看器
  │  ├─ comic → 漫画阅读器
  │  └─ series → 系列播放列表
  └─ 处理错误情况
```

### **use-collect.ts** (收藏管理 Hook)
```typescript
updateCollects(): Promise<void>  // 从 API 获取收藏列表
getCollect(): Ref<CollectEntity[]>
// 页面挂载时自动更新收藏列表
```

### **use-global-ref.ts** (全局 Ref)
管理全局组件实例引用：
```typescript
imgViewerRef      // 图片查看器引用
videoGlobalRef    // 视频播放器引用
webConfigRef      // 网站配置组件引用
logRef            // 日志组件引用
```

---

## 🛣️ 路由配置 (router/)

### **router.ts** (路由定义)
```typescript
// 静态路由
staticRoutes = [
  {
    path: '/comic-reader',
    name: 'comic-reader',
    component: item-pages.vue
  },
  {
    path: '/',
    name: 'hHome',
    component: item-pages.vue
  }
]

// 动态路由注册
// 从 API 加载所有网站配置
// 为每个网站动态创建路由: /{webKey}
// 全部指向 item-pages.vue
```

### **guard.ts** (路由守卫)
- 路由前进：启动进度条 (nprogress.start())
- 路由完成：关闭进度条 (nprogress.done())

---

## 🔧 工具函数 (utils/)

### **request.ts** (HTTP 请求)
```typescript
// Axios 实例配置
baseURL: '/api' (开发) | '' (生产)
timeout: 10000ms

// 请求拦截
// - 原样通过

// 响应拦截
// - 自动提取 response.data

// 导出函数
get(url, params): Promise<any>
post(url, data): Promise<any>

// 环境判断
isDev: boolean  // NODE_ENV === 'development'
```

### **kit-util.ts** (UI 工具)
```typescript
// 设备检测
isMobile: boolean    // screenWidth <= 768px

// 宽度适配
calcWidthAdapter(source, target): number
calcH5Width(width): string
widthAdapter(width): number

// 消息提示
message.success(msg)
message.error(msg)
message.warn(msg)
// 基于 Vant showNotify()
```

### **nprogress.ts** (进度条)
```typescript
import NProgress from 'nprogress'
配置: showSpinner: false  // 禁用右侧进度环
```

---

## 📄 核心入口文件

### **main.ts** (应用入口)
```typescript
// 1. 创建 Vue 应用
const app = createApp(App)

// 2. 注册 Vant 组件
app.use(Button)
   .use(ConfigProvider)
   .use(FloatingBubble)
   .use(Tabbar)
   .use(TabbarItem)
   .use(Icon)
   .use(Notify)
   .use(Dialog)
   .use(Popup)
   .use(Search)
   .use(Tab)
   .use(Tabs)
   .use(Empty)
   .use(Loading)

// 3. 注册路由
registerRouter(app)

// 4. 挂载应用
app.mount('#app')
```

### **App.vue** (根组件)
```vue
<template>
  <van-config-provider>
    <div class="app-container">
      <router-view></router-view>
    </div>
    
    <!-- 全局组件实例 -->
    <GhsPlayer ref="videoGlobalRef"></GhsPlayer>
    <ImgViewer ref="imgViewerRef"></ImgViewer>
    
    <!-- 全局加载遮罩 -->
    <div v-if="loading" class="loading-overlay">
      <van-loading size="24" />
    </div>
  </van-config-provider>
</template>

<script setup>
  // 初始化数据
  useInitData()
</script>
```

---

## 📊 应用功能与数据流

### 功能清单
✅ **内容浏览**: 网格式瀑布流展示  
✅ **搜索功能**: 实时推荐与历史记录  
✅ **分页导航**: 快速跳转到任意分页  
✅ **收藏管理**: 保存/删除收藏  
✅ **历史记录**: 浏览历史追踪  
✅ **标签筛选**: 按标签分类浏览  
✅ **视频播放**: 支持 MP4、M3U8、多清晰度  
✅ **图片查看**: 图片浏览与放大  
✅ **漫画阅读**: 专用漫画阅读器  
✅ **系列播放**: 视频系列播放列表  
✅ **多网站**: 动态切换多个内容源  

### 主要数据流

```
应用启动
  ↓
[App.vue] useInitData() 初始化
  ↓
加载所有网站配置 (listAllWebConfigs)
  ↓
设置默认 webKey
  ↓
[item-pages.vue] 挂载
  ├─ watchEffect 监听 webKey 变化
  │ ├─ init() → getCurrentWebConfig
  │ ├─ load() → getPage 加载首页内容
  │ └─ updateCollects() → listCollect 加载收藏
  ↓
用户交互
  ├─ 点击菜单 → 更新 webKey → 重新加载
  ├─ 搜索 → handleSearch → load(searchUrl)
  ├─ 分页 → handlePageClick → load(pageUrl)
  ├─ 点击项目 → showDetail(item) → getDetailPage
  │ ├─ 视频 → videoGlobalRef.show() 或 showWithTag()
  │ ├─ 图片 → imgViewerRef.show()
  │ ├─ 漫画 → 跳转到 /comic-reader
  │ └─ 系列 → videoGlobalRef.showSeries()
  └─ 收藏/历史/标签切换 → 更新 active
```

### 请求响应流程

```
API 调用 (request.ts)
  ↓
Axios 实例
  ├─ 请求拦截: config 通过
  ├─ 发送请求到 /api/{endpoint}
  ├─ 服务器响应
  └─ 响应拦截: 提取 response.data
    ↓
返回数据给组件
  ↓
Hook 或 Component 处理
  ├─ 更新全局状态 (useGlobalState)
  ├─ 重新渲染
  └─ 用户交互响应
```

---

## 💾 数据结构 (from @ghs/types)

### Item (内容项)
```typescript
{
  coverImg: string       // 封面图片 URL
  title: string          // 标题
  jumpUrl: string        // 点击跳转 URL
  tags?: Tag[]           // 标签列表
}
```

### WebConfig (网站配置)
```typescript
{
  key: string            // 网站唯一标识
  name: string           // 网站名称
  favicon?: string       // 网站图标 URL
  homeUrl: string        // 主页 URL
  imgWidth: string       // 推荐图片宽度
  imgHeight: string      // 推荐图片高度
  setTags?: SetTag[]     // 标签分段器选项
}
```

### DetailInfo (详情信息)
```typescript
{
  detailType: 'mp4' | 'm3u8' | 'image' | 'comic' | 'series' | 'win'
  details: Detail[]      // 详情内容数组
  comments?: Comment[]   // 评论
  analysis?: Analysis[]  // 系列分析 (仅 series)
}
```

### Detail (单个详情)
```typescript
{
  url: string            // 媒体 URL
  title?: string         // 标题
  quality?: string       // 清晰度 (视频)
  comments?: Comment[]   // 评论
}
```

---

## 🎨 设计亮点

### 1. **动态路由系统**
- 网站配置动态加载
- 自动为每个网站创建路由
- 支持灵活扩展新网站

### 2. **全局状态管理**
- 无 Vuex/Pinia，使用 Composition API
- 集中式响应式状态 (useGlobalState)
- 简洁高效的数据共享

### 3. **模块化组件设计**
- 单一职责原则
- 支持 Props 和事件通信
- 可复用性强

### 4. **响应式宽度适配**
- 根据屏幕宽度动态调整项目大小
- 移动端和桌面端自适应
- 统一的适配工具函数

### 5. **智能加载**
- 预加载下一页数据
- 路由进度条提示
- 全局加载遮罩

### 6. **搜索体验**
- 搜索推荐与历史记录
- 可删除单条历史
- 实时反应

---

## 🚀 开发和构建

### 开发模式
```bash
pnpm dev
# 访问: http://localhost:3681
```

### 生产构建
```bash
pnpm build
# 输出: dist/
```

### Vite 配置
- 路径别名: `@` → `src/`
- API 代理: `/api` → `http://localhost:4000`
- CSS 预处理: Less
- 样式工具: UnoCSS (原子化 CSS)
- Vue 支持: @vitejs/plugin-vue

---

## 📦 依赖概览

### 核心框架
- **vue**: 3.2.45 - 渐进式框架
- **vue-router**: 4.1.5 - 路由管理
- **@vitejs/plugin-vue**: Vue 编译支持

### UI 组件库
- **vant**: 4.9.7 - 移动端 UI 组件库
- **vant** 包含: Button, Tabbar, Popup, Dialog, 等

### 工具库
- **axios**: 1.7.7 - HTTP 请求
- **lodash**: 4.17.21 - 函数工具库
- **@vueuse/core**: 10.10.0 - Vue 3 工具函数
- **@ilzf/utils**: 0.0.17 - 自定义工具库

### 媒体支持
- **hls.js**: 1.4.12 - HLS 流媒体播放
- **mui-player**: 1.8.1 - 音视频播放器
- **@jambonn/vue-lazyload**: 1.0.9 - 图片懒加载

### 其他
- **animate.css**: 4.1.1 - CSS 动画库
- **nprogress**: 0.2.0 - 页面进度条
- **typescript**: 4.9.3 - 类型检查
- **unocss**: 0.58.3 - 原子化 CSS

---

## 🎯 项目工作流总结

```
1️⃣ 应用启动
   └─ 加载网站配置

2️⃣ 用户浏览
   ├─ 选择网站菜单
   └─ 加载对应内容

3️⃣ 查看内容
   ├─ 搜索/分页/标签筛选
   └─ 浏览内容列表

4️⃣ 交互操作
   ├─ 收藏管理
   ├─ 历史记录
   └─ 播放/查看详情

5️⃣ 媒体展示
   ├─ 视频播放 (MP4/M3U8)
   ├─ 图片浏览
   ├─ 漫画阅读
   └─ 系列播放
```

---

## 📝 关键代码片段

### 搜索处理流程
```typescript
// use-page-state.ts
const handleSearch = async (value: string) => {
  if (items.value.length > 0) {
    await load(await search(value, items.value[0]));
  } else {
    await load(await search(value, null));
  }
};
```

### 详情展示逻辑
```typescript
// use-feature.ts
const showDetail = async (item: Item) => {
  const detail = await getDetailPage(item);
  
  if (detail.detailType === 'mp4' || detail.detailType === 'm3u8') {
    // 视频处理
    if (detail.details.length === 1) {
      videoGlobalRef.value.show(...);
    } else {
      videoGlobalRef.value.showWithTag(...);
    }
  } else if (detail.detailType === 'image') {
    imgViewerRef.value.show(detail.details);
  } else if (detail.detailType === 'comic') {
    await router.push({ path: '/comic-reader', query: { url: ... } });
  } else if (detail.detailType === 'series') {
    videoGlobalRef.value.showSeries(detail, item.title);
  }
};
```

### 收藏切换
```typescript
// ghs-item.vue
const toggleCollect = async () => {
  if (isCollect.value) {
    await cancelCollect(props.item);
  } else {
    await saveCollect(props.item);
  }
  await juCollect();  // 重新检查收藏状态
  emits('upCollect');
};
```

---

这是对 **ghs-m H5 项目** 的完整结构分析。该项目是一个功能完整的多媒体内容管理平台，具有现代化的 Vue 3 架构、灵活的动态路由系统、以及良好的模块化设计。
