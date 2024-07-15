import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  create(questionComment: AnswerComment): Promise<void>
}
