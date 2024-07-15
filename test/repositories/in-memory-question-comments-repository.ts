import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  // eslint-disable-next-line prettier/prettier
  implements QuestionCommentRepository {
  public items: QuestionComment[] = []
  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
