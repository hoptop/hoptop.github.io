拆分完成！现在项目结构如下：

```
simpleweb/
├── index.html          # HTML 入口
├── styles.css          # 样式文件
└── js/
    ├── config.js       # 配置和全局变量 (27行)
    ├── column.js       # Column 字符雨类 (78行)
    ├── special-column.js # SpecialColumn 特殊信息类 (98行)
    └── main.js         # 主程序入口和事件处理 (85行)
```

**模块职责：**

| 文件 | 内容 |
|------|------|
| `config.js` | Canvas 初始化、全局变量、配置常量、`updateChars()` 函数 |
| `column.js` | `Column` 类 - 普通字符雨的逻辑和渲染 |
| `special-column.js` | `SpecialColumn` 类 - 特殊信息列的逻辑和渲染 |
| `main.js` | 初始化、动画循环、事件监听、用户交互 |

这样每个文件都控制在 100 行以内，职责单一，便于维护！