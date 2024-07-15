import { AnswerCommentRepository } from '../repositories/answer-comments-repository '

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}
type DeleteAnswerCommentUseCaseResponse = Promise<void>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {
    this.answerCommentRepository = answerCommentRepository
  }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment?.authorId.toString() !== authorId) {
      throw new Error('Unauthorized to delete this comment')
    }

    await this.answerCommentRepository.delete(answerComment)
  }
}
