import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toValue() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[answerIndex] = answer
  }
}
