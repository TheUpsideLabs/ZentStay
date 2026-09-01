import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import { ListingPage } from "@/components/properties/listing-page";

export default function Properties() {
  return (
    <>
      <Navbar />

      <main className="pt-32">
        <ListingPage />
      </main>

      <Footer />
    </>
  );
}