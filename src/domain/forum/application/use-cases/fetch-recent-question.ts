import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}
interface FetchRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    page = 1,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
