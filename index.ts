import 'dotenv/config'

import './utils/checkDotenv'

import {getBot} from './bot'
import {connectMongoose} from './core/db'

void (async () => {
  await connectMongoose()

  const bot = getBot()

  const me = await bot.api.getMe()
  console.log(`@${me.username} is starting`)
  await bot.start()
})()
