const fs = require("fs");

module.exports = {
  name: "help",
  description: "显示所有可用命令的列表",
  usage: "/help 或 /help <command>",
  example: "/help 或 /help aur",
  category: "实用工具",
  handler: async (ctx) => {
    const { message } = ctx;
    const { text } = message;

    if (text === "/help" || text === `/help@${ctx.me.username}`) {
      const commandFiles = fs
        .readdirSync(__dirname)
        .filter((file) => file.endsWith(".js"));
      const commands = [];
      for (const file of commandFiles) {
        const command = require(`./${file}`);
        commands.push({
          name: command.name,
          description: command.description,
          alias: command.alias,
          category: command.category,
        });
      }

      const categories = [];
      for (const command of commands) {
        if (!categories.includes(command.category)) {
          categories.push(command.category);
        }
      }

      let output =
        "以下是您可以使用的命令列表，按类别分类：\n\n";
      for (const category of categories) {
        output += `<b>${category}</b>:\n`;
        for (const command of commands) {
          if (command.category === category) {
            output += `/${command.name}`;
            if (command.alias) {
              output += `, /${command.alias.join(", /")}`;
            }
            output += ` - ${command.description}\n`;
          }
        }
        output += "\n";
      }

      await ctx.reply(output, { parse_mode: "HTML" });
    } else if (text.substring(text.indexOf(" ") + 1)) {
      const command = text.substring(text.indexOf(" ") + 1);
      const commandFiles = fs
        .readdirSync(__dirname)
        .filter((file) => file.endsWith(".js"));

      const commands = commandFiles.map((file) => require(`./${file}`));

      const commandDetail = commands.find(
        (cmd) =>
          cmd.name === command || (cmd.alias && cmd.alias.includes(command))
      );

      if (commandDetail) {
        let output = `*命令:* /${commandDetail.name}\n`;
        output += `*描述:* ${commandDetail.description}\n`;
        output += `*用法:* \`${commandDetail.usage}\`\n`;
        output += `*示例:* \`${commandDetail.example}\`\n`;

        await ctx.reply(output, { parse_mode: "MarkdownV2" });
      } else {
        await ctx.reply(
          `未找到命令 <code>${command}</code>！\n运行 /help 查看所有命令。`,
          {
            parse_mode: "HTML",
          }
        );
      }
    }
  },
};