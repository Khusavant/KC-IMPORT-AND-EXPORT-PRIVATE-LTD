import React from "react";
import { notFound } from "next/navigation";
import { MOCK_RFQS } from "@/lib/mock-rfqs";
import RFQDetailView from "@/components/admin/RFQDetailView";

interface RFQDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return MOCK_RFQS.map((rfq) => ({
    id: rfq.id,
  }));
}

export default function RFQDetailPage({ params }: RFQDetailPageProps) {
  const rfq = MOCK_RFQS.find((r) => r.id === params.id);

  if (!rfq) {
    notFound();
  }

  return <RFQDetailView rfq={rfq} />;
}
