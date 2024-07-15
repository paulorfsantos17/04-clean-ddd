import { makeAnswer } from 'test/factories/make-answer'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositories'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch question  answers', async () => {
    inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-2'),
      }),
    )

    const { answers } = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(answers).toHaveLength(2)
  })

  it('should be able to fetch paginated question answer', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(answers).toHaveLength(2)
  })
})
