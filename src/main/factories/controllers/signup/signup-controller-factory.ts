import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account.factory'
import { makeDBAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDBAuthentication())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
