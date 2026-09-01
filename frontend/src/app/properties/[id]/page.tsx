import { PropertyDetailsPage } from "@/components/property-details";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <PropertyDetailsPage id={id} />
  );
}