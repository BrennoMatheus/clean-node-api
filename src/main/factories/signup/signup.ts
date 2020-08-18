import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { makeSignUpValidation } from './signup-validation'
import { LogControllerDecorator } from '../../decorators/log'
import { Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController,logMongoRepository)
}
