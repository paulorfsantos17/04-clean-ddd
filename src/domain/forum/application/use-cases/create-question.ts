import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}
interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
