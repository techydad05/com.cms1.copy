import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function PrintMarkdown({ markdown }) {
  return (
    <div className="markdown">
      <ReactMarkdown children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]} />
    </div>
  );
}
