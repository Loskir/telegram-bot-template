import {Bot} from 'grammy'
import {connection} from 'mongoose'

import {config} from './core/config'
import {getSession} from './core/session'
import {CustomContext} from './types/context'

import user from './passThruMiddlewares/user'

import {mainComposer} from './middlewares/main'

export function getBot() {
  const bot = new Bot<CustomContext>(config.token)

  bot.use(user)
  bot.use(getSession(connection))

  bot.use(mainComposer)

  bot.catch(console.error)

  return bot
}
