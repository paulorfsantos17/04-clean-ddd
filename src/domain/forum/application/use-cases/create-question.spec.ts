import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('create a question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should create an question', async () => {
    const { value } = await sut.execute({
      content: 'test content',
      authorId: '1',
      title: 'test title',
    })

    expect(value?.question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(value?.question.id)
  })
})
