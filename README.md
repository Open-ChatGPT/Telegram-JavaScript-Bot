# Telegram-JavaScript-机器人

这个仓库是创建 Telegram 机器人的 JavaScript 模板。它使用 [grammY](https://grammy.dev)。

# 功能:
- 命令分类
- 命令处理器（在 [commands](./commands) 中添加命令）
- 错误处理器
- 命令别名（检查 [8ball](./commands/8ball.js) 命令，可以添加多个别名）

# 命令
- `/start` - 启动机器人

### 分类

#### 实用工具
- `/help` - 显示帮助

#### 娱乐
- `/8ball` - 向魔术8球提问

# 环境变量
- `BOT_TOKEN` - Telegram 机器人令牌，从[@BotFather](https://t.me/BotFather)获取

# 部署

[![在 Railway 上部署](https://railway.app/button.svg)](https://railway.app/template/5lRkWa?referralCode=agam778)

或 

- 克隆此仓库
- 安装依赖项：`yarn`
- 启动机器人：`yarn start`

# 许可证
Telegram-JavaScript-机器人根据 [MIT 许可证](./LICENSE) 授权。