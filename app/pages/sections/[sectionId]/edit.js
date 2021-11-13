import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSection from "app/sections/queries/getSection"
import updateSection from "app/sections/mutations/updateSection"
import { SectionForm, FORM_ERROR } from "app/sections/components/SectionForm"
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import { useState } from "react"

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE)

// Initialize a markdown parser
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // highlight: function (str, lang) {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return hljs.highlight(lang, str).value
  //     } catch (__) {}
  //   }
  // }
})

function handleEditorChange(value, setText) {
  // console.log('handleEditorChange', value['text'])
  setText(value['text'])
}
export const EditSection = () => {
  const [text, setText] = useState("")
  const router = useRouter()
  const sectionId = useParam("sectionId", "number")
  const [section, { setQueryData }] = useQuery(
    getSection,
    {
      id: sectionId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSectionMutation] = useMutation(updateSection)
  return (
    <>
      <Head>
        <title>Edit Section {section.id}</title>
      </Head>

      <div>
        <h1>Edit Section {section.id}</h1>
        <pre>JSON:{JSON.stringify(section, null, 2)}</pre>
        <MdEditor
        name="content"
        defaultValue={section.content}
        config={{
              view: {
                menu: true,
                md: true,
                html: true
              },
              imageUrl: 'https://octodex.github.com/images/minion.png'
            }}
        style={{ height: "500px" }}
        renderHTML={t => mdParser.render(t)}
        onChange={(v) => handleEditorChange(v, setText)} />
        <SectionForm
          submitText="Update Section" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSection}
          initialValues={section}
          onSubmit={async (values) => {
            values.content = text
            try {
              const updated = await updateSectionMutation({
                id: section.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowSectionPage({
                  sectionId: updated.id,
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
      </div>
    </>
  )
}

const EditSectionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSection />
      </Suspense>

      <p>
        <Link href={Routes.SectionsPage()}>
          <a>Sections</a>
        </Link>
      </p>
    </div>
  )
}

EditSectionPage.authenticate = true

EditSectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSectionPage
