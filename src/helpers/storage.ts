import { LocalStorage } from "@raycast/api";
import { UUID } from "crypto";
import { Corpus } from "../types";

export async function getCorpora() {
  const items = await LocalStorage.allItems()
  console.log("got items:", items)
  //return items
}

export async function getCorpus(id: UUID) {
  const item = await LocalStorage.getItem<string>(id)
  if (!item) return undefined

  const corpus: Corpus = JSON.parse(item)
  console.log("got", corpus.id)
  //return corpus
}

export async function setCorpus(id: UUID, corpus: any) {
  await LocalStorage.setItem(id, JSON.stringify(corpus))
  console.log("set", id)
}

export async function deleteCorpus(id: UUID) {
  await LocalStorage.removeItem(id)
  console.log("deleted", id)
}

export async function clearCorpora() {
  await LocalStorage.clear()
  console.log("cleared")
}
