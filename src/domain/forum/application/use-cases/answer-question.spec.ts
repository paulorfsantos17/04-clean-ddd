import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositories'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase
describe('create an answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should create an answer', async () => {
    const { value } = await sut.execute({
      content: 'test content',
      instrutorId: '1',
      questionId: '1',
    })

    expect(value?.answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(value?.answer.id)
  })
})
