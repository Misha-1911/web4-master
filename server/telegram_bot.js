const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

module.exports = async (app, emitter) => {
 const router = await bot.createWebhook({
  domain: process.env.BASE_URL
 });

 bot.start((ctx) => {
  // console.log('message:', ctx.message);
  ctx.reply('Welcome, use command "/login" to use your auth token\n\nExample: /login 12345-54645-564564...');
 });

 bot.command('login', (ctx) => {
  // ctx.message.text => "/login 12345-54645-564564"
  // option 1
  // const id = ctx.message.text.slice(6);

  // option 2
  // const id = ctx.message.text.match(/[0-9a-z-]+$/ig);

  // option 3
  // const id = ctx.message.text.replace('/login', '').replaceAll(/ /, '');

  // option 4
  const [command, id] = ctx.message.text.split(' ');
  console.log(`Try to login id:${id}`);
  const userInfo = {
   firstName: ctx.from.first_name,
   lastName: ctx.from.last_name
  };

  emitter.emit(`login-${id}`, userInfo);
 });

 app.use(router);
};