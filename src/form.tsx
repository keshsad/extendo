import { getCorpora, setCorpus } from "./helpers/storage"
import { NewCorpusFormInput } from "./types"
import {
  ActionPanel,
  Form,
  Action,
  showToast,
  Toast,
} from "@raycast/api"
import { FormValidation, useForm } from "@raycast/utils"
import { randomUUID } from "crypto"
import { useEffect } from "react"

export default function NewCorpusForm() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const corpora = await getCorpora()
        if (mounted) console.log("corpora:", corpora)
      } catch {
        console.log("failed to get corpora")
      }
    })()
    return () => { mounted = false }
  })

  const { handleSubmit, itemProps } = useForm<NewCorpusFormInput>({
    onSubmit: async (values) => {
      try {
        const id = randomUUID()
        await setCorpus(id, { ...values, id })

        showToast({
          style: Toast.Style.Success,
          title: "Success!",
          message: `Saved ${values.title} to Local Storage`
        })
      } catch {
        console.error("Failed to save corpus")

        showToast({
          style: Toast.Style.Failure,
          title: "Uh oh!",
          message: "Failed to save corpus"
        })
      }
    },
    validation: {
      folder: (value) => { if (value === undefined || value.length == 0) return FormValidation.Required },
      title: (value) => { if (value === undefined || value === "") return FormValidation.Required },
    }
  })

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField {...itemProps.title} title="Title" />
      <Form.FilePicker {...itemProps.folder} title="Folder" allowMultipleSelection={false} canChooseDirectories canChooseFiles={false} />
    </Form>
  )
}
