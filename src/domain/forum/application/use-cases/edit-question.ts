import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
  title: string
}
type EditQuestionUseCaseResponse = Promise<void>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Unauthorized to edit this question')
    }

    question.content = content
    question.title = title

    await this.questionRepository.save(question)
  }
}
