// Product catalog dataset for KC Import and Export Private Limited
// All placeholder values marked for customer verification

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  material: string;
  grade?: string;
  dimensions?: string;
  specifications: Record<string, string>;
  applications: string[];
  industries: string[];
  moq: string;
  packaging: string;
  customization: boolean;
  countryOfOrigin: string;
  hsCode?: string;
  certifications: string[];
  availableMarkets: string[];
  relatedProductIds: string[];
  isFeatured: boolean;
};

export const PRODUCTS: Product[] = [
  // 1. Agricultural Products
  {
    id: "prod-cumin-seeds",
    slug: "premium-whole-cumin-seeds",
    name: "Premium Whole Cumin Seeds (Jeera) — Export Grade",
    sku: "AGR-CUM-001", // TODO: replace with real data
    category: "Agricultural Products",
    subcategory: "Spices & Seeds",
    shortDescription:
      "Machine-cleaned Gujarat cumin seeds with 99.5% purity, high volatile oil content, and certified low moisture.",
    fullDescription:
      "Sourced directly from Saurashtra and Unjha agricultural mandis in Gujarat, our export-grade cumin seeds undergo rigorous Sortex optical sorting and multi-stage air screening to eliminate foreign matter. Known for their distinct aroma, earthy warmth, and high essential oil content, these seeds meet stringent EU, USFDA, and Gulf food safety standards.",
    images: ["/images/products/prod-cumin-1.png", "/images/products/prod-cumin-2.png"],
    material: "100% Pure Cuminum Cyminum L.",
    grade: "Singapore Quality / Europe Quality (99.5% Purity)", // TODO: replace with real data
    dimensions: "Seed Length: 5 - 6 mm",
    specifications: {
      Purity: "99.5% Sortex Cleaned",
      Moisture: "Max 8.5%",
      "Volatile Oil": "Min 2.5% - 3.0%",
      "Total Ash": "Max 8.0%",
      "Acid Insoluble Ash": "Max 1.0%",
      Salmonella: "Absent in 25g",
    },
    applications: [
      "Commercial Food Processing",
      "Spice Blending & Seasoning Mixes",
      "Oleoresin & Essential Oil Extraction",
      "Retail Packaging & Supermarket Distribution",
    ],
    industries: ["Food Processing", "Agriculture", "Consumer Retail", "Pharmaceuticals"],
    moq: "1x 20ft FCL (13 Metric Tons)", // TODO: replace with real data
    packaging: "25kg / 50kg Eco-friendly Jute Bags or Multi-wall Paper Bags with inner poly liner",
    customization: true,
    countryOfOrigin: "India (Gujarat)",
    hsCode: "09093129", // TODO: replace with real data
    certifications: ["FSSAI", "APEDA", "Spice Board India", "ISO 22000", "Phytosanitary Certified"],
    availableMarkets: ["North America", "European Union", "Middle East", "Southeast Asia", "Australia"],
    relatedProductIds: ["prod-turmeric-fingers", "prod-onion-flakes"],
    isFeatured: true,
  },
  {
    id: "prod-turmeric-fingers",
    slug: "organic-turmeric-fingers",
    name: "Certified Whole Dry Turmeric Fingers",
    sku: "AGR-TUR-002", // TODO: replace with real data
    category: "Agricultural Products",
    subcategory: "Spices & Botanicals",
    shortDescription:
      "Double-polished golden turmeric rhizomes with guaranteed 3.0% - 5.0% natural curcumin content.",
    fullDescription:
      "Harvested from certified agricultural farms, our dried turmeric fingers undergo traditional sun-curing and mechanical polishing to reveal their vivid natural deep-yellow core. Packed with potent bio-active curcuminoids, this turmeric is widely exported for nutraceutical extractors, pharmaceutical formulation, and commercial culinary grinding.",
    images: ["/images/products/prod-turmeric-1.png", "/images/products/prod-turmeric-2.png"],
    material: "100% Natural Curcuma Longa",
    grade: "Salem / Nizamabad Double Polished", // TODO: replace with real data
    dimensions: "Length: 40 - 70 mm, Diameter: 10 - 15 mm",
    specifications: {
      "Curcumin Content": "Min 3.5% - 5.0%",
      Moisture: "Max 9.5%",
      "Total Ash": "Max 7.0%",
      "Extraneous Matter": "Max 0.5%",
      "Aflatoxin B1": "Within EU regulatory limits (<5 ppb)",
    },
    applications: [
      "Nutraceutical Supplements & Curcumin Extracts",
      "Curry Powders & Culinary Formulations",
      "Natural Textile Dyeing",
      "Herbal Cosmetics",
    ],
    industries: ["Food Processing", "Pharmaceuticals", "Consumer Retail", "Agriculture"],
    moq: "1x 20ft FCL (14 Metric Tons)", // TODO: replace with real data
    packaging: "25kg / 50kg Double PP Woven Bags or Seaworthy Jute Sacks",
    customization: true,
    countryOfOrigin: "India",
    hsCode: "09103020", // TODO: replace with real data
    certifications: ["FSSAI", "Spice Board India", "USDA Organic Equivalent", "Non-GMO"],
    availableMarkets: ["North America", "European Union", "United Kingdom", "Japan"],
    relatedProductIds: ["prod-cumin-seeds", "prod-mango-pulp"],
    isFeatured: false,
  },

  // 2. Industrial Components
  {
    id: "prod-brass-inserts",
    slug: "precision-brass-inserts-turned-parts",
    name: "Precision CNC Brass Inserts & Turned Components",
    sku: "IND-BRS-003", // TODO: replace with real data
    category: "Industrial Components",
    subcategory: "Fasteners & Hardware",
    shortDescription:
      "High-precision knurled brass threaded inserts and custom turned fittings manufactured to micron tolerances in Rajkot/Jamnagar.",
    fullDescription:
      "Manufactured in Gujarat's famed brass engineering cluster using high-speed multi-axis CNC Swiss screw machines. These brass inserts provide high tensile pull-out and torque-resistant female threads for ultrasonic, heat staking, and mold-in plastics. Features precision diamond/helical knurling with burr-free finishes.",
    images: ["/images/products/prod-brass-1.png", "/images/products/prod-brass-2.png"],
    material: "Free Cutting Brass IS 319 Type I / BS 249 / CW614N / RoHS Compliant Brass",
    grade: "CuZn39Pb3 / C36000", // TODO: replace with real data
    dimensions: "M2 to M16 Thread Sizes / Lengths 4mm to 40mm (Custom as per blueprint)",
    specifications: {
      Tolerance: "±0.01 mm",
      "Thread Standard": "ISO Metric, UNC, UNF, BSW",
      Surface: "Natural Brass, Nickel Plated, Tin Plated, or Clean Acid Washed",
      RoHS: "Lead content < 4% compliant with EU 2011/65/EU",
      Tensile: "Min 420 N/mm²",
    },
    applications: [
      "Automotive Plastic Housings & Dashboards",
      "Consumer Electronics & Telecommunication Enclosures",
      "Electrical Switchgear & Terminal Blocks",
      "Plumbing Fixtures & Sanitary Assemblies",
    ],
    industries: ["Automotive", "Engineering", "Consumer Retail"],
    moq: "25,000 Pieces", // TODO: replace with real data
    packaging: "Export grade inner corrugated cartons (20kg net) on heat-treated ISPM-15 wooden pallets",
    customization: true,
    countryOfOrigin: "India (Rajkot, Gujarat)",
    hsCode: "74153300", // TODO: replace with real data
    certifications: ["ISO 9001:2015", "RoHS Compliant", "REACH Certified", "Mill Test Certificate 3.1"],
    availableMarkets: ["North America", "European Union", "United Kingdom", "Germany", "Japan"],
    relatedProductIds: ["prod-flanges-bushings", "prod-door-handles"],
    isFeatured: true,
  },
  {
    id: "prod-flanges-bushings",
    slug: "stainless-steel-pipe-flanges",
    name: "Forged Stainless Steel Pipe Flanges & Bushings",
    sku: "IND-FLG-004", // TODO: replace with real data
    category: "Industrial Components",
    subcategory: "Piping & Fluid Power",
    shortDescription:
      "Drop-forged ASTM A182 304/316L weld neck, slip-on, and blind flanges engineered for heavy pressure fluid pipelines.",
    fullDescription:
      "Engineered to withstand extreme corrosive and high-temperature environments, our forged pipe flanges and mechanical bushings are precision machined in Rajkot's heavy engineering belt. Tested ultrasonically and hydrostatically to ensure zero metallurgical porosity.",
    images: ["/images/products/prod-flanges-1.png", "/images/products/prod-flanges-2.png"],
    material: "Stainless Steel ASTM A182 F304/304L, F316/316L, Carbon Steel A105",
    grade: "Class 150, 300, 600, 900, 1500", // TODO: replace with real data
    dimensions: "1/2\" NB to 24\" NB (DN15 - DN600)",
    specifications: {
      Standards: "ASME B16.5, DIN EN 1092-1, BS 4504",
      Testing: "100% Radiography / Ultrasonic / Hydrostatic Tested",
      Facing: "Raised Face (RF), Flat Face (FF), Ring Type Joint (RTJ)",
      Marking: "Die-stamped Heat Number, Size, Rating, and Material Grade",
    },
    applications: [
      "Oil & Gas Refineries & Petrochemical Processing",
      "Chemical Manufacturing Plants",
      "Marine Piping & Shipbuilding",
      "Industrial Water Treatment Facilities",
    ],
    industries: ["Engineering", "Construction", "Automotive"],
    moq: "500 Pieces or 1 Metric Ton", // TODO: replace with real data
    packaging: "Anti-rust oil dipped, end caps fitted, packed in seaworthy plywood boxes",
    customization: true,
    countryOfOrigin: "India (Gujarat)",
    hsCode: "73072100", // TODO: replace with real data
    certifications: ["ISO 9001", "PED 2014/68/EU", "EN 10204 3.1", "IBR Approved"],
    availableMarkets: ["Middle East", "North America", "European Union", "Southeast Asia"],
    relatedProductIds: ["prod-brass-inserts", "prod-hand-tools"],
    isFeatured: false,
  },

  // 3. Textiles
  {
    id: "prod-cotton-yarn",
    slug: "combed-cotton-ring-spun-yarn",
    name: "Pure Combed Cotton Ring-Spun Yarn (Ne 30s - 40s)",
    sku: "TEX-YRN-005", // TODO: replace with real data
    category: "Textiles",
    subcategory: "Yarns & Fibers",
    shortDescription:
      "100% Shankar-6 long staple Gujarat cotton combed yarn with uniform count, low hairiness, and superior tensile strength.",
    fullDescription:
      "Spun from premium Shankar-6 hand-picked cotton bolls grown in the Saurashtra region. Processed on world-class Rieter and Murata automated ring-spinning lines equipped with optical foreign contamination clearers. Ideal for circular knitting, weaving, and high-speed apparel manufacturing.",
    images: ["/images/products/prod-yarn-1.png", "/images/products/prod-yarn-2.png"],
    material: "100% Virgin Combed Cotton (Shankar-6)",
    grade: "Ne 20s, 30s, 40s, 60s Single & Double Plying", // TODO: replace with real data
    dimensions: "Cone Weight: 1.89 kg - 2.2 kg Net",
    specifications: {
      Count: "Ne 30/1 & 40/1 Combed",
      "Staple Length": "29 - 31 mm",
      CSP: "Min 2800 - 3000",
      IPI: "< 50 total faults per 1000m",
      Uster: "Top 5% Uster Statistics standards",
    },
    applications: [
      "Circular & Flat Bed Knitting (T-Shirts, Polo Shirts)",
      "High-Speed Warp & Weft Weaving (Bed Linens, Shirting)",
      "Denim Weft Filling",
      "Technical Textiles",
    ],
    industries: ["Textile & Apparel", "Consumer Retail"],
    moq: "1x 40ft High Cube Container (21 Metric Tons)", // TODO: replace with real data
    packaging: "Palletized carton boxes or polypropylene bags (24 cones per carton)",
    customization: true,
    countryOfOrigin: "India (Gujarat)",
    hsCode: "52052200", // TODO: replace with real data
    certifications: ["OEKO-TEX Standard 100", "Better Cotton Initiative (BCI)", "GOTS Organic Available"],
    availableMarkets: ["European Union", "Southeast Asia", "Latin America", "Egypt", "Bangladesh"],
    relatedProductIds: ["prod-cotton-fabric"],
    isFeatured: true,
  },
  {
    id: "prod-cotton-fabric",
    slug: "organic-cotton-woven-grey-fabrics",
    name: "Organic Raw Cotton Woven Grey Fabrics",
    sku: "TEX-FAB-006", // TODO: replace with real data
    category: "Textiles",
    subcategory: "Fabrics & Linens",
    shortDescription:
      "Airjet-loom woven plain, twill, and satin greige fabrics manufactured to exact picks and reed density.",
    fullDescription:
      "Woven on high-speed European airjet looms under temperature and humidity-controlled weaving sheds in Gujarat. Delivered in pristine greige state ready for bleaching, continuous vat dyeing, rotary printing, or bio-washing.",
    images: ["/images/products/prod-fabric-1.png", "/images/products/prod-fabric-2.png"],
    material: "100% Organic GOTS-Certified Cotton",
    grade: "Export A-Grade Greige Cloth", // TODO: replace with real data
    dimensions: "Width: 44\" to 126\" (112 cm to 320 cm)",
    specifications: {
      Weave: "Plain 1x1, Twill 2x1, Satin 4x1",
      GSM: "110 GSM to 380 GSM",
      Shrinkage: "Controlled within 3% after pre-wash",
      Inspection: "4-Point System Fabric Inspection (<15 points/100 sq yd)",
    },
    applications: [
      "Hospitality Bed Linens & Duvet Covers",
      "Casual Apparel & Workwear Garments",
      "Home Furnishings & Curtain Drapery",
      "Eco-Friendly Tote Bags",
    ],
    industries: ["Textile & Apparel", "Consumer Retail"],
    moq: "5,000 Linear Meters", // TODO: replace with real data
    packaging: "Continuous rolls wrapped in moisture-barrier HDPE tubing with protective end caps",
    customization: true,
    countryOfOrigin: "India",
    hsCode: "52081190", // TODO: replace with real data
    certifications: ["GOTS Organic", "OEKO-TEX Class 1", "Sedex SMETA Audited Mill"],
    availableMarkets: ["European Union", "North America", "Australia", "United Kingdom"],
    relatedProductIds: ["prod-cotton-yarn"],
    isFeatured: false,
  },

  // 4. Processed Food Products
  {
    id: "prod-onion-flakes",
    slug: "dehydrated-onion-garlic-flakes",
    name: "Dehydrated White & Red Onion Flakes / Granules",
    sku: "FOD-ONN-007", // TODO: replace with real data
    category: "Processed Food",
    subcategory: "Dehydrated Ingredients",
    shortDescription:
      "Continuous hot-air dried Mahuva onion flakes with natural pungency, micro-tested zero salmonella, and crisp texture.",
    fullDescription:
      "Cultivated in Mahuva, Bhavnagar (the dehydration capital of India), our onions are harvested at peak sweetness, mechanically peeled, sliced, washed, and dehydrated in steam-heated continuous drying belts. Retains full culinary flavor profile without sulfur burning.",
    images: ["/images/products/prod-onion-1.png", "/images/products/prod-onion-2.png"],
    material: "100% Fresh Indian Allium Cepa",
    grade: "A-Grade Kibbled Flakes (8 - 15 mm) / Minced / Powder", // TODO: replace with real data
    dimensions: "Flake Size: 5 - 15 mm",
    specifications: {
      Moisture: "Max 5.0%",
      "Total Plate Count": "< 100,000 cfu/g",
      "E. Coli": "Negative",
      Salmonella: "Absent in 25g",
      Pungency: "Strong Characteristic",
      "Color Spec": "Natural White / Purplish Red",
    },
    applications: [
      "Canned Soups, Gravies & Bouillon Cubes",
      "Ramen & Ready-to-Eat Meal Seasoning Packets",
      "Processed Meat Seasonings & Burger Formulations",
      "Commercial Bakery Toppings & Snack Dusting",
    ],
    industries: ["Food Processing", "Consumer Retail"],
    moq: "1x 20ft FCL (7.5 Metric Tons)", // TODO: replace with real data
    packaging: "14kg / 20kg Poly-lined 4-ply Kraft Paper Bags or Corrugated Master Cartons",
    customization: true,
    countryOfOrigin: "India (Gujarat)",
    hsCode: "07122000", // TODO: replace with real data
    certifications: ["BRC Food Certified", "ISO 22000", "USFDA Registered", "Halal & Kosher Certified"],
    availableMarkets: ["European Union", "North America", "Japan", "Middle East", "Australia"],
    relatedProductIds: ["prod-mango-pulp", "prod-cumin-seeds"],
    isFeatured: true,
  },
  {
    id: "prod-mango-pulp",
    slug: "alphonso-mango-pulp-aseptic",
    name: "Premium Alphonso Mango Pulp & Fruit Puree",
    sku: "FOD-MNG-008", // TODO: replace with real data
    category: "Processed Food",
    subcategory: "Fruit Purees & Concentrates",
    shortDescription:
      "Aseptically packaged 100% natural Alphonso mango puree with minimum 16° Brix sweetness and rich golden hue.",
    fullDescription:
      "Produced from hand-ripened Alphonso and Kesar mangoes cultivated across Western India. The fruit is inspected, washed, deseeded, thermal processed, and aseptically packaged in sterile conditions without artificial colors, preservatives, or sweeteners.",
    images: ["/images/products/prod-mango-1.png", "/images/products/prod-mango-2.png"],
    material: "100% Pure Alphonso Mango (Mangifera Indica)",
    grade: "Commercial Aseptic Grade & OTS Can 850g/3.1kg", // TODO: replace with real data
    dimensions: "215 kg Drum Net / 3.1 kg Cans",
    specifications: {
      "Brix Refractometer": "Min 16.0° - 18.0°",
      Acidity: "0.50% - 0.75% as Citric Acid",
      pH: "3.6 - 4.2",
      Color: "Deep Golden Yellow",
      Sterility: "Commercially Sterile (Aseptic Flash Pasteurization)",
    },
    applications: [
      "Fruit Juices, Nectars & Smoothies",
      "Dairy Products (Ice Creams, Yogurts, Lassi)",
      "Bakery Jams, Pastry Fillings & Confectionery",
      "Infant Purees & Cocktail Mixers",
    ],
    industries: ["Food Processing", "Consumer Retail"],
    moq: "1x 20ft FCL (80 Drums x 215kg = 17.2 MT)", // TODO: replace with real data
    packaging: "215kg Aseptic Bag in Steel Drums or OTS Cans (6x 3.1kg per master carton)",
    customization: false,
    countryOfOrigin: "India",
    hsCode: "20079910", // TODO: replace with real data
    certifications: ["FSSC 22000", "USFDA Registered", "SGF Verified", "Non-GMO"],
    availableMarkets: ["European Union", "United Kingdom", "Middle East", "North America"],
    relatedProductIds: ["prod-onion-flakes", "prod-turmeric-fingers"],
    isFeatured: false,
  },

  // 5. Hardware & Tools
  {
    id: "prod-door-handles",
    slug: "stainless-steel-lever-door-handles",
    name: "Architectural Stainless Steel 304 Lever Handles",
    sku: "HRD-HND-009", // TODO: replace with real data
    category: "Hardware & Tools",
    subcategory: "Architectural Hardware",
    shortDescription:
      "EN 1906 Grade 4 tested solid stainless steel lever handles engineered for commercial buildings and residential towers.",
    fullDescription:
      "Crafted in Rajkot's architectural hardware cluster. Fabricated from precision investment cast AISI 304/316 grade stainless steel with high-cycle internal spring cassettes tested to 200,000 operation cycles. Available in Satin Brush, PVD Matte Black, and Polished Brass finishes.",
    images: ["/images/products/prod-handles-1.png", "/images/products/prod-handles-2.png"],
    material: "Forged & Cast Stainless Steel AISI 304 / AISI 316",
    grade: "EN 1906 Category of Use: Grade 4 (High Frequency)", // TODO: replace with real data
    dimensions: "Lever Length: 135 mm, Rose Diameter: 53 mm, Spindle: 8x8 mm",
    specifications: {
      "Corrosion Resistance": "EN 1670 Grade 4 (>240 Hours Neutral Salt Spray)",
      "Cycle Durability": "200,000 test cycles without mechanical failure",
      Finishes: "Satin Stainless Steel (SSS), PVD Black, PVD Rose Gold, Antique Bronze",
      Accessories: "Through-bolts, grub screws, 8mm spindle, allen key included",
    },
    applications: [
      "Commercial Office Towers & Corporate Headquarters",
      "Luxury Hotels & Hospitality Resorts",
      "High-Density Residential Real Estate Projects",
      "Hospital & Institutional Cleanrooms",
    ],
    industries: ["Construction", "Engineering", "Consumer Retail"],
    moq: "500 Pairs", // TODO: replace with real data
    packaging: "Individual foam-cushioned color gift box, 20 pairs per master export carton",
    customization: true,
    countryOfOrigin: "India (Rajkot, Gujarat)",
    hsCode: "83024110", // TODO: replace with real data
    certifications: ["CE Marked", "EN 1906 Certified", "ISO 9001:2015"],
    availableMarkets: ["European Union", "United Kingdom", "Middle East", "Australia", "North America"],
    relatedProductIds: ["prod-hand-tools", "prod-vitrified-tiles"],
    isFeatured: true,
  },
  {
    id: "prod-hand-tools",
    slug: "chrome-vanadium-combination-spanners",
    name: "Drop-Forged Chrome Vanadium Spanners & Hand Tools",
    sku: "HRD-TLS-010", // TODO: replace with real data
    category: "Hardware & Tools",
    subcategory: "Industrial Hand Tools",
    shortDescription:
      "Heat-treated DIN 3113 compliant combination wrenches with mirror chrome finish and high torque resistance.",
    fullDescription:
      "Forged from select 31CrV3 chrome-vanadium tool steel under heavy mechanical presses in Rajkot. Hardened and tempered to 44 - 50 HRC to prevent jaw slippage, rounded corners, or brittle fracture under extreme mechanical lever load.",
    images: ["/images/products/prod-tools-1.png", "/images/products/prod-tools-2.png"],
    material: "Drop-Forged 31CrV3 Chrome-Vanadium Alloy Steel",
    grade: "DIN 3113 Standard / ANSI B107.6", // TODO: replace with real data
    dimensions: "Metric Sizes 6mm to 32mm / Imperial Sizes 1/4\" to 1-1/4\"",
    specifications: {
      Hardness: "44 - 50 HRC Through-hardened",
      Torque: "Exceeds DIN/ISO torque specification by 30%",
      Finish: "Fully Mirror Polished Nickel-Chrome Plating",
      Jaw: "15° Offset Ring Head with Maxi-Drive profile",
    },
    applications: [
      "Automotive Repair Shops & Dealership Service Centers",
      "Heavy Machinery Maintenance & Mining Operations",
      "Industrial Assembly Lines",
      "DIY Hardware Wholesalers & Tool Distributors",
    ],
    industries: ["Automotive", "Engineering", "Construction"],
    moq: "1,000 Sets or 2,000 Individual Units", // TODO: replace with real data
    packaging: "Heavy-duty canvas roll pouches or blow-mold cases in export shipping cartons",
    customization: true,
    countryOfOrigin: "India (Rajkot, Gujarat)",
    hsCode: "82041110", // TODO: replace with real data
    certifications: ["ISO 9001", "GS TUV Safety Mark Compatible"],
    availableMarkets: ["North America", "European Union", "Middle East", "Latin America"],
    relatedProductIds: ["prod-door-handles", "prod-brass-inserts"],
    isFeatured: false,
  },

  // 6. Consumer Goods & Ceramics
  {
    id: "prod-vitrified-tiles",
    slug: "glazed-vitrified-porcelain-floor-tiles",
    name: "Polished Glazed Vitrified Porcelain Tiles (Morbi Hub)",
    sku: "CER-TIL-011", // TODO: replace with real data
    category: "Consumer Goods",
    subcategory: "Ceramics & Surfaces",
    shortDescription:
      "Italian marble-look nano-polished porcelain floor tiles with <0.05% water absorption and scratch-proof glaze.",
    fullDescription:
      "Manufactured in Morbi (the world's 2nd largest ceramic manufacturing hub, 60km from Rajkot). Pressed on SACMI high-tonnage hydraulic presses and fired at 1220°C. Features high-definition 12-color digital inkjet printing mimicking natural Carrara, Statuario, and Onyx marbles.",
    images: ["/images/products/prod-tiles-1.png", "/images/products/prod-tiles-2.png"],
    material: "Dense Vitrified Porcelain Clay Body with Nano Glaze",
    grade: "ISO 13006 / EN 14411 Group BIa (Water Absorption < 0.05%)", // TODO: replace with real data
    dimensions: "600x600 mm, 600x1200 mm, 800x1600 mm / Thickness: 9.0 mm",
    specifications: {
      "Water Absorption": "< 0.05%",
      "Modulus of Rupture": "> 40 N/mm²",
      "Surface Abrasion": "PEI IV / PEI V (Heavy Commercial Foot Traffic)",
      Rectification: "Perfect Right Angle Rectified Edges (±0.1% dimension tolerance)",
      "Frost Resistance": "Frost Proof (Exceeds 100 Freeze-Thaw Cycles)",
    },
    applications: [
      "Commercial Shopping Malls & Airport Terminals",
      "Luxury Residential Living Areas & Kitchens",
      "Exterior Facade Cladding & Hotel Lobbies",
      "High-Traffic Public Transit Stations",
    ],
    industries: ["Construction", "Consumer Retail"],
    moq: "1x 20ft Container (1,380 m² / ~27 Tons max container payload)", // TODO: replace with real data
    packaging: "Corrugated boxes with corner plastic protectors, shrink-wrapped on fumigated wooden pallets",
    customization: true,
    countryOfOrigin: "India (Morbi, Gujarat)",
    hsCode: "69072100", // TODO: replace with real data
    certifications: ["CE Marking", "ISO 9001:2015", "SASO Certified for Saudi Arabia", "SONCAP"],
    availableMarkets: ["Middle East", "North America", "European Union", "East Africa", "Australia"],
    relatedProductIds: ["prod-sanitaryware", "prod-door-handles"],
    isFeatured: true,
  },
  {
    id: "prod-sanitaryware",
    slug: "vitreous-china-ceramic-sanitaryware",
    name: "Designer Vitreous China Ceramic Sanitaryware Sets",
    sku: "CER-SAN-012", // TODO: replace with real data
    category: "Consumer Goods",
    subcategory: "Ceramics & Sanitary",
    shortDescription:
      "Tornado dual-flush rimless water closets and thin-rim ceramic countertop wash basins with anti-bacterial glaze.",
    fullDescription:
      "Precision slip-cast and high-pressure glazed in Morbi manufacturing facilities. Features rimless flushing hydraulics that clean 100% of the interior bowl with only 3L/4.5L dual water volume. Coated with anti-bacterial nano-glaze that repels stains, limescale, and bacteria.",
    images: ["/images/products/prod-sanitary-1.png", "/images/products/prod-sanitary-2.png"],
    material: "100% Vitreous China Clay Ceramic",
    grade: "First Choice Export Quality", // TODO: replace with real data
    dimensions: "WC: 650x360x780 mm, Basin: 500x380x130 mm",
    specifications: {
      "Flush System": "Rimless Tornado Dual Flush 3L/4.5L",
      Trap: "S-Trap 220/300 mm or P-Trap 180 mm Rough-in",
      Seat: "Duroplast Soft-Close UF Seat Cover Included",
      "Glaze Thickness": "0.8 - 1.1 mm Self-Cleaning Nano Glaze",
    },
    applications: [
      "Luxury Residential Developments",
      "Boutique Hotels & Commercial Restrooms",
      "Plumbing Wholesalers & Showroom Chains",
      "Government Housing Infrastructure Projects",
    ],
    industries: ["Construction", "Consumer Retail"],
    moq: "1x 40ft High Cube Container (Approx 450 - 500 sets)", // TODO: replace with real data
    packaging: "Heavy 5-ply honeycomb export carton with moulded styrofoam padding",
    customization: true,
    countryOfOrigin: "India (Morbi, Gujarat)",
    hsCode: "69101000", // TODO: replace with real data
    certifications: ["CE EN 997", "WaterMark (Australia)", "SASO Certified"],
    availableMarkets: ["Middle East", "European Union", "United Kingdom", "Africa"],
    relatedProductIds: ["prod-vitrified-tiles", "prod-door-handles"],
    isFeatured: false,
  },
];

// Helper functions for easy querying
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return PRODUCTS.filter((p) => product.relatedProductIds.includes(p.id));
}
