import {Composer} from 'grammy'
import {CustomContext} from '../types/context'

export const mainComposer = new Composer<CustomContext>()
mainComposer.command('start', (ctx) => {
  console.log(ctx.user)
  return ctx.reply('hi!')
})
