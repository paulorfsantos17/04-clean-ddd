import { expect, describe, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswersRepository = {
  async create(answer: Answer) {
    return
  }
}

describe('create an answer', () => {
  it('should create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
    const answer = await answerQuestion.execute({
      content: 'test content',
      instrutorId: '1',
      questionId: '1'
    })

    expect(answer.content).toEqual('test content')
  })
})