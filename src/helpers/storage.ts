import { Corpus, NewCorpusFormInput } from "../types"
import { LocalStorage } from "@raycast/api"
import { UUID } from "crypto"

export async function getCorpora(): Promise<Corpus[] | undefined> {
  const items = await LocalStorage.allItems<{ [key: UUID]: string }>()

  const corpora: Corpus[] = Object.values(items)
    .map(item => {
      try {
        return JSON.parse(item) as Corpus
      } catch (error) {
        console.error("Failed to parse corpus:", error)
        return null
      }
    })
    .filter(corpus => corpus !== null)

  return corpora
}

export async function getCorpus(id: UUID): Promise<Corpus | undefined> {
  const item = await LocalStorage.getItem<string>(id)
  if (!item) return undefined

  const corpus: Corpus = JSON.parse(item)
  return corpus
}

export async function corpusExists(id: UUID): Promise<boolean> {
  const item = await LocalStorage.getItem<string>(id)
  return item !== undefined
}

export async function setCorpus(id: UUID, corpus: NewCorpusFormInput) {
  await LocalStorage.setItem(id, JSON.stringify(corpus))
}

export async function deleteCorpus(id: UUID) {
  await LocalStorage.removeItem(id)
}

export async function clearCorpora() {
  await LocalStorage.clear()
}
