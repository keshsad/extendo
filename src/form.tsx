import { ActionPanel, Form, Action, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { useState } from "react";
import { URL } from "url";

interface NewFormValues {
  path: string[]
  title: string
  linear?: string
  github?: string
}

export default function Command() {
  const [path, setPath] = useState<string[]>([])
  const [title, setTitle] = useState<string>("")
  const [linear, setLinear] = useState<string>("")
  const [github, setGithub] = useState<string>("")

  const { handleSubmit, itemProps } = useForm<NewFormValues>({
    onSubmit: (values) => {
      console.log(values)
      showToast({
        style: Toast.Style.Success,
        title: "Success!",
        message: `Saved ${values.title}`,
      })
    },
    validation: {
      path: (value) => value?.length === 0 ? "Required" : undefined,
      title: (value) => value === "" ? "Required" : undefined,
      linear: (value) => {
        if (value === "" || value === undefined) return "URL is required"
        try {
          const url = new URL(value)
          if (url.hostname !== "linear.app") return "Must be linear.app"
          if (!(url.pathname.includes("/project"))) return "Must have /project"
        } catch { "URL is invalid" }
      },
      github: (value) => {
        if (value === "" || value === undefined) return "URL is required"
        try {
          const url = new URL(value)
          if (url.hostname !== "github.com") return "Must be github.com"
        } catch { "URL is invalid" }
      }
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
      <Form.FilePicker {...itemProps.path} title="Path" value={path} onChange={setPath} autoFocus allowMultipleSelection={false} canChooseDirectories canChooseFiles={false} />
      <Form.TextField {...itemProps.title} title="Title" value={title} onChange={setTitle} />
      <Form.Separator />
      <Form.TextField {...itemProps.linear} title="Linear Project" value={linear} onChange={setLinear} />
      <Form.TextField {...itemProps.github} title="GitHub Repository" value={github} onChange={setGithub} />
    </Form>
  );
}
