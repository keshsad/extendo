import { Action, ActionPanel, List } from "@raycast/api"
import { useEffect, useState } from "react"
import { getCorpora } from "./helpers/storage"
import NewCorpusForm from "./form"
import { Corpus } from "./types"

console.log("View Corpora command started\n\n")

export default function ViewCorporaList() {
  const [searchText, setSearchText] = useState("")
  const [items, setItems] = useState<Corpus[]>([])
  const [isLoading, setIsLoading] = useState(false)

  let corpora: Corpus[] = []

  useEffect(() => {
    (async () => {
      console.log("useEffect started\n")
      setIsLoading(true)
      try {
        const items = await getCorpora()
        if (!items) return
        setItems(items)
        corpora = items
        console.log("getCorpora items:", items)
      } catch { console.error("Failed to fetch Corpora") }
      setIsLoading(false)
      console.log("useEffect finished\n\n")
    })()
  }, [])

  const onSearchTextChange = (text: string) => {
    console.log("onSearchTextChange started\n")
    console.log("text:", text)
    console.log("setting searchText...\n")
    setSearchText(() => text)
    console.log("settting items...\n")
    setItems(prev => prev.filter(item => {
      console.log("item:", item)
      console.log("item.title:", item.title)
      console.log("item.title.toLowerCase():", item.title.toLowerCase())
      console.log("text.toLowerCase():", text.toLowerCase())
      console.log("comparing...", item.title.toLowerCase().includes(text.toLowerCase()))
      item.title.toLowerCase().includes(text.toLowerCase())
    }))
    console.log("onSearchTextChange finished\n")
  }

  return (
    <List
      isLoading={isLoading}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
      searchBarAccessory={<Dropdown />}
      searchBarPlaceholder="Search..."
    >
      {(searchText === "" && items.length === 0)
        ? <List.EmptyView icon="📂" title="No results!" description="Try adding a New Corpus..." actions={emptyActions} />
        : (searchText !== "" && items.length === 0)
          ? <List.EmptyView icon="😩" title="No results!" description="Try a different search..." actions={emptyActions} />
          : <List.Section title="Results" subtitle={items.length.toString()}>
            {items.map(item => <List.Item key={item.id} title={item.title} actions={action(item)} />)}
          </List.Section>
      }
    </List>
  )
}

const emptyActions = (
  <ActionPanel>
    <Action.Push title="New Corpus" target={<NewCorpusForm />} />
  </ActionPanel>
)

const action = (item: any) => (
  <ActionPanel>
    <Action.ShowInFinder title="Show in Finder" path={item.path} />
  </ActionPanel>
)

function Dropdown() {
  return (
    <List.Dropdown tooltip="Select Drink Type">
      <List.Dropdown.Item title="All" value="All" />
      <List.Dropdown.Section title="Types">
        <List.Dropdown.Item title="Codebase" value="Codebase" />
        <List.Dropdown.Item title="Markdown" value="Markdown" />
      </List.Dropdown.Section>
    </List.Dropdown>
  )
}
