import {prop, getModelForClass} from '@typegoose/typegoose'

export class User {
  @prop({required: true, unique: true, index: true})
  public user_id!: number

  @prop()
  public username?: string
  @prop()
  public first_name?: string
  @prop()
  public last_name?: string
  @prop()
  public language_code?: string

  @prop()
  public last_activity_at?: Date

  @prop({default: false})
  public is_blocked!: boolean
  @prop({default: false})
  public is_deactivated!: boolean
}

export const Users = getModelForClass(User, {
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
})
