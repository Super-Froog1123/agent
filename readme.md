### 2026.1.22_1 创建
input -> decision -> tool -> result

### 2026.1.22_2 理解基本流程
添加touch package.json
理解llm逻辑
安装vertexai

已上传github

### 2026.1.23_1 完善gemini信息
使用config存储账号密码
使用.env部署key，google只接受环境注入，不接受写在代码里面
修改 llm.js 中的prompt逻辑。

已上传github

微调prompt和解析response逻辑成功

### 2026.1.24_1 多个agent合作实现结果

index.js 系统入口 / HTTP / CLI
agent.js 工作流大脑（谁先做，谁后做）
agents/* 角色逻辑（怎么想）
llm.js 模型能力接口（怎么说）
tools.js 外部工具能力（怎么查、怎么算）

index.js 
    输入 {userInput: "帮我生成一个关于香港树木风险的新闻网页"}
    输出 {
        design: {},
        writing: {}
    }

agent.js (目前不需要调用大模型, 固定流程, 确定顺序)
    输入 来自index.js userInput: string
    输出 一个结构化结果，通常是对象：
        {
            designResult,
            writingResult
        }

agents/*.js
    输入 上游agent的结果 (userInput, context)
    输出 原始文本，或者结构化JSON（由agent约束）

llm.js
    输入 prompt: string
    输出 rawText: string

tools.js
    输入 { query: "Hong Kong tree collapse data" }
    输出 { results: [...] }

已上传github

已上传github

### 2026.1.25_1 实现端到端的结果
