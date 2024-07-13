import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositories'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to Edit a question', async () => {
    const createAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'new content',
      answerId: 'answer-1',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'new content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const createQuestion = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerRepository.create(createQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        content: 'new content',
        answerId: 'answer-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit a question not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        content: 'new content',
        answerId: 'answer-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
