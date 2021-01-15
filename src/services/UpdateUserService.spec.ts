/** TODO
 * Should not create a new user, but update an existing one
 */

import AppError from '../errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import UpdateUserService from './UpdateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
    updateUserService = new UpdateUserService(fakeUsersRepository)
  })

  it('Should be able to update a existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const userUpdated = await updateUserService.execute({
      id: user.id,
      name: 'Update Johnny',
      email: 'john_the_revelator@gloiro.com',
      password: 'we-are-updating'
    })

    expect(userUpdated.id).toBe(user.id)
    expect(userUpdated.name).toBe('Update Johnny')
    expect(userUpdated.email).toBe('john_the_revelator@gloiro.com')
    expect(userUpdated.password).toBe('we-are-updating')
  })

  it('should not be able to create a new user with same email from another', async () => {
    await expect(
      updateUserService.execute({
        id: 'it-does-not-exist',
        name: 'Johnny Cash',
        email: 'johnnycasher@gloiro.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})