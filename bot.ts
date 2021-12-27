import {Bot} from 'grammy'

import {config} from './core/config'
import {CustomContext} from './types/context'

import user from './passThruMiddlewares/user'

import {mainComposer} from './middlewares/main'

export function getBot() {
  const bot = new Bot<CustomContext>(config.token)
  bot.use(user)

  bot.use(mainComposer)

  bot.catch(console.error)

  return bot
}
