import { Suspense } from "react"
import { Image, Link, useMutation, Routes, useParams, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import TopHeader from "app/core/components/TopHeader"
import db from "db"
import getProject from "app/projects/queries/getProject"
import getSection from "app/sections/queries/getSection"
import PrintMarkdown from "app/core/components/PrintMarkdown"

// This gets called on every request
// might be able to remove this
export async function getServerSideProps() {
  const sections = await db.section.findMany()
  // console.log(sections)
  // Pass projects to the page via props
  return { props: { sections } }
}

// working on having updating data for best user experience
// function Project() {
//   // const [project, {refetch}] = useQuery(getProject, { id: 1 }, {refetchInterval:1000})
//   const [project, {refetch}] = useQuery(getProject, { id: 1 })
//   return <>
//     <h1>{project.name}</h1>
//   </>
// }

function Section() {
  const params = useParams()
  const route = params.slug || ["home"]
  const [section, {refetch}] = useQuery(getSection, { link: route[0] })
  return <>
    <PrintMarkdown markdown={section.content} />
  </>
}

const Home = (props) => {
  const params = useParams()
  const route = params.slug || ["home"]
  const sections = props.sections
  //TODO: *** work on fixing for nested routes
  // and changing location of this function to topheader
  const links = sections.map((section) => {
    return { name: section.name, slug: section.link }
  })
  const section = sections.find((s) => s.link === route[0])

  return (
    <div className="container">
      <TopHeader links={links} />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Project /> */}
          <Section />
        </Suspense>
      </main>

      <footer>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by IvanM
        </a>
      </footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
         // min-height: 100vh;
         // display: flex;
         // flex-direction: column;
         // justify-content: center;
         // align-items: center;
        }

        main {
         // padding: 5rem 0;
         // flex: 1;
         // display: flex;
         // flex-direction: column;
         // justify-content: center;
         // align-items: center;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #45009d;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
