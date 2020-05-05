import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (field: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validationStub: Validation
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposite([validationStub])
  return {
    validationStub,
    sut
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
