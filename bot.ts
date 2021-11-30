import {Bot} from 'grammy'
import {CustomContext} from './types/context'

import user from './passThruMiddlewares/user'

export function getBot() {
  const bot = new Bot<CustomContext>(process.env.BOT_TOKEN || '')
  bot.use(user)
  bot.command('start', (ctx) => {
    console.log(ctx.user)
    return ctx.reply('hi!')
  })

  bot.catch(console.error)

  return bot
}
