import { faqs } from "@/data/faqs";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/ui/section-title/section-title";

export function FAQSection() {
  return (
    <Section>
      <Container>
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know before booking your stay."
        />

        <div className="mx-auto grid max-w-5xl gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">
                {faq.question}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}