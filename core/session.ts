import {ISession, MongoDBAdapter} from '@satont/grammy-mongodb-storage'
import {session} from 'grammy'
import {Connection} from 'mongoose'
import {State} from '../state'
import {CustomContext} from '../types/context'

export function getSession(connection: Connection) {
  const collection = connection.db.collection<ISession>('sessions')

  return session<State, CustomContext>({
    storage: new MongoDBAdapter({ collection }),
    initial: () => ({}),
  })
}
