import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositories'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswerRepository,
    )
  })

  it('should be able to choose a best answer in an question', async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionsRepository.create(createQuestion)

    const createAnswer = makeAnswer(
      {
        questionId: createQuestion.id,
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createAnswer)

    await sut.execute({ answerId: 'answer-1', authorId: 'author-1' })

    expect(
      inMemoryQuestionsRepository.items[0].bestAnswerId?.toString(),
    ).toEqual('answer-1')
  })

  it('should not be able to choose another user question best answer', async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionsRepository.create(createQuestion)

    const createAnswer = makeAnswer(
      {
        questionId: createQuestion.id,
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createAnswer)

    await expect(() =>
      sut.execute({ answerId: 'answer-1', authorId: 'author-' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to choose a answer not exist', async () => {
    await expect(() =>
      sut.execute({ answerId: 'answer-1', authorId: 'author-' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to choose a answer with question not exist', async () => {
    const createAnswer = makeAnswer({}, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(createAnswer)
    await expect(() =>
      sut.execute({ answerId: 'answer-1', authorId: 'author-' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
