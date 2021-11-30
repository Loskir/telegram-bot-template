import {Composer} from 'grammy'

import {User, Users} from '../models/users.js'
import {CustomContext} from '../types/context'

const composer = new Composer<CustomContext>()

composer.on([
  'message',
  'callback_query',
  'my_chat_member',
]).filter(
  (ctx) => {
    return ctx.chat?.type === 'private'
  },
  async (ctx, next) => {
    const from = ctx.from ?? ctx.myChatMember?.from
    let params: Partial<User> = {
      user_id: from.id,
      first_name: from.first_name,
      last_name: from.last_name,
      username: from.username,
      language_code: from.language_code,
      last_activity_at: new Date(),
      is_blocked: false,
      is_deactivated: false,
    }
    try {
      ctx.user = await Users.findOneAndUpdate({user_id: from.id}, {$set: params}, {upsert: true, new: true})
    } catch (error) {
      console.error('Error user', error)
      ctx.user = null
    }
    return next()
  })
composer.on('my_chat_member')
  .filter((ctx) => ctx.chat.type === 'private')
  .use(async (ctx, next) => {
    const userId = ctx.from.id
    if (ctx.myChatMember.new_chat_member.status === 'kicked') {
      console.log(`${userId}: blocked`)
      ctx.user = await Users.findOneAndUpdate({user_id: userId}, {$set: {is_blocked: true}})
    } else if (ctx.myChatMember.new_chat_member.status === 'member') {
      console.log(`${userId}: unblocked`)
      ctx.user = await Users.findOneAndUpdate({user_id: userId}, {
        $set: {
          is_blocked: false,
          is_deactivated: false,
        },
      })
    }
    return next()
  })

composer.on('inline_query', async (ctx, next) => {
  let params: Partial<User> = {
    user_id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
    language_code: ctx.from.language_code,
    last_activity_at: new Date(),
  }
  try {
    ctx.user = await Users.findOneAndUpdate({user_id: ctx.from.id}, {$set: params}, {new: true, upsert: true})
  } catch (error) {
    console.error('Error user', error)
    ctx.user = null
  }
  return next()
})

export default composer
