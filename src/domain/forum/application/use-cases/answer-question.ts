import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instrutorId: string
  content: string
}
interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository
  }

  async execute({
    instrutorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instrutorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}