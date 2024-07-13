import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

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
    console.log('🚀 ~ it ~ createQuestion:', createQuestion)

    const { question } = await sut.execute({
      slug: 'question-title',
    })

    expect(inMemoryQuestionsRepository.items[0].slug).toEqual(question.slug)
  })
})
