## 1. 架构设计

```mermaid
flowchart TD
    subgraph "前端层"
        "React 18 应用" --> "页面路由"
        "页面路由" --> "首页"
        "页面路由" --> "小篆详情页"
        "页面路由" --> "大篆详情页"
        "页面路由" --> "鸟虫篆详情页"
    end
    subgraph "数据层"
        "本地 JSON 数据" --> "百家姓字库"
        "本地 JSON 数据" --> "篆体字形资源"
        "本地 JSON 数据" --> "历史背景文案"
    end
    subgraph "资源层"
        "SVG 字形路径" --> "小篆字形"
        "SVG 字形路径" --> "大篆字形"
        "SVG 字形路径" --> "鸟虫篆字形"
        "CSS 纹理" --> "宣纸/青铜背景"
    end
```

## 2. 技术说明
- **前端框架**:React@18 + tailwindcss@3 + vite
- **初始化工具**:vite-init(react-ts 模板)
- **路由**:react-router-dom@6
- **动画**:framer-motion@11(页面过渡、字形浮现、悬停效果)
- **后端**:无(纯前端静态站点)
- **数据库**:无(使用本地 JSON 数据文件)
- **字形资源**:由于真实篆体字形需专业字库支持,采用以下策略:
  - 使用 SVG 路径手绘核心百家姓汉字(精选 30-50 字)的三种篆体形态
  - 结合 CSS 滤镜与文字渲染模拟篆体视觉效果
  - 关键展示字采用高质量 SVG 矢量绘制

## 3. 路由定义

| 路由 | 用途 |
|-------|---------|
| `/` | 首页:三种篆体总览、导航、时间轴 |
| `/xiaozhuan` | 李斯小篆详情页:百家姓小篆字形展示与解析 |
| `/dazhuan` | 大篆(金文)详情页:百家姓金文字形展示与解析 |
| `/niaochongzhuan` | 鸟虫篆详情页:百家姓鸟虫篆字形展示与解析 |

## 4. 数据结构定义

### 4.1 百家姓字库数据结构
```typescript
interface SurnameCharacter {
  id: string;              // 唯一标识
  kaishu: string;          // 楷书字形(如"赵")
  pinyin: string;          // 拼音(如"zhào")
  meaning: string;         // 释义/姓氏来源
  xiaozhuan: string;       // 小篆 SVG 路径或字形标识
  dazhuan: string;         // 大篆/金文 SVG 路径或字形标识
  niaochongzhuan: string;  // 鸟虫篆 SVG 路径或字形标识
  structure: string;       // 字形结构说明(如"左右结构,从走肖声")
}

interface ScriptInfo {
  id: 'xiaozhuan' | 'dazhuan' | 'niaochongzhuan';
  name: string;            // 篆体名称
  era: string;             // 所属时代
  features: string;        // 艺术特征
  history: string;         // 历史背景
  representative: string;  // 代表性文物/作品
}
```

### 4.2 数据文件组织
- `src/data/surnames.ts`:百家姓字库(精选 30-50 字)
- `src/data/scripts.ts`:三种篆体元信息
- `src/components/svg/`:三种篆体的 SVG 字形组件
- `src/data/history.ts`:历史背景文案

## 5. 关键技术实现

### 5.1 篆体字形渲染策略
由于浏览器原生字体不支持篆体,采用三层方案:
1. **核心汉字**:手绘 SVG 路径,确保三种篆体形态准确
2. **辅助汉字**:使用 CSS `text-shadow` + `filter` 模拟篆体笔触
3. **装饰效果**:通过 SVG filter(墨晕、斑驳、金箔)增强质感

### 5.2 视觉效果实现
- 宣纸纹理:CSS `background-image` + SVG noise filter
- 青铜质感:渐变 + 噪点 + 内阴影
- 印章效果:CSS `clip-path` + `box-shadow` + 旋转
- 字形浮现:framer-motion 的 `whileInView` + `staggerChildren`

### 5.3 性能优化
- SVG 字形按需加载
- 图片资源懒加载
- 滚动动画使用 `IntersectionObserver`
- 字形网格虚拟化(如字库扩展到百家姓全量)
