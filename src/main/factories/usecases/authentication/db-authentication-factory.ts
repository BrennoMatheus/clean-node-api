import env from '../../../config/env'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../domain/usecases/authentication'
import { makeBcryptAdapter } from '../../infra/criptography/bcrypt-adapter-factory'

export const makeDBAuthentication = (): Authentication => {
  const bcryptAdapter = makeBcryptAdapter()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository,bcryptAdapter,jwtAdapter,accountMongoRepository)
}
