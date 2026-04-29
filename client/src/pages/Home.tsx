import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X, Shield, Zap, AlertTriangle, BookOpen, Users, Swords, Car, Heart, Building2, Globe, Cpu, Scroll } from "lucide-react";
import {
  NAV_SECTIONS, DEFINITIONS, GLOBAL_RULES, CITY_RULES, OUTLANDS_RULES,
  ECONOMY_RULES, ROBBERIES, ROBBERY_GENERAL_RULES, ROBBERY_RESPONSE_VEHICLE_RULES,
  STCF_RULES, SMU_RULES, GANG_RULES, WAR_RULES, VEHICLE_TIERS, VEHICLE_TYPES,
  LORE_PARAGRAPHS, type FactionColor, type RuleBlock
} from "@/lib/handbookData";

// ============================================================
// DESIGN: Neon Noir Ops Terminal
// - Void-black canvas, neon faction accents as borders/glows
// - Space Grotesk headings, JetBrains Mono for codes/IDs
// - Persistent sidebar with scroll-spy, expandable rule cards
// ============================================================

const FACTION_COLORS: Record<FactionColor, { text: string; border: string; bg: string; badge: string }> = {
  city:     { text: 'text-blue-400',   border: 'border-l-blue-500',   bg: 'bg-blue-500/10',   badge: 'badge-city' },
  outlands: { text: 'text-red-400',    border: 'border-l-red-500',    bg: 'bg-red-500/10',    badge: 'badge-outlands' },
  smu:      { text: 'text-green-400',  border: 'border-l-green-500',  bg: 'bg-green-500/10',  badge: 'badge-smu' },
  warning:  { text: 'text-amber-400',  border: 'border-l-amber-500',  bg: 'bg-amber-500/10',  badge: 'badge-warning' },
  lore:     { text: 'text-purple-400', border: 'border-l-purple-500', bg: 'bg-purple-500/10', badge: 'badge-lore' },
  neutral:  { text: 'text-slate-400',  border: 'border-l-slate-600',  bg: 'bg-white/[0.03]',  badge: '' },
};

const SECTION_ICONS: Record<string, React.ReactNode> = {
  home: <Globe size={14} />,
  'world-structure': <Globe size={14} />,
  'global-rules': <Shield size={14} />,
  'city-rules': <Building2 size={14} />,
  'outlands-rules': <Zap size={14} />,
  economy: <BookOpen size={14} />,
  robberies: <Car size={14} />,
  stcf: <Shield size={14} />,
  smu: <Heart size={14} />,
  gangs: <Users size={14} />,
  'gang-war': <Swords size={14} />,
  developer: <Cpu size={14} />,
  lore: <Scroll size={14} />,
};

function FactionBadge({ type, label }: { type: FactionColor; label: string }) {
  return <span className={FACTION_COLORS[type].badge || 'badge-lore'}>{label}</span>;
}

function RuleCard({ block }: { block: RuleBlock }) {
  const [open, setOpen] = useState(false);
  const colors = FACTION_COLORS[block.color];
  return (
    <div className={`rule-card border-l-4 ${colors.border} ${colors.bg} rounded-r-md`}>
      <button
        className="accordion-trigger-custom rounded-r-md"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={`font-semibold text-sm ${colors.text}`}>{block.title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} className="text-slate-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="pb-4 px-5 space-y-2">
              {block.rules.map(rule => (
                <li key={rule.id} className="flex gap-2 text-sm leading-relaxed">
                  <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${
                    rule.type === 'warning' ? 'bg-amber-400' :
                    rule.type === 'city' ? 'bg-blue-400' :
                    rule.type === 'outlands' ? 'bg-red-400' :
                    rule.type === 'smu' ? 'bg-green-400' :
                    rule.type === 'lore' ? 'bg-purple-400' :
                    'bg-slate-600'
                  }`} />
                  <span className={rule.type === 'warning' ? 'text-amber-200/90' : 'text-slate-300'}>{rule.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeader({ title, color, icon, id }: { title: string; color: FactionColor; icon?: React.ReactNode; id?: string }) {
  const colors = FACTION_COLORS[color];
  return (
    <div className="section-header" id={id}>
      {icon && <span className={colors.text}>{icon}</span>}
      <h2 className={`text-xl font-bold tracking-tight ${colors.text}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h2>
      <div className={`section-header-line ${colors.text}`} />
    </div>
  );
}

function RobberyCard({ robbery }: { robbery: typeof ROBBERIES[0] }) {
  const [tab, setTab] = useState<'city' | 'outlands' | 'general'>('city');
  const hasCityRules = !!robbery.cityRules;
  const hasOutlandsRules = !!robbery.outlandsRules;
  const hasGeneralRules = !!robbery.generalRules;
  const activeTab = hasGeneralRules ? 'general' : hasCityRules ? tab : 'outlands';

  const renderRulesTable = (rules: typeof robbery.cityRules, zoneColor: FactionColor) => {
    if (!rules) return null;
    const c = FACTION_COLORS[zoneColor];
    return (
      <div className="overflow-x-auto">
        <table className="compare-table w-full">
          <tbody>
            {[
              ['Police', rules.police],
              ['Robbers', rules.robbers],
              ['Robber Vehicles', rules.robberVehicles],
              ['PD Vehicles', rules.pdVehicles],
              ['Weapons', rules.weapons],
              rules.hostage ? ['Hostage', rules.hostage] : null,
              ['Demands', rules.demands],
            ].filter((x): x is string[] => x !== null).map(([label, value]) => (
              <tr key={label as string}>
                <td className="font-mono text-xs text-slate-500 w-36 whitespace-nowrap">{label}</td>
                <td className={`text-sm ${c.text}`}>{value as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rules.notes && rules.notes.length > 0 && (
          <div className="mt-3 space-y-1">
            {rules.notes.map((note, i) => (
              <div key={i} className="flex gap-2 text-xs text-amber-300/80">
                <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                {note}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="robbery-card">
      <div className="robbery-card-header">
        <div>
          <h3 className="font-bold text-sm text-white">{robbery.name}</h3>
          {robbery.requiredItems && (
            <div className="flex flex-wrap gap-1 mt-1">
              {robbery.requiredItems.map(item => (
                <span key={item} className="badge-lore">{item}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {robbery.minPD > 0 && (
            <div className="flex items-center gap-1 text-xs text-blue-400 font-mono">
              <Shield size={11} />
              <span>Min {robbery.minPD} PD</span>
            </div>
          )}
        </div>
      </div>
      <div className="robbery-card-body">
        {!hasGeneralRules && (
          <div className="flex gap-1 mb-4">
            {hasCityRules && (
              <button
                onClick={() => setTab('city')}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded transition-all ${
                  activeTab === 'city'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >CITY</button>
            )}
            {hasOutlandsRules && (
              <button
                onClick={() => setTab('outlands')}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded transition-all ${
                  activeTab === 'outlands'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >OUTLANDS</button>
            )}
          </div>
        )}
        {hasGeneralRules ? (
          <ul className="space-y-2">
            {(robbery.generalRules ?? []).map((rule, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500/60" />
                {rule}
              </li>
            ))}
          </ul>
        ) : (
          <>
            {activeTab === 'city' && renderRulesTable(robbery.cityRules, 'city')}
            {activeTab === 'outlands' && renderRulesTable(robbery.outlandsRules, 'outlands')}
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainRef = useRef<HTMLDivElement>(null);

  const setRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (slug: string) => {
    const el = sectionRefs.current[slug];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  };

  const Sidebar = () => (
    <nav className="h-full flex flex-col overflow-y-auto py-4" style={{ background: 'var(--sidebar)' }}>
      {/* Logo */}
      <div className="px-4 pb-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
            <span className="text-blue-400 text-xs font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>SP</span>
          </div>
          <div>
            <div className="text-white text-xs font-bold" style={{ fontFamily: 'Orbitron, monospace', letterSpacing: '0.05em' }}>SPADIKAM</div>
            <div className="text-slate-500 text-[10px] font-mono">OPS HANDBOOK</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 pt-2">
        <div className="nav-group-label">Navigation</div>
        {NAV_SECTIONS.map(section => {
          const isActive = activeSection === section.slug;
          const colors = FACTION_COLORS[section.color];
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.slug)}
              className={`nav-item w-full ${isActive ? 'active' : ''}`}
              style={isActive ? { borderLeftColor: `var(--color-${section.color === 'city' ? 'city-blue' : section.color === 'outlands' ? 'outlands-red' : section.color === 'smu' ? 'smu-green' : section.color === 'warning' ? 'warning-amber' : section.color === 'lore' ? 'lore-purple' : 'slate-600'})` } : {}}
            >
              <span className={isActive ? colors.text : 'text-slate-600'}>{SECTION_ICONS[section.id]}</span>
              <span>{section.shortTitle}</span>
              {isActive && <span className={`ml-auto w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`} />}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 pt-4 border-t border-white/8">
        <div className="text-[10px] font-mono text-slate-600 leading-relaxed">
          <div>SPADIKAM ROLEPLAY</div>
          <div>Operational Handbook</div>
          <div className="text-slate-700 mt-1">v2025 — Comprehensive Edition</div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/8 h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-64 z-50 border-r border-white/8 lg:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b border-white/8 lg:hidden" style={{ background: 'var(--background)' }}>
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 hover:text-white transition-colors">
            <Menu size={20} />
          </button>
          <span className="text-white text-sm font-bold" style={{ fontFamily: 'Orbitron, monospace', letterSpacing: '0.05em' }}>SPADIKAM</span>
          <span className="text-slate-500 text-xs font-mono ml-auto">OPS HANDBOOK</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

          {/* ===== HOME / HERO ===== */}
          <section id="home" ref={setRef('home')} className="pt-0">
            <div className="relative overflow-hidden rounded-b-xl mb-12" style={{ minHeight: '420px' }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663494392763/LYGpcqscuZgjXkrFAXZ26L/spadikam-hero-bg-3k8KnmH7Y8ErSSurTNnTpw.webp"
                alt="Spadikam — The Divided Land"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="hero-overlay absolute inset-0" />
              <div className="relative z-10 flex flex-col justify-end h-full p-8 pt-32">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-city">CITY</span>
                  <span className="text-slate-500 font-mono text-xs">vs</span>
                  <span className="badge-outlands">OUTLANDS</span>
                  <span className="badge-warning ml-2">OFFICIAL HANDBOOK</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                  SPADIKAM<br />
                  <span className="text-blue-400">ROLEPLAY</span>
                </h1>
                <p className="text-slate-400 text-sm font-mono max-w-lg mt-2">
                  Operational Handbook — Rules, Systems, Operations, and Appendices
                </p>
                <p className="text-slate-600 text-xs font-mono mt-1 italic">
                  "The land was divided. What happens next… is up to the people who live here."
                </p>
              </div>
            </div>

            {/* Quick Nav Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
              {[
                { slug: 'city-rules', label: 'City Rules', color: 'city' as FactionColor, img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494392763/LYGpcqscuZgjXkrFAXZ26L/spadikam-city-card-LrR2svMFJY96enHnxwdBR7.webp' },
                { slug: 'outlands-rules', label: 'Outlands Rules', color: 'outlands' as FactionColor, img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494392763/LYGpcqscuZgjXkrFAXZ26L/spadikam-outlands-card-RjcAHn5VaHxreeNQgYqxaf.webp' },
                { slug: 'robberies', label: 'Robberies', color: 'outlands' as FactionColor, icon: <Car size={24} className="text-red-400" /> },
                { slug: 'stcf', label: 'STCF Police', color: 'city' as FactionColor, icon: <Shield size={24} className="text-blue-400" /> },
                { slug: 'smu', label: 'SMU / EMS', color: 'smu' as FactionColor, icon: <Heart size={24} className="text-green-400" /> },
                { slug: 'gangs', label: 'Gang Systems', color: 'outlands' as FactionColor, icon: <Users size={24} className="text-red-400" /> },
              ].map(item => (
                <button
                  key={item.slug}
                  onClick={() => scrollTo(item.slug)}
                  className={`relative overflow-hidden rounded-lg border border-white/8 p-4 text-left transition-all hover:border-white/20 hover:scale-[1.02] group`}
                  style={{ background: 'var(--card)' }}
                >
                  {item.img && (
                    <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                  )}
                  <div className="relative z-10">
                    {item.icon && <div className="mb-2">{item.icon}</div>}
                    <div className={`text-xs font-mono font-bold ${FACTION_COLORS[item.color].text}`}>{item.label}</div>
                    <ChevronRight size={12} className="text-slate-600 mt-1" />
                  </div>
                </button>
              ))}
            </div>

            {/* How to Use */}
            <div className="card-lore rule-card rounded-r-md mb-12">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">How to Use This Handbook</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This handbook is the authoritative operational reference for Spadikam Roleplay. <strong className="text-white">Global rules apply everywhere</strong> unless a later section clearly changes behavior by zone. City sections describe high-control full-roleplay standards. Outlands sections describe flow-RP, gang-dominant, combat-forward gameplay while still preserving fairness, anti-exploit principles, and admin authority.
                </p>
              </div>
            </div>
          </section>

          {/* ===== WORLD STRUCTURE ===== */}
          <section id="world-structure" ref={setRef('world-structure')} className="pt-8 mb-12">
            <SectionHeader title="World Structure & Core Definitions" color="lore" icon={<Globe size={16} />} />

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="card-city rule-card rounded-r-md">
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={14} className="text-blue-400" />
                    <span className="badge-city">City Zone</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">Law-governed, full-RP, white-money zone. STCF dominant, high realism, strong admin intervention.</p>
                </div>
              </div>
              <div className="card-outlands rule-card rounded-r-md">
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-red-400" />
                    <span className="badge-outlands">Outlands Zone</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">Flow-RP / PvP zone. Gang dominant, black-money ecosystem, broader escalation, reduced police authority.</p>
                </div>
              </div>
            </div>

            <div className="card-warning rule-card rounded-r-md mb-6">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span className="text-amber-400 font-semibold text-sm">The Wall & Border System</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">The Wall is a <strong className="text-amber-300">jurisdiction boundary, not a safety exploit</strong>. Crossing the Wall can change the rules that apply to a player, but it does not erase identity, history, or accountability.</p>
                <ul className="space-y-2">
                  {[
                    'Normal situations started in the City must conclude under City rules.',
                    'Normal situations started in the Outlands must conclude under Outlands rules.',
                    'Dragging a situation across the Wall to change power balance, force intervention, or escape consequences is Fail RP.',
                    'Admins may immediately intervene, cancel, and punish when active situations are deliberately dragged across the border.',
                    'Exception: designated robbery systems and NPC heists may cross borders when their specific rules explicitly allow it.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Definitions Table */}
            <div className="card-lore rule-card rounded-r-md">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={14} className="text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">Core Definitions</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="compare-table w-full">
                    <thead>
                      <tr>
                        <th className="th-label w-40">Term</th>
                        <th className="th-label">Definition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEFINITIONS.map(def => (
                        <tr key={def.term}>
                          <td className="font-mono text-xs text-purple-300 font-semibold whitespace-nowrap">{def.term}</td>
                          <td className="text-sm text-slate-300">{def.definition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* ===== GLOBAL RULES ===== */}
          <section id="global-rules" ref={setRef('global-rules')} className="pt-8 mb-12">
            <SectionHeader title="Global Server Rules" color="warning" icon={<Shield size={16} />} />
            <div className="space-y-2">
              {GLOBAL_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>
          </section>

          {/* ===== CITY RULES ===== */}
          <section id="city-rules" ref={setRef('city-rules')} className="pt-8 mb-12">
            <SectionHeader title="City Zone Rules" color="city" icon={<Building2 size={16} />} />
            <div className="relative overflow-hidden rounded-lg mb-6" style={{ height: '160px' }}>
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663494392763/LYGpcqscuZgjXkrFAXZ26L/spadikam-city-card-LrR2svMFJY96enHnxwdBR7.webp" alt="City" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 flex items-center px-6">
                <div>
                  <div className="badge-city mb-2">CITY ZONE</div>
                  <p className="text-white text-sm font-semibold">Full Roleplay Environment</p>
                  <p className="text-slate-400 text-xs mt-1">Law-controlled · STCF Authority · White-Money Economy</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {CITY_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>
          </section>

          {/* ===== OUTLANDS RULES ===== */}
          <section id="outlands-rules" ref={setRef('outlands-rules')} className="pt-8 mb-12">
            <SectionHeader title="Outlands Zone Rules" color="outlands" icon={<Zap size={16} />} />
            <div className="relative overflow-hidden rounded-lg mb-6" style={{ height: '160px' }}>
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663494392763/LYGpcqscuZgjXkrFAXZ26L/spadikam-outlands-card-RjcAHn5VaHxreeNQgYqxaf.webp" alt="Outlands" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 flex items-center px-6">
                <div>
                  <div className="badge-outlands mb-2">OUTLANDS ZONE</div>
                  <p className="text-white text-sm font-semibold">Flow RP / PvP Territory</p>
                  <p className="text-slate-400 text-xs mt-1">Gang Dominant · Black Market · Combat Forward</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {OUTLANDS_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>

            {/* City vs Outlands Comparison */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-slate-400 text-sm font-semibold">City vs Outlands — Quick Comparison</span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-white/8">
                <table className="compare-table w-full">
                  <thead>
                    <tr>
                      <th className="th-label">Aspect</th>
                      <th className="th-city">City</th>
                      <th className="th-outlands">Outlands</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['RP Style', 'Full Roleplay', 'Flow RP / PvP'],
                      ['Dominant Force', 'STCF (Police)', 'Gangs'],
                      ['Economy', 'White Money Only', 'Black Market'],
                      ['Escalation Speed', 'Slow / Justified', 'Faster / Broader'],
                      ['Admin Oversight', 'Strict / Immediate', 'Moderate'],
                      ['Gang Activity', 'Prohibited', 'Fully Active'],
                      ['PvP Rules', 'Strict Buildup Required', 'Allowed with RP Logic'],
                       ['Warning Fire', 'Always Required', 'Required'],
                    ].map(([aspect, city, outlands]) => (
                      <tr key={aspect}>
                        <td className="font-mono text-xs text-slate-500 font-semibold">{aspect}</td>
                        <td className="text-sm text-blue-300">{city}</td>
                        <td className="text-sm text-red-300">{outlands}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ===== ECONOMY ===== */}
          <section id="economy" ref={setRef('economy')} className="pt-8 mb-12">
            <SectionHeader title="Economy & Criminal Activity" color="warning" icon={<BookOpen size={16} />} />

            {/* Economy stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Max City Robbery', value: '₹2L', color: 'city' as FactionColor },
                { label: 'Max City Ransom', value: '₹8L', color: 'warning' as FactionColor },
                { label: 'Max Gang Ransom', value: '₹10L', color: 'outlands' as FactionColor },
                { label: 'Robbery Cooldown', value: '3 hrs', color: 'warning' as FactionColor },
              ].map(stat => (
                <div key={stat.label} className={`stat-box border-t-2 ${FACTION_COLORS[stat.color].border.replace('border-l-', 'border-t-')}`}>
                  <div className={`text-xl font-black font-mono ${FACTION_COLORS[stat.color].text}`}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {ECONOMY_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>
          </section>

          {/* ===== ROBBERIES ===== */}
          <section id="robberies" ref={setRef('robberies')} className="pt-8 mb-12">
            <SectionHeader title="Robbery Systems" color="outlands" icon={<Car size={16} />} />

            {/* General Rules */}
            <div className="card-warning rule-card rounded-r-md mb-6">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span className="text-amber-400 font-semibold text-sm">Extra Basic Rules for All Robberies</span>
                </div>
                <ul className="space-y-2">
                  {ROBBERY_GENERAL_RULES.map((rule, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Response Vehicle Rules */}
            <div className="card-city rule-card rounded-r-md mb-8">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} className="text-blue-400" />
                  <span className="text-blue-400 font-semibold text-sm">Robbery Response Vehicle Rule</span>
                </div>
                <ul className="space-y-2">
                  {ROBBERY_RESPONSE_VEHICLE_RULES.map((rule, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cross-Border Rule */}
            <div className="card-lore rule-card rounded-r-md mb-8">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={14} className="text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">Cross-Border Robbery Rule</span>
                </div>
                <p className="text-sm text-slate-300">Robberies may cross the border, but the power structure is determined by where the robbery starts. Crossing the border during a robbery does not change participant caps, PD caps, or negotiation structure.</p>
              </div>
            </div>

            {/* Robbery Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {ROBBERIES.map(robbery => (
                <RobberyCard key={robbery.id} robbery={robbery} />
              ))}
            </div>
          </section>

          {/* ===== STCF ===== */}
          <section id="stcf" ref={setRef('stcf')} className="pt-8 mb-12">
            <SectionHeader title="STCF — Police Force" color="city" icon={<Shield size={16} />} />
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge-city">Law Enforcement</span>
              <span className="badge-warning">Min 30 Days Service</span>
              <span className="badge-city">City Authority</span>
              <span className="badge-outlands">Limited Outlands Authority</span>
            </div>
            <div className="space-y-2">
              {STCF_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>
          </section>

          {/* ===== SMU ===== */}
          <section id="smu" ref={setRef('smu')} className="pt-8 mb-12">
            <SectionHeader title="SMU — Emergency Medical Services" color="smu" icon={<Heart size={16} />} />
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge-smu">Medical Services</span>
              <span className="badge-smu">Neutral Faction</span>
              <span className="badge-warning">Strict Conduct</span>
            </div>
            <div className="space-y-2">
              {SMU_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>
          </section>

          {/* ===== GANGS ===== */}
          <section id="gangs" ref={setRef('gangs')} className="pt-8 mb-12">
            <SectionHeader title="Gang Systems" color="outlands" icon={<Users size={16} />} />

            {/* Gang Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Min Members', value: '13', color: 'outlands' as FactionColor },
                { label: 'Max Members', value: '35', color: 'outlands' as FactionColor },
                { label: 'Probation Hours', value: '200h', color: 'warning' as FactionColor },
                { label: 'Probation Period', value: '14 days', color: 'warning' as FactionColor },
              ].map(stat => (
                <div key={stat.label} className={`stat-box border-t-2 ${FACTION_COLORS[stat.color].border.replace('border-l-', 'border-t-')}`}>
                  <div className={`text-xl font-black font-mono ${FACTION_COLORS[stat.color].text}`}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {GANG_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>
          </section>

          {/* ===== GANG WAR / BREACH ===== */}
          <section id="gang-war" ref={setRef('gang-war')} className="pt-8 mb-12">
            <SectionHeader title="Gang War & Breach" color="outlands" icon={<Swords size={16} />} />

            {/* War Timeline */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/8" />
              {[
                { step: '01', label: 'Initial Clash', desc: 'Killing, hostage result, or retaliatory act between gangs', color: 'neutral' as FactionColor },
                { step: '02', label: 'Pre-War Stage', desc: 'Up to 24 hours. Max 6 vehicles + 1 helicopter. Official outfits required.', color: 'warning' as FactionColor },
                { step: '03', label: 'War Declaration', desc: 'Valid RP reason + face-to-face meeting required. Max 5 members.', color: 'outlands' as FactionColor },
                { step: '04', label: 'Active War', desc: 'Outlands only. "Yes All Down" to conclude. 72hr cooldown after.', color: 'outlands' as FactionColor },
              ].map((item) => (
                <div key={item.step} className="relative flex gap-4 mb-4 pl-10">
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-mono font-bold ${
                    item.color === 'outlands' ? 'border-red-500 bg-red-500/20 text-red-400' :
                    item.color === 'warning' ? 'border-amber-500 bg-amber-500/20 text-amber-400' :
                    'border-slate-600 bg-slate-800 text-slate-400'
                  }`} style={{ top: '0.25rem' }}>{item.step}</div>
                  <div className={`rule-card border-l-4 ${FACTION_COLORS[item.color].border} ${FACTION_COLORS[item.color].bg} rounded-r-md flex-1`}>
                    <div className="px-4 py-3">
                      <div className={`font-semibold text-sm ${FACTION_COLORS[item.color].text}`}>{item.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {WAR_RULES.map(block => <RuleCard key={block.id} block={block} />)}
            </div>


          </section>

          {/* ===== DEVELOPER APPENDIX ===== */}
          <section id="developer" ref={setRef('developer')} className="pt-8 mb-12">
            <SectionHeader title="Developer Appendix — Vehicle Handling" color="lore" icon={<Cpu size={16} />} />
            <div className="card-lore rule-card rounded-r-md mb-6">
              <div className="px-5 py-4">
                <p className="text-sm text-slate-400 italic">This appendix is for developers balancing vehicle handling. It only defines the intended handling hierarchy, not gameplay rules.</p>
              </div>
            </div>

            {/* Vehicle Tier Table */}
            <div className="overflow-x-auto rounded-lg border border-white/8 mb-6">
              <table className="compare-table w-full">
                <thead>
                  <tr>
                    <th className="th-label">Handling Tier</th>
                    <th className="th-label">Vehicles</th>
                  </tr>
                </thead>
                <tbody>
                  {VEHICLE_TIERS.map(tier => (
                    <tr key={tier.tier}>
                      <td className={`font-mono text-xs font-semibold ${FACTION_COLORS[tier.color].text}`}>{tier.tier}</td>
                      <td className="text-sm text-slate-300">{tier.vehicles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vehicle Type Families */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'PD Types', types: VEHICLE_TYPES.pd, color: 'city' as FactionColor },
                { label: 'Civilian Types', types: VEHICLE_TYPES.civilian, color: 'neutral' as FactionColor },
                { label: 'Gang Types', types: VEHICLE_TYPES.gang, color: 'outlands' as FactionColor },
                { label: 'EMS Types', types: VEHICLE_TYPES.ems, color: 'smu' as FactionColor },
              ].map(group => (
                <div key={group.label} className={`rule-card border-l-4 ${FACTION_COLORS[group.color].border} ${FACTION_COLORS[group.color].bg} rounded-r-md`}>
                  <div className="px-4 py-3">
                    <div className={`font-mono text-xs font-bold ${FACTION_COLORS[group.color].text} mb-2`}>{group.label}</div>
                    <ul className="space-y-1">
                      {group.types.map(t => (
                        <li key={t} className="text-xs text-slate-400 flex gap-1.5 items-center">
                          <span className={`w-1 h-1 rounded-full ${FACTION_COLORS[group.color].text.replace('text-', 'bg-')}`} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== LORE ===== */}
          <section id="lore" ref={setRef('lore')} className="pt-8 mb-12">
            <SectionHeader title="Lore — Spadikam: The Divided Land" color="lore" icon={<Scroll size={16} />} />

            <div className="relative overflow-hidden rounded-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663494392763/LYGpcqscuZgjXkrFAXZ26L/spadikam-hero-bg-3k8KnmH7Y8ErSSurTNnTpw.webp"
                alt="Spadikam Lore"
                className="absolute inset-0 w-full h-full object-cover opacity-15"
              />
              <div className="relative z-10 p-8">
                <div className="badge-lore mb-6">LORE APPENDIX</div>
                <div className="space-y-4 max-w-2xl">
                  {LORE_PARAGRAPHS.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className={`text-sm leading-relaxed ${
                        i === LORE_PARAGRAPHS.length - 1
                          ? 'text-purple-300 italic font-medium text-base'
                          : 'text-slate-300'
                      }`}
                    >
                      {i < LORE_PARAGRAPHS.length - 1 && (
                        <span className="text-purple-500 font-mono mr-2 text-xs">{'>'}</span>
                      )}
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== QUICK REFERENCE ===== */}
          <section className="pt-8 mb-12">
            <div className="section-header">
              <span className="text-slate-400"><Shield size={16} /></span>
              <h2 className="text-xl font-bold tracking-tight text-slate-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Quick Reference</h2>
              <div className="section-header-line text-slate-400" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Police Quick Ref */}
              <div className="card-city rule-card rounded-r-md">
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={14} className="text-blue-400" />
                    <span className="text-blue-400 font-bold text-sm font-mono">STCF QUICK REF</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Dirty Cop RP prohibited',
                      'Min 30 days service',
                      'Proper uniform mandatory',
                      'Taser: empty-handed only',
                      'NLR applies after death',
                      'No open war vs STCF',
                      'No Fear RP in 1v1',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-300">
                        <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-blue-400/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* EMS Quick Ref */}
              <div className="card-smu rule-card rounded-r-md">
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart size={14} className="text-green-400" />
                    <span className="text-green-400 font-bold text-sm font-mono">SMU QUICK REF</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Radio mandatory on duty',
                      'Neutral — no sides',
                      'Min 2 min treatment RP',
                      'No illegal activity',
                      'No selling med kits',
                      'Cops treated first if both down',
                      'Wait for scene to be safe',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-300">
                        <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-green-400/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gang Quick Ref */}
              <div className="card-outlands rule-card rounded-r-md">
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={14} className="text-red-400" />
                    <span className="text-red-400 font-bold text-sm font-mono">GANG QUICK REF</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Min 13 / Max 35 members',
                      '200h probation in 14 days',
                      'Gang tag: TAG | NAME',
                      'Max ransom: ₹10L',
                      'No gang ops in City',
                      'War: 72hr cooldown',
                      'Aiming at EMS = Fail RP',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-300">
                        <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-red-400/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div className="mt-6 p-4 rounded-lg border border-white/8" style={{ background: 'var(--card)' }}>
              <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">Color Code Legend</div>
              <div className="flex flex-wrap gap-3">
                {[
                  { badge: 'badge-city', label: 'City / STCF — Law-controlled zone' },
                  { badge: 'badge-outlands', label: 'Outlands / Gangs — Combat zone' },
                  { badge: 'badge-smu', label: 'SMU / EMS — Medical services' },
                  { badge: 'badge-warning', label: 'Warnings / Penalties / Cooldowns' },
                  { badge: 'badge-lore', label: 'Definitions / System notes / Lore' },
                ].map(item => (
                  <div key={item.badge} className="flex items-center gap-2">
                    <span className={item.badge}>●</span>
                    <span className="text-xs text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/8 pt-8 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: 'Orbitron, monospace', letterSpacing: '0.05em' }}>SPADIKAM ROLEPLAY</div>
                <div className="text-slate-600 text-xs font-mono mt-1">Operational Handbook — Comprehensive Edition</div>
                <div className="text-slate-700 text-xs font-mono">Excluding Discipline Code, Gang Discipline Matrix, and Protected-Player Policies</div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="badge-city">City</span>
                <span className="badge-outlands">Outlands</span>
                <span className="badge-smu">SMU</span>
                <span className="badge-warning">Admin</span>
                <span className="badge-lore">Lore</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
