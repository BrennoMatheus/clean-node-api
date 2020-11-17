import { HttpRequest,AddSurvey, AddSurveyModel } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { Validation } from '../../../protocols'
import { badRequest, serverError,noContent } from '../../../helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{ image: 'any_image',answer: 'any_answer' }]
  }
})

interface SutTypes {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddSurveyStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addSurveyStub = makeAddSurveyStub()
  const sut = new AddSurveyController(validationStub,addSurveyStub)

  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('', () => {
  test('Should call validation with correct values', async () => {
    const { sut,validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut,validationStub } = makeSut()
    jest.spyOn(validationStub,'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut,addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub,'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey thows', async () => {
    const { sut,addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub,'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(Error())))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
