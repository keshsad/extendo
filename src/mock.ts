import { randomUUID } from "crypto"
import { Corpus } from "./types"

export const mock = {
  items: [
    { id: randomUUID(), title: "Journal" },
    { id: randomUUID(), title: "Extendo" },
  ],
  actions: [
    { id: randomUUID(), title: "New", onAction: () => console.log("action: new") },
    { id: randomUUID(), title: "Delete", onAction: () => console.log("action: delete") },
    { id: randomUUID(), title: "Edit", onAction: () => console.log("action: rename") },
    { id: randomUUID(), title: "Copy Context", onAction: () => console.log("action: copy context") },
    { id: randomUUID(), title: "Copy Steering", onAction: () => console.log("action: copy steering") },
    { id: randomUUID(), title: "Copy Path", onAction: () => console.log("action: copy path") },
    { id: randomUUID(), title: "Toggle Detail", onAction: () => console.log("action: toggle isShowingDetail") },
    {
      id: randomUUID(), title: "Context", children: [
        { id: randomUUID(), title: "Compact", onAction: () => console.log("action: compact") },
        { id: randomUUID(), title: "Extend", onAction: () => console.log("action: extend") },
      ]
    },
    {
      id: randomUUID(), title: "Steering", children: [
        { id: randomUUID(), title: "Compact", onAction: () => console.log("action: compact") },
        { id: randomUUID(), title: "Extend", onAction: () => console.log("action: extend") },
      ]
    }
  ]
}

export const items: Corpus[] = [
  { id: randomUUID(), title: "", path: [], linear: undefined, github: undefined },
  { id: randomUUID(), title: "", path: [], linear: undefined, github: undefined },
  { id: randomUUID(), title: "", path: [], linear: undefined, github: undefined },
  { id: randomUUID(), title: "", path: [], linear: undefined, github: undefined },
  { id: randomUUID(), title: "", path: [], linear: undefined, github: undefined },
  { id: randomUUID(), title: "", path: [], linear: undefined, github: undefined },
]

export const actions = {

}

