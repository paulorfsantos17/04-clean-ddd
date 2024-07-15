import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  // eslint-disable-next-line prettier/prettier
  implements QuestionCommentRepository {
  public items: QuestionComment[] = []
  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === questionComment.id.toString(),
    )

    this.items.splice(questionCommentIndex, 1)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
