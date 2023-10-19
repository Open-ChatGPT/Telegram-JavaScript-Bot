const responses = [
  "确定无疑。",
  "毫无疑问。",
  "你可以依赖它。",
  "是的，绝对如此。",
  "果断地说，是的。",
  "据我看，是的。",
  "很有可能。",
  "前景看好。",
  "迹象表明是的。",
  "绝对！",
  "不要指望。",
  "我的消息来源说不是。",
  "前景不太好。",
  "非常怀疑。",
  "不太可能。",
  "现在最好不要告诉你。",
  "机会不大。",
  "不太可能。",
  "绝不，哈哈。",
  "我非常怀疑。",
];

module.exports = {
  name: "8ball",
  description: "向神奇的8球提出一个问题",
  alias: ["eightball"],
  usage: "/8ball <问题>",
  example: "/8ball 这个机器人很棒吗？",
  category: "娱乐",
  handler: async (ctx) => {
    const { message } = ctx;
    const { text } = message;

    if (!text.substring(text.indexOf(" ") + 1)) {
      await ctx.reply("你需要提出一个问题！");
      return;
    }

    const response = responses[Math.floor(Math.random() * responses.length)];
    await ctx.reply(response);
  },
};