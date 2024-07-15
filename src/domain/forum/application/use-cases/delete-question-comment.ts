import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}
type DeleteQuestionCommentUseCaseResponse = Promise<void>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {
    this.questionCommentRepository = questionCommentRepository
  }

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment?.authorId.toString() !== authorId) {
      throw new Error('Unauthorized to delete this comment')
    }

    await this.questionCommentRepository.delete(questionComment)
  }
}
