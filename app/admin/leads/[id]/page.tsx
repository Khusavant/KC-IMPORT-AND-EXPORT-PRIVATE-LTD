import React from "react";
import { notFound } from "next/navigation";
import { MOCK_LEADS } from "@/lib/mock-leads";
import LeadDetailClient from "./LeadDetailClient";

interface LeadDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return MOCK_LEADS.map((lead) => ({
    id: lead.id,
  }));
}

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  const lead = MOCK_LEADS.find((l) => l.id === params.id);

  if (!lead) {
    notFound();
  }

  return <LeadDetailClient lead={lead} />;
}
