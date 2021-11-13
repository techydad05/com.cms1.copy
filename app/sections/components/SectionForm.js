import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
// import MarkdownIt from 'markdown-it'
// import MdEditor from 'react-markdown-editor-lite'
// // import style manually
// import 'react-markdown-editor-lite/lib/index.css'
// import { useState } from "react"

// // Register plugins if required
// // MdEditor.use(YOUR_PLUGINS_HERE)

// // Initialize a markdown parser
// const mdParser = new MarkdownIt(/* Markdown-it options */)
// // Finish!
// function handleEditorChange(value, setText) {
//   // console.log('handleEditorChange', value['text'])
//   setText(value['text'])
// }

export function SectionForm(props) {
  // const [text, setText] = useState("")
  return (
    <Form {...props}>
      {console.log("SectionForm", props)}
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="link" label="Link" placeholder="Link" />
      {/* I was thinking either populating this with
      the markdown editor or getting the value
      from mdeditor to final form */}
      {/* <LabeledTextField name="content" label="Content" placeholder="Content" /> */}
      {/* <MdEditor
        name="content"
        component="textarea"
        style={{ height: "500px" }}
        renderHTML={t => mdParser.render(t)}
        onChange={(v) => handleEditorChange(v, setText)} /> */}
    </Form>
  )
}
