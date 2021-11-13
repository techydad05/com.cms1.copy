import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSection from "app/sections/mutations/createSection"
import { SectionForm, FORM_ERROR } from "app/sections/components/SectionForm"
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import { useState } from "react"

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE)

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)
// Finish!
function handleEditorChange(value, setText) {
  // console.log('handleEditorChange', value['text'])
  setText(value['text'])
}

const NewSectionPage = () => {
  const [text, setText] = useState("")
  const router = useRouter()
  const [createSectionMutation] = useMutation(createSection)
  return (
    <div>
      <h1>Create New Section</h1>
      {/* added a markdown editor .. should it be here or on section form?
      couldnt figure out how to get the text from the editor to the form */}
      <MdEditor
        name="content"
        // component="textarea"
        style={{ height: "500px" }}
        renderHTML={t => mdParser.render(t)}
        onChange={(v) => handleEditorChange(v, setText)} />
      <SectionForm
        submitText="Create Section" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSection}
        // initialValues={{}}
        onSubmit={async (values) => {
          // part of new setup for markdown editor
          values.content = text
          try {
            const section = await createSectionMutation(values)
            router.push(
              Routes.ShowSectionPage({
                sectionId: section.id,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SectionsPage()}>
          <a>Sections</a>
        </Link>
      </p>
    </div>
  )
}

NewSectionPage.authenticate = true

NewSectionPage.getLayout = (page) => <Layout title={"Create New Section"}>{page}</Layout>

export default NewSectionPage
