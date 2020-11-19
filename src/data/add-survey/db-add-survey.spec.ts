import { AddSurveyRepository,AddSurveyModel } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

const makeFakesSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{ image: 'any_image',answer: 'any_answer' }]
})

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const data = makeFakesSurveyData()

    await sut.add(data)

    expect(addSpy).toHaveBeenCalledWith(data)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    jest.spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeFakesSurveyData())

    await expect(promise).rejects.toThrow()
  })
})
