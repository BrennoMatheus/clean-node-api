import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { makeBcryptAdapter } from '../../infra/criptography/bcrypt-adapter-factory'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = makeBcryptAdapter()
  const accountRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountRepository,accountRepository)
}
