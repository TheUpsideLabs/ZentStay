"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Container } from "@/components/layout/container";

import { faqs } from "./faq-data";

export function FAQSection() {
  return (
    <section className="bg-slate-50 py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            FAQ
          </span>

          <h2 className="mt-5 text-5xl font-black tracking-tight">
            Everything You
            <br />
            Need To Know
          </h2>

          <p className="mt-6 text-lg text-slate-500">
            Answers to the most common questions about using ZentStay.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <Accordion
            defaultValue={[]}
            className="space-y-5"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${index}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <AccordionTrigger className="px-8 py-6 text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="px-8 pb-6 leading-7 text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}