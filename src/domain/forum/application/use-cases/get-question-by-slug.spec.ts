import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objecs/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find an question', async () => {
    const createQuestion = Question.create({
      title: 'Question title',
      content: 'Question test content',
      slug: Slug.create('question-title'),
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryQuestionsRepository.create(createQuestion)

    const { question } = await sut.execute({
      slug: 'question-title',
    })

    expect(inMemoryQuestionsRepository.items[0].slug).toEqual(question.slug)
  })
})
