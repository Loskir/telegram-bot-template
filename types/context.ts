import type {DocumentType} from '@typegoose/typegoose'
import type {Context} from 'grammy'

import {User} from '../models/users'

export type CustomContext = Context & {
  user: DocumentType<User> | null
}
