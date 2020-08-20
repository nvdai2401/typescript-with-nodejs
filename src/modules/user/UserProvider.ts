import { ObjectId } from 'mongodb'
import moment from 'moment'
import { ResourceNotFoundError, ResourceAlreadyExist } from '../errors'
import { IUser } from '../../interfaces/IUser'
import User from './User'

class UserProvider {
  private users: any

  constructor(users: any) {
    this.users = users
  }

  public findById(id: string): IUser {
    return this.users
      .findOne({ _id: ObjectId(id), deleted: false })
      .then(this.factory)
  }

  public factory(rawData: any): IUser {
    if (!rawData) return null

    const data: any = {}
    Object.keys(rawData).forEach((key) => {
      if (rawData[key] instanceof ObjectId) {
        data[key] = rawData[key].toString()
      } else {
        data[key] = rawData[key]
      }
    })
    const user = new User(data._id || data.id)
    user.password = data.password
    user.email = data.email
    user.name = data.name
    user.lastModified = data.lastModified
    user.avatar = data.avatar
    return user
  }
}

export default UserProvider