import { uuid } from 'uuidv4'

import IUserRepository from './models/IUsersRepository'
import CreateUserDTO from '../dtos/CreateUserDTO'
import UpdateUserDTO from '../dtos/UpdateUserDTO'
import User from '../database/entities/User'
import AppError from '../errors/AppError'

export default class UserRepository implements IUserRepository {
  private users: User[] = []

  findById(): Promise<User> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)
    return user
  }

  public async readAllUsers(): Promise<User[]> {
    return this.users
  }

  public async updateUser({
    id,
    name,
    email,
    password
  }: UpdateUserDTO): Promise<User> {
    throw new AppError('Method yet not implemented')
  }

  public async deleteUser(id: string): Promise<void> {
    const selectedUser = this.users.find(ex => ex.id === id)

    if (selectedUser) {
      const selectedIndex = this.users.indexOf(selectedUser)
      this.users.splice(selectedIndex, 1)
    } else {
      throw new AppError('Cannot find the user by this ID.')
    }
  }
}