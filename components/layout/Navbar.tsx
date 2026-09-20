"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Wheat,
  Settings,
  Layers,
  Package,
  Wrench,
  Home,
  Grid,
  FileText,
  Bot,
  Building2,
  Star,
  GitBranch,
  Factory,
  Award,
  BookOpen,
  Map,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  Phone,
  Globe2,
} from "lucide-react";
import {
  COMPANY_SHORT_NAME,
  COMPANY_PHONE,
  COMPANY_WHATSAPP_LINK,
} from "@/lib/constants";

// Map string icon names to Lucide icons
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat,
  Settings,
  Layers,
  Package,
  Wrench,
  Home,
  Grid,
  FileText,
  Bot,
  Building2,
  Star,
  GitBranch,
  Factory,
  Award,
  BookOpen,
  Map,
  HelpCircle,
};

interface DropdownLink {
  label: string;
  href: string;
  icon: string;
  desc: string;
}

interface MegaDropdown {
  type: "mega";
  sections: {
    title: string;
    links: DropdownLink[];
  }[];
  featured: {
    label: string;
    desc: string;
    href: string;
    badge: string;
  };
}

interface SimpleDropdown {
  type: "simple";
  links: DropdownLink[];
}

type DropdownConfig = MegaDropdown | SimpleDropdown | null;

interface NavItem {
  label: string;
  href: string;
  dropdown: DropdownConfig;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    dropdown: {
      type: "mega",
      sections: [
        {
          title: "By Category",
          links: [
            {
              label: "Agricultural Products",
              href: "/products?cat=agricultural#category-agricultural",
              icon: "Wheat",
              desc: "Cumin, Turmeric, Spices",
            },
            {
              label: "Industrial Components",
              href: "/products?cat=industrial#category-industrial",
              icon: "Settings",
              desc: "Brass, Flanges, Parts",
            },
            {
              label: "Textiles",
              href: "/products?cat=textiles#category-textiles",
              icon: "Layers",
              desc: "Cotton Yarn, Fabrics",
            },
            {
              label: "Processed Food",
              href: "/products?cat=food#category-food",
              icon: "Package",
              desc: "Onion Flakes, Mango Pulp",
            },
            {
              label: "Hardware & Tools",
              href: "/products?cat=hardware#category-hardware",
              icon: "Wrench",
              desc: "Handles, Spanners",
            },
            {
              label: "Consumer Goods",
              href: "/products?cat=consumer#category-consumer",
              icon: "Home",
              desc: "Tiles, Sanitaryware",
            },
          ],
        },
        {
          title: "Quick Actions",
          links: [
            {
              label: "Browse All Products",
              href: "/products",
              icon: "Grid",
              desc: "Full catalog",
            },
            {
              label: "Request a Quote",
              href: "/contact",
              icon: "FileText",
              desc: "Get pricing fast",
            },
            {
              label: "Ask AI Assistant",
              href: "/#ai-chat",
              icon: "Bot",
              desc: "Instant answers",
            },
          ],
        },
      ],
      featured: {
        label: "Featured Export Item",
        desc: "Premium Whole Cumin Seeds (99.5% Sortex Cleaned)",
        href: "/products/premium-whole-cumin-seeds",
        badge: "Top Export",
      },
    },
  },
  {
    label: "Company",
    href: "/about",
    dropdown: {
      type: "simple",
      links: [
        {
          label: "About KC",
          href: "/about",
          icon: "Building2",
          desc: "Our story and mission",
        },
        {
          label: "Why Choose Us",
          href: "/why-kc",
          icon: "Star",
          desc: "Our differentiators",
        },
        {
          label: "Export Process",
          href: "/export-process",
          icon: "GitBranch",
          desc: "How we work",
        },
        {
          label: "Industries Served",
          href: "/industries",
          icon: "Factory",
          desc: "Sectors we supply",
        },
        {
          label: "Certifications",
          href: "/about#certifications",
          icon: "Award",
          desc: "Quality standards",
        },
      ],
    },
  },
  {
    label: "Resources",
    href: "/blog",
    dropdown: {
      type: "simple",
      links: [
        {
          label: "Trade Blog",
          href: "/blog",
          icon: "BookOpen",
          desc: "Export guides & insights",
        },
        {
          label: "Export Process Guide",
          href: "/export-process",
          icon: "Map",
          desc: "Step by step walkthrough",
        },
        {
          label: "FAQ",
          href: "/export-process#faq",
          icon: "HelpCircle",
          desc: "Common questions",
        },
      ],
    },
  },
  { label: "Contact", href: "/contact", dropdown: null },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    Products: false,
    Company: false,
    Resources: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll detection (80px threshold)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns and drawer on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Outside click & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    // Only use hover on desktop devices with fine pointer (mouse)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      setActiveDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      leaveTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  const toggleMobileSection = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLinkClick = (e: React.MouseEvent, href: string, label: string) => {
    if (label === "Ask AI Assistant" || href === "/#ai-chat") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
      setActiveDropdown(null);
      setMobileOpen(false);
      return;
    }
    if (href.includes("?cat=") && pathname === "/products") {
      setTimeout(() => {
        const target = document.getElementById("catalog-products-section");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  // Lock body scroll when mobile drawer is open and close on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top micro trust bar */}
      <div className="bg-[#091426] text-white/80 text-xs py-1.5 px-4 hidden sm:block border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Globe2 className="w-3.5 h-3.5" />
              Direct Gujarat Export House
            </span>
            <span className="text-white/30">|</span>
            <span>Rajkot, Gujarat, India</span>
            <span className="text-white/30">|</span>
            <span>IEC &amp; Customs Registered</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Phone className="w-3 h-3 text-[#F5A623]" />
              <span>Export Desk: {COMPANY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header
        ref={navRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/80"
            : "bg-[#0B172B]/90 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#F5A623] rounded-lg p-1"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition ${
                  isScrolled
                    ? "bg-[#1B3A6B] text-white"
                    : "bg-white/10 text-white border border-white/20"
                }`}
              >
                <Building2 className="w-5 h-5 text-[#F5A623]" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl sm:text-2xl font-black tracking-tight transition ${
                    isScrolled ? "text-[#1B3A6B]" : "text-white"
                  }`}
                >
                  {COMPANY_SHORT_NAME}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5A623]">
                  Pvt. Ltd. • India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Mega Dropdown triggers */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
              aria-label="Main Navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const isOpen = activeDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Trigger Button when dropdown exists, or direct Link if no dropdown */}
                    {item.dropdown ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveDropdown((prev) =>
                            prev === item.label ? null : item.label
                          );
                        }}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5A623] cursor-pointer ${
                          isScrolled
                            ? isActive || isOpen
                              ? "text-[#1B3A6B] font-bold"
                              : "text-gray-700 hover:text-[#1B3A6B] hover:bg-gray-50"
                            : isActive || isOpen
                            ? "text-white font-bold"
                            : "text-gray-200 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#F5A623]" : "opacity-60"
                          }`}
                        />

                        {/* Active route dot */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavDot"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5A623]"
                          />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${
                          isScrolled
                            ? isActive
                              ? "text-[#1B3A6B] font-bold"
                              : "text-gray-700 hover:text-[#1B3A6B] hover:bg-gray-50"
                            : isActive
                            ? "text-white font-bold"
                            : "text-gray-200 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeNavDot"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5A623]"
                          />
                        )}
                      </Link>
                    )}

                    {/* Dropdown Panels */}
                    <AnimatePresence>
                      {isOpen && item.dropdown && (
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scaleY: 0.95, y: -6 }
                          }
                          animate={
                            shouldReduceMotion
                              ? { opacity: 1 }
                              : { opacity: 1, scaleY: 1, y: 0 }
                          }
                          exit={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scaleY: 0.95, y: -6 }
                          }
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{ transformOrigin: "top" }}
                          className={`absolute top-full pt-2 z-50 ${
                            item.dropdown.type === "mega"
                              ? "-left-28 sm:-left-36 lg:-left-20 w-[min(94vw,700px)]"
                              : "left-0 w-[280px]"
                          }`}
                        >
                          <div className="bg-white border-t-4 border-[#F5A623] shadow-2xl rounded-b-2xl p-5 sm:p-6 text-gray-900 border-x border-b border-gray-100">
                            {/* Mega Dropdown Layout */}
                            {item.dropdown.type === "mega" && (
                              <div className="grid grid-cols-12 gap-6">
                                {/* Left & Mid Column: Sections */}
                                <div className="col-span-8 space-y-6">
                                  {item.dropdown.sections.map((sec) => (
                                    <div key={sec.title} className="space-y-2">
                                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                                        {sec.title}
                                      </p>
                                      <div
                                        className={
                                          sec.title === "By Category"
                                            ? "grid grid-cols-2 gap-2"
                                            : "grid grid-cols-2 gap-2"
                                        }
                                      >
                                        {sec.links.map((link) => {
                                          const Icon =
                                            ICON_MAP[link.icon] || Grid;
                                          return (
                                            <Link
                                              key={link.label}
                                              href={link.href}
                                              onClick={(e) => handleLinkClick(e, link.href, link.label)}
                                              className="group flex items-start gap-2.5 p-2 rounded-lg border-l-4 border-transparent hover:border-[#F5A623] hover:bg-[#FFF8EE] transition-all"
                                            >
                                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1B3A6B] group-hover:text-[#F5A623] group-hover:bg-amber-100/60 transition-colors shrink-0">
                                                <Icon className="w-4 h-4" />
                                              </div>
                                              <div>
                                                <div className="text-xs font-bold text-[#1B3A6B] group-hover:text-[#F5A623] transition-colors leading-tight">
                                                  {link.label}
                                                </div>
                                                <div className="text-[11px] text-gray-500 line-clamp-1">
                                                  {link.desc}
                                                </div>
                                              </div>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Right Column: Featured Card */}
                                <div className="col-span-4 flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-[#FFF8EE] via-amber-50 to-orange-50/60 border border-amber-200/70">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F5A623] text-gray-950 px-2 py-0.5 rounded-full shadow-xs">
                                        {item.dropdown.featured.badge}
                                      </span>
                                      <Building2 className="w-4 h-4 text-[#F5A623]" />
                                    </div>
                                     <p className="text-sm font-bold text-[#1B3A6B] font-serif">
                                       {item.dropdown.featured.label}
                                     </p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                      {item.dropdown.featured.desc}
                                    </p>
                                  </div>
                                  <Link
                                    href={item.dropdown.featured.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition-colors pt-4"
                                  >
                                    <span>View Product Specs</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            )}

                            {/* Simple Dropdown Layout */}
                            {item.dropdown.type === "simple" && (
                              <div className="space-y-1">
                                {item.dropdown.links.map((link) => {
                                  const Icon = ICON_MAP[link.icon] || Grid;
                                  return (
                                    <Link
                                      key={link.label}
                                      href={link.href}
                                      onClick={(e) => handleLinkClick(e, link.href, link.label)}
                                      className="group flex items-start gap-3 p-2.5 rounded-lg border-l-4 border-transparent hover:border-[#F5A623] hover:bg-[#FFF8EE] transition-all"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1B3A6B] group-hover:text-[#F5A623] group-hover:bg-amber-100/60 transition-colors shrink-0">
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <div className="text-xs font-bold text-[#1B3A6B] group-hover:text-[#F5A623] transition-colors leading-tight">
                                          {link.label}
                                        </div>
                                        <div className="text-[11px] text-gray-500">
                                          {link.desc}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right: Request a Quote CTA with framer-motion micro-interactions */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        boxShadow: isScrolled
                          ? "0 10px 25px -5px rgba(245, 166, 35, 0.5)"
                          : "0 10px 25px -5px rgba(255, 255, 255, 0.4)",
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="rounded-xl"
              >
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 ${
                    isScrolled
                      ? "btn-glow bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] shadow-md"
                      : "border-2 border-white/80 text-white hover:bg-white hover:text-[#1B3A6B] backdrop-blur-xs"
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
                className={`p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] transition ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#1B3A6B] hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer with Backdrop (outside <header> to ensure true full-screen fixed positioning) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            />

            {/* Drawer (slides in from left, full viewport height) */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden fixed inset-y-0 left-0 w-[85%] max-w-[340px] h-full bg-white z-[1000] shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
                {/* Drawer Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1B3A6B] flex items-center justify-center text-white">
                      <Building2 className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <span className="text-lg font-black text-[#1B3A6B]">
                      {COMPANY_SHORT_NAME}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation drawer"
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Navigation Links with Accordion */}
                <div className="p-4 space-y-1 flex-1">
                  {NAV_ITEMS.map((item) => {
                    const hasDropdown = Boolean(item.dropdown);
                    const isExpanded = mobileExpanded[item.label];
                    const isActive = pathname === item.href;

                    return (
                      <div
                        key={item.label}
                        className="border-b border-gray-50 pb-1"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2.5 px-3 text-sm font-bold transition rounded-lg ${
                              isActive
                                ? "text-[#1B3A6B] bg-amber-50/70 border-l-4 border-[#F5A623]"
                                : "text-gray-800 hover:text-[#1B3A6B]"
                            }`}
                          >
                            {item.label}
                          </Link>

                          {hasDropdown && (
                            <button
                              type="button"
                              onClick={() => toggleMobileSection(item.label)}
                              aria-label={`Toggle ${item.label} menu`}
                              className="p-2 text-gray-500 hover:text-[#1B3A6B]"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isExpanded ? "rotate-180 text-[#F5A623]" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Accordion Content */}
                        <AnimatePresence>
                          {hasDropdown && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 pr-1 py-2 space-y-1.5 bg-gray-50/80 rounded-lg"
                            >
                              {item.dropdown?.type === "mega" &&
                                item.dropdown.sections.map((sec) =>
                                  sec.links.map((link) => (
                                    <Link
                                      key={link.label}
                                      href={link.href}
                                      onClick={(e) => handleLinkClick(e, link.href, link.label)}
                                      className="flex items-center gap-2 py-1.5 px-2 text-xs font-semibold text-gray-600 hover:text-[#1B3A6B] hover:bg-white rounded transition"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                                      <span>{link.label}</span>
                                    </Link>
                                  ))
                                )}

                              {item.dropdown?.type === "simple" &&
                                item.dropdown.links.map((link) => (
                                  <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href, link.label)}
                                    className="flex items-center gap-2 py-1.5 px-2 text-xs font-semibold text-gray-600 hover:text-[#1B3A6B] hover:bg-white rounded transition"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                                    <span>{link.label}</span>
                                  </Link>
                                ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom of Drawer: Quote & WhatsApp side by side */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="btn-glow flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#F5A623] text-[#1B3A6B] font-bold text-xs shadow-sm text-center"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={COMPANY_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#075E54] hover:bg-[#05463E] text-white font-bold text-xs shadow-sm text-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <div className="text-center text-[11px] text-gray-500">
                    Direct Export Desk: {COMPANY_PHONE}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </>
  );
}
