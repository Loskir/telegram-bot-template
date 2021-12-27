import type {DocumentType} from '@typegoose/typegoose'
import type {Context, SessionFlavor} from 'grammy'

import {User} from '../models/users'
import {State} from '../state'

export type CustomContext = Context & SessionFlavor<State> & {
  user: DocumentType<User> | null
}
