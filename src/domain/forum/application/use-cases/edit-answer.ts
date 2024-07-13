import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository
  }

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Unauthorized to edit this answer')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
