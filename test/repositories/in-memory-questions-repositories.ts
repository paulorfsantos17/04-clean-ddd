import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions: Question[] = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question): Promise<void> {
    const questionItem = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.items[questionItem] = question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter(
      (item) => item.id.toString() !== question.id.toString(),
    )
  }
}
