const { Bot, GrammyError, HttpError } = require("grammy");
const { autoQuote } = require("@roziscoding/grammy-autoquote");
const fs = require("fs");
const path = require("path");

if (fs.existsSync(".env")) {
  require("dotenv").config();
}

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw new Error("环境变量中未设置 BOT_TOKEN！退出...");
}

async function start() {
  const bot = new Bot(botToken);
  bot.use(autoQuote);

  const commandFilesDir = path.resolve(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandFilesDir)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandFilesDir, file));
    bot.command(command.name, async (ctx) => {
      await command.handler(ctx);
    });

    if (command.alias) {
      for (const alias of command.alias) {
        bot.command(alias, async (ctx) => {
          await command.handler(ctx);
        });
      }
    }
  }

  bot.command("start", (ctx) =>
    ctx.reply("你好！\n\n" + "运行 /help 命令以查看我能做什么！")
  );

  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`处理更新 ${ctx.update.update_id} 时出错：`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("请求中的错误：", e.description);
    } else if (e instanceof HttpError) {
      console.error("无法联系 Telegram：", e);
    } else {
      console.error("未知错误：", e);
    }
  });

  process.on("uncaughtException", (err) => {
    console.error(err);
  });

  process.on("unhandledRejection", (err) => {
    console.error(err);
  });

  process.on("SIGINT", () => {
    console.log("正在停止...");
    bot.stop();
    process.exit(0);
  });

  console.log("正在启动机器人...");
  await bot.start();
}

start().catch((error) => {
  console.error("机器人启动期间发生错误：", error);
  process.exit(1);
});