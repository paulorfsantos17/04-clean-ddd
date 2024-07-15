import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositories'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Answer on Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswerRepository,
    )
  })

  it('should be able to create comment on Answer', async () => {
    const createAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(createAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'content test',
      answerId: createAnswer.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
    expect(inMemoryAnswerCommentsRepository.items[0].content).toBe(
      'content test',
    )
    expect(inMemoryAnswerCommentsRepository.items[0].authorId.toString()).toBe(
      'author-1',
    )
    expect(inMemoryAnswerCommentsRepository.items[0].id).toBeTruthy()
  })
})
