import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to Edit a question', async () => {
    const createQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(createQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      content: 'new content',
      title: 'new title',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: 'new content',
      title: 'new title',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const createQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(createQuestion)

    await expect(() =>
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        content: 'new content',
        title: 'new title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit a question not exist', async () => {
    await expect(() =>
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        content: 'new content',
        title: 'new title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
