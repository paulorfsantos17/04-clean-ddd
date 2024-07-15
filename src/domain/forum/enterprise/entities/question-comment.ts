import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/types/optional'

export interface QuestionCommentProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return questionComment
  }
}
