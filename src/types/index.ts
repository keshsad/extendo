import { UUID } from "crypto"

export type Corpus = {
  id: UUID
  title: string
  path: string[]
  linear?: URL
  github?: URL
}
