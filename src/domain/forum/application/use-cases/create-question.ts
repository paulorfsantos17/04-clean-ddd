import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachmen-list'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    authorId,
    content,
    title,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    const questionAttachments = attachmentsIds.map((attachmentsId) =>
      QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityId(attachmentsId),
      }),
    )

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionRepository.create(question)

    return right({ question })
  }
}
