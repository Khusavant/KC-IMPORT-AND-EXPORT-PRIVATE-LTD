// Industries served dataset for KC Import and Export Private Limited
// Rajkot, Gujarat, India

export type Industry = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  relevantCategories: string[];
  productCount: string;
  highlightedItems: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "ind-agriculture",
    name: "Agriculture & Farming",
    slug: "agriculture",
    icon: "Wheat",
    description:
      "Supplying global spice processors, wholesale agro-dealers, and seed blenders with premium Gujarat-harvested spices, grains, and oilseeds directly from Saurashtra mandis.",
    relevantCategories: ["Agricultural Products", "Processed Food"],
    productCount: "40+ Export Grades",
    highlightedItems: ["Machine Cleaned Cumin Seeds", "Double Polished Turmeric", "Sesame Seeds"],
  },
  {
    id: "ind-food-processing",
    name: "Food Processing & Ingredients",
    slug: "food-processing",
    icon: "Utensils",
    description:
      "Providing industrial food factories, seasoning blenders, and beverage manufacturers with high-purity dehydrated vegetables, fruit concentrates, and aseptic purees.",
    relevantCategories: ["Processed Food", "Agricultural Products"],
    productCount: "USFDA & BRC Certified",
    highlightedItems: ["Dehydrated Onion Flakes", "Aseptic Alphonso Mango Puree", "Garlic Powder"],
  },
  {
    id: "ind-construction",
    name: "Construction & Infrastructure",
    slug: "construction",
    icon: "Building2",
    description:
      "Delivering high-tonnage architectural hardware, heavy-duty stainless steel pipe flanges, vitrified porcelain tiles, and commercial ceramic sanitaryware for EPC projects.",
    relevantCategories: ["Hardware & Tools", "Consumer Goods", "Industrial Components"],
    productCount: "Morbi & Rajkot Clusters",
    highlightedItems: ["Glazed Porcelain Tiles", "EN 1906 Lever Handles", "ASTM Pipe Flanges"],
  },
  {
    id: "ind-automotive",
    name: "Automotive & Heavy Transport",
    slug: "automotive",
    icon: "Car",
    description:
      "Sourcing high-cycle brass turned parts, knurled bushings, forged hand tools, and precision CNC components for tier-1 automotive component makers and repair networks.",
    relevantCategories: ["Industrial Components", "Hardware & Tools"],
    productCount: "Micron Precision Tolerances",
    highlightedItems: ["CNC Brass Inserts", "DIN 3113 Spanners", "Engine Bushings"],
  },
  {
    id: "ind-textile",
    name: "Textile & Apparel Manufacturing",
    slug: "textile-apparel",
    icon: "Shirt",
    description:
      "Supplying international spinning mills, knitting plants, and garment houses with Shankar-6 combed cotton yarn and OEKO-TEX certified greige woven fabrics.",
    relevantCategories: ["Textiles"],
    productCount: "Top 5% Uster Quality",
    highlightedItems: ["Ring Spun Cotton Yarn", "Airjet Woven Grey Fabric", "Organic Cotton"],
  },
  {
    id: "ind-retail",
    name: "Consumer Retail & Supermarket Chains",
    slug: "consumer-retail",
    icon: "ShoppingBag",
    description:
      "Custom private-label packaging and bulk shipments of ceramic housewares, kitchen hardware, packaged spices, and shelf-ready culinary goods for international retailers.",
    relevantCategories: ["Consumer Goods", "Processed Food", "Hardware & Tools"],
    productCount: "Private Label Export Ready",
    highlightedItems: ["Packaged Spices", "Bathroom Ceramic Sets", "Blister Packed Tools"],
  },
  {
    id: "ind-pharma",
    name: "Pharmaceuticals & Nutraceuticals",
    slug: "pharmaceuticals",
    icon: "Pill",
    description:
      "High-curcumin turmeric rhizomes, herbal extracts, and food-grade sterile botanicals meeting stringent microbiological and pesticide residue limits for pharma extractors.",
    relevantCategories: ["Agricultural Products"],
    productCount: "Phytosanitary & Lab Certified",
    highlightedItems: ["High Curcumin Turmeric", "Coriander Extracts", "Botanical Powders"],
  },
  {
    id: "ind-engineering",
    name: "Precision Engineering & OEM",
    slug: "engineering",
    icon: "Wrench",
    description:
      "Custom machined OEM components, hydraulic pipe fittings, high-pressure forged couplings, and contract manufacturing executed strictly according to 2D/3D customer CAD drawings.",
    relevantCategories: ["Industrial Components", "Hardware & Tools"],
    productCount: "RoHS & REACH Compliant",
    highlightedItems: ["Custom CNC Turnings", "Forged Steel Couplings", "High-Torque Hardware"],
  },
];
