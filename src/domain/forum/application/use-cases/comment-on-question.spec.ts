import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to create comment on question', async () => {
    const createQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(createQuestion)

    await sut.execute({
      authorId: 'author-1',
      content: 'content test',
      questionId: createQuestion.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
    expect(inMemoryQuestionCommentsRepository.items[0].content).toBe(
      'content test',
    )
    expect(
      inMemoryQuestionCommentsRepository.items[0].authorId.toString(),
    ).toBe('author-1')
    expect(inMemoryQuestionCommentsRepository.items[0].id).toBeTruthy()
  })

  it('should not be able to create comment with comment not exist', async () => {
    await expect(() =>
      sut.execute({
        questionId: 'question-comment-1',
        authorId: 'author-2',
        content: 'content test',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
