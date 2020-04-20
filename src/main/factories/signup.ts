import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  return new SignUpController(addAccount, makeSignUpValidation())
}
