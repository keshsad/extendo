import { ActionPanel, List } from "@raycast/api"
import { randomUUID, UUID } from "crypto"
import { useState } from "react"

const mock = {
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

export default function Command() {
  const [searchText, setSearchText] = useState("")
  const [items, setItems] = useState(mock.items)

  // use global actions variable to transform local items to include it's own actions
  // each item in the items array is of type List.Item, so each item has an actions property for the ActionPanel
  // meaning we can type our items accordingly

  return (
    <List
      searchText={searchText}
      onSearchTextChange={text => {
        setSearchText(() => text)
        setItems(() => mock.items.filter(item => item.title.toLowerCase().includes(text.toLowerCase())))
      }}
      searchBarAccessory={<Dropdown />}
      navigationTitle="List"
      searchBarPlaceholder="Search..."
    >
      {(searchText === "" && items.length === 0) ? (
        <List.EmptyView title="No results. Make a new search or item!" icon="📂" />
      ) : (
        <List.Section title="Results" subtitle={items.length.toString()}>
          {items.map(item => <List.Item title={item.title} id={item.id} key={item.id} />)}
        </List.Section>
      )}
    </List>
  )
}

function Dropdown() {
  return (
    <List.Dropdown tooltip="Select Drink Type">
      <List.Dropdown.Item title="All" value="All" />
      <List.Dropdown.Section title="Types">
        <List.Dropdown.Item title="Codebase" value="Codebase" />
        <List.Dropdown.Item title="Markdown" value="Markdown" />
      </List.Dropdown.Section>
      <List.Dropdown.Section title="Connections">
        <List.Dropdown.Item title="GitHub" value="GitHub" />
        <List.Dropdown.Item title="Linear" value="Linear" />
      </List.Dropdown.Section>
    </List.Dropdown>
  )
}

