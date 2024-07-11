import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instrutorId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository
  }

  async execute({
    instrutorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instrutorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
