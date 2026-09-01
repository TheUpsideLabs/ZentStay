import { CollegePage } from "@/components/college";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CollegePage slug={slug} />;
}