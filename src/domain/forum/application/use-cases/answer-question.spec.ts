import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswerRepository: AnswersRepository = {
  async create(answer: Answer) {
    // eslint-disable-next-line no-useless-return
    return
  },
}

describe('create an answer', () => {
  it('should create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
    const answer = await answerQuestion.execute({
      content: 'test content',
      instrutorId: '1',
      questionId: '1',
    })

    expect(answer.content).toEqual('test content')
  })
})
