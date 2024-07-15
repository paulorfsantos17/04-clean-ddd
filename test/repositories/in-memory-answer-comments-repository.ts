import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository '
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  // eslint-disable-next-line prettier/prettier
  implements AnswerCommentRepository {
  public items: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    this.items.splice(answerCommentIndex, 1)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
