import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/Container";

interface LegalArticleProps {
  filename: string;
}

export async function LegalArticle({ filename }: LegalArticleProps) {
  const filePath = path.join(process.cwd(), "content", filename);
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <div className="bg-black text-white pt-32 pb-20 md:pb-28">
      <Container className="max-w-4xl">
        <article
          className="prose prose-invert max-w-none
                     prose-headings:font-display prose-headings:font-bold
                     prose-headings:text-white
                     prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-8
                     prose-h2:text-2xl md:prose-h2:text-3xl
                     prose-h2:mt-12 prose-h2:mb-4
                     prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                     prose-p:text-zinc-300 prose-p:leading-relaxed
                     prose-li:text-zinc-300
                     prose-strong:text-white
                     prose-a:text-[#E85002] prose-a:no-underline
                     hover:prose-a:underline
                     prose-ul:my-4 prose-li:my-1"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </Container>
    </div>
  );
}
