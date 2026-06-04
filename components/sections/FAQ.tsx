"use client";

import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqKlientams, faqMeistrams, type FaqEntry } from "@/components/sections/faq-data";

function FaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <Accordion className="grid gap-x-8 md:grid-cols-2">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-white/10 py-2"
        >
          <AccordionTrigger
            className="break-words py-5 pr-2 text-left text-sm font-semibold text-white hover:no-underline md:text-base"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 leading-relaxed text-zinc-400">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FAQ() {
  return (
    <section id="duk" className="overflow-hidden bg-black py-20 md:py-24">
      <Container>
        <h2 className="text-center font-display text-4xl font-bold text-white md:text-5xl">
          Dažniausiai užduodami klausimai
        </h2>

        <Tabs defaultValue="meistrams" className="mt-12 w-full">
          <TabsList
            className="mb-10 flex h-auto w-full flex-col items-stretch justify-center gap-1 rounded-none border-0 bg-transparent p-0 md:flex-row md:items-center md:gap-12"
          >
            <TabsTrigger
              value="meistrams"
              className="w-full rounded-none !border-l-0 !border-r-0 !border-t-0 !border-b-2 !border-b-transparent !bg-transparent px-2 py-3 text-sm text-zinc-400 !shadow-none transition hover:text-zinc-200 data-active:!border-b-[#E85002] data-active:!bg-transparent data-active:!text-[#E85002] data-active:!shadow-none data-[state=active]:!border-b-[#E85002] data-[state=active]:!bg-transparent data-[state=active]:!text-[#E85002] data-[state=active]:!shadow-none md:w-auto md:text-base"
            >
              Meistrams (Paslaugų tiekėjams)
            </TabsTrigger>
            <TabsTrigger
              value="klientams"
              className="w-full rounded-none !border-l-0 !border-r-0 !border-t-0 !border-b-2 !border-b-transparent !bg-transparent px-2 py-3 text-sm text-zinc-400 !shadow-none transition hover:text-zinc-200 data-active:!border-b-[#E85002] data-active:!bg-transparent data-active:!text-[#E85002] data-active:!shadow-none data-[state=active]:!border-b-[#E85002] data-[state=active]:!bg-transparent data-[state=active]:!text-[#E85002] data-[state=active]:!shadow-none md:w-auto md:text-base"
            >
              Klientams (Paslaugų užsakovams)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meistrams">
            <FaqAccordion items={faqMeistrams} />
          </TabsContent>

          <TabsContent value="klientams">
            <FaqAccordion items={faqKlientams} />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
