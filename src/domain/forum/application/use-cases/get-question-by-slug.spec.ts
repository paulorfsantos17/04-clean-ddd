import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find an question', async () => {
    const createQuestion = makeQuestion({
      slug: Slug.create('question-title'),
    })

    await inMemoryQuestionsRepository.create(createQuestion)

    const result = await sut.execute({
      slug: 'question-title',
    })
    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: createQuestion.title,
      }),
    })
  })

  it('should not be able to find a question that not exist', async () => {
    const result = await sut.execute({
      slug: 'question-not-exist',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
