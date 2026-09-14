import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.slug,
  }));
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const product =
    getProductBySlug(params.id) ||
    PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductForm initialProduct={product} isEditing={true} />;
}
