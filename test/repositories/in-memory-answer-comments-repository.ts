import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository '
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  // eslint-disable-next-line prettier/prettier
  implements AnswerCommentRepository {
  public items: AnswerComment[] = []
  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
