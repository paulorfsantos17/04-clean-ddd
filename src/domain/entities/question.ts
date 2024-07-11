import { Slug } from './value-objecs/slug'
import { Entity } from '../../core/entities/entity'

interface QuestionProps {
  title: string
  content: string
  authorId: string
  slug: Slug
}

export class Question extends Entity<QuestionProps> {


}
