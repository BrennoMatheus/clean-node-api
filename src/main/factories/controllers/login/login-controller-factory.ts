import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { makeDBAuthentication } from '../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDBAuthentication(), makeLoginValidation())
}
