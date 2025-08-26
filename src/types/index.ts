import { UUID } from "crypto"

export type Corpus = {
  id: UUID
  folder: string[]
  title: string
}

export type NewCorpusFormInput = {
  id: UUID
  folder: string[]
  title: string
}
