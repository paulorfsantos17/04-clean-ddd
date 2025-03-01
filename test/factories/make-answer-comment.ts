import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  return AnswerComment.create(
    {
      content: faker.lorem.text(),
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      ...override,
    },
    id,
  )
}
