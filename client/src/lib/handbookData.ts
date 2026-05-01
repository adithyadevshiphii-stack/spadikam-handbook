// ============================================================
// SPADIKAM HANDBOOK — All content extracted from the PDF
// ============================================================

export type FactionColor = 'city' | 'outlands' | 'smu' | 'warning' | 'lore' | 'neutral';

export interface RuleItem {
  id: string;
  text: string;
  type?: FactionColor;
  subItems?: string[];
}

export interface RuleBlock {
  id: string;
  title: string;
  color: FactionColor;
  icon?: string;
  rules: RuleItem[];
}

export interface Section {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  color: FactionColor;
  icon: string;
  description: string;
}

export const NAV_SECTIONS: Section[] = [
  { id: 'home', slug: 'home', title: 'Home', shortTitle: 'Home', color: 'neutral', icon: '⬡', description: '' },
  { id: 'world-structure', slug: 'world-structure', title: 'World Structure', shortTitle: 'World', color: 'lore', icon: '◈', description: 'Two-zone model, the Wall, and core definitions' },
  { id: 'global-rules', slug: 'global-rules', title: 'Global Rules', shortTitle: 'Global', color: 'warning', icon: '⚑', description: 'Server-wide rules and basic roleplay standards' },
  { id: 'city-rules', slug: 'city-rules', title: 'City Rules', shortTitle: 'City', color: 'city', icon: '◉', description: 'Full-RP city zone rules and regulations' },
  { id: 'outlands-rules', slug: 'outlands-rules', title: 'Outlands Rules', shortTitle: 'Outlands', color: 'outlands', icon: '◉', description: 'Flow-RP / PvP outlands zone rules' },
  { id: 'economy', slug: 'economy', title: 'Economy', shortTitle: 'Economy', color: 'warning', icon: '◈', description: 'Currency, criminal activity, and hold-up rules' },
  { id: 'robberies', slug: 'robberies', title: 'Robberies', shortTitle: 'Robberies', color: 'outlands', icon: '⬡', description: 'All robbery types, participant caps, and mechanics' },
  { id: 'stcf', slug: 'stcf', title: 'STCF (Police)', shortTitle: 'STCF', color: 'city', icon: '◈', description: 'Police force rules and citizen-to-STCF conduct' },
  { id: 'smu', slug: 'smu', title: 'SMU (EMS)', shortTitle: 'SMU', color: 'smu', icon: '◉', description: 'Emergency medical services rules and operations' },
  { id: 'gangs', slug: 'gangs', title: 'Gang Systems', shortTitle: 'Gangs', color: 'outlands', icon: '⬡', description: 'Gang formation, identity, conduct, and communication' },
  { id: 'gang-war', slug: 'gang-war', title: 'Gang War', shortTitle: 'War', color: 'outlands', icon: '⚑', description: 'Pre-war, war declaration, and gang war rules' },
  { id: 'developer', slug: 'developer', title: 'Developer Appendix', shortTitle: 'Dev', color: 'lore', icon: '◈', description: 'Vehicle handling balance and faction vehicle reference' },
  { id: 'lore', slug: 'lore', title: 'Lore', shortTitle: 'Lore', color: 'lore', icon: '◉', description: 'Spadikam: The Divided Land — origin story' },
];

export const DEFINITIONS = [
  { term: 'FRP (Fail RP)', definition: 'Any action that breaks realism, immersion, server systems, role hierarchy, or rule structure.' },
  { term: 'RDM', definition: 'Killing another player without a valid roleplay basis and escalation.' },
  { term: 'VDM', definition: 'Using a vehicle to kill or incapacitate without valid escalation.' },
  { term: 'Metagaming', definition: 'Using external / OOC information to influence roleplay.' },
  { term: 'Powergaming', definition: 'Forcing unrealistic actions or abusing mechanics to create outcomes that ignore believable RP.' },
  { term: 'NLR (New Life Rule)', definition: 'After valid death / respawn, a player forgets the events that led to that death and cannot continue the same situation.' },
  { term: 'Flow RP', definition: 'A faster style of scenario handling where the scene is finished first and reported later if needed.' },
  { term: 'Section 144', definition: 'A police-enforced emergency control state where only directly involved players may remain active.' },
];

export const GLOBAL_RULES: RuleBlock[] = [
  {
    id: 'server-rules',
    title: 'Global Server Rules',
    color: 'warning',
    rules: [
      { id: 'gr-1', text: 'Respect all players, staff, and the community at all times.' },
      { id: 'gr-2', text: 'Toxicity, harassment, discrimination, and personal attacks are prohibited.' },
      { id: 'gr-3', text: 'OOC issues must never be dragged into IC roleplay.' },
      { id: 'gr-4', text: 'High-quality roleplay is expected from all players.' },
      { id: 'gr-5', text: 'Admins may monitor situations, intervene, pause scenes, cancel outcomes, remove players, and issue punishments. Admin decisions are final.' },
      { id: 'gr-6', text: 'Attempts to bypass rules, systems, or staff authority are treated severely.' },
    ]
  },
  {
    id: 'basic-rp-rules',
    title: 'Basic Roleplay Rules',
    color: 'neutral',
    rules: [
      { id: 'rp-1', text: 'Always prioritize roleplay over winning.' },
      { id: 'rp-2', text: 'Your actions must make realistic sense inside the world.' },
      { id: 'rp-3', text: 'Value your life and the lives of others at all times.' },
      { id: 'rp-4', text: 'Stay in character during active scenes. OOC arguments during live RP are Fail RP.' },
      { id: 'rp-5', text: 'Violent escalation requires valid buildup unless a rules-based exception clearly applies.' },
      { id: 'rp-6', text: 'Do not force outcomes on other players through impossible or one-sided actions.' },
      { id: 'rp-7', text: 'Respect the environment, including roads, crowds, public buildings, and government spaces.' },
    ]
  },
  {
    id: 'behavioral',
    title: 'Behavioral Violations',
    color: 'warning',
    rules: [
      { id: 'bv-1', text: 'OOC (Out of Character): Avoid OOC discussion during active scenes except when directly dealing with staff.' },
      { id: 'bv-2', text: 'Fear RP: All characters must show realistic fear when facing death, heavy threat, or overwhelming force.' },
      { id: 'bv-3', text: 'Combat Logging: Leaving the server, force-quitting, or respawning to avoid an active situation is prohibited.' },
      { id: 'bv-4', text: 'Dead Body Rule: Dead players cannot talk. Dead players cannot use /me for communication. Carrying dead bodies is not allowed unless a system explicitly permits it.' },
      { id: 'bv-5', text: 'Lore Breaking: You may not force yourself into another player\'s scene or ignore the world logic of the active scenario.' },
    ]
  },
  {
    id: 'warning-fire',
    title: 'Warning Fire Rule (Server-Wide)',
    color: 'warning',
    rules: [
      { id: 'wf-1', text: 'If initiating a shooting scenario where the other party is unaware, fire a minimum of 3 warning shots into the air or ground and give reasonable time to react.' },
      { id: 'wf-2', text: 'Warning shots must be clearly visible and audible to the target.' },
      { id: 'wf-3', text: 'Warning fire may not be directed at vehicles, tires, or player bodies.' },
      { id: 'wf-4', text: 'One bullet in the air followed by immediate lethal fire does not count as valid warning fire.' },
      { id: 'wf-5', text: 'Even if weapons are drawn, proper warning fire is still required unless a declared gang war, active Section 144 engagement, or robbery-specific rule removes that requirement.' },
    ]
  },
  {
    id: 'safe-zone',
    title: 'Server Safe Zone (1:30 AM IST)',
    color: 'warning',
    rules: [
      { id: 'sz-1', text: 'After 1:30 AM Indian Standard Time (IST), the entire server and all zones enter safe zone mode.' },
      { id: 'sz-2', text: 'During safe zone hours, all combat, robberies, gang activities, and hostile situations are prohibited.' },
      { id: 'sz-3', text: 'Players may only engage in peaceful roleplay, business operations, and non-violent interactions.' },
      { id: 'sz-4', text: 'Active situations ongoing before 1:30 AM must be concluded before the safe zone begins.' },
      { id: 'sz-5', text: 'Safe zone violations will result in immediate admin intervention and potential disciplinary action.' },
    ]
  }
];

export const CITY_RULES: RuleBlock[] = [
  {
    id: 'city-zone',
    title: 'City Zone — Full Roleplay Rules',
    color: 'city',
    rules: [
      { id: 'cz-1', text: 'The City is a law-controlled zone with STCF authority and white-money legality.' },
      { id: 'cz-2', text: 'Gang members may initiate situations in the City, but all continuation and escalation must occur in the Outlands.' },
      { id: 'cz-3', text: 'Once a situation is initiated in the City, gangs must move to the Outlands to continue roleplay, combat, or any further gang activity.' },
      { id: 'cz-4', text: 'All City situations must be properly initiated, justified, clearly communicated, and realistically escalated.' },
      { id: 'cz-5', text: 'Public violence, panic creation, outland-style intimidation, and chaotic escalation are Fail RP.' },
      { id: 'cz-6', text: 'The City uses strict admin intervention: admins may stop, pause, cancel, or rewind situations to maintain RP quality.' },
    ]
  }
];

export const OUTLANDS_RULES: RuleBlock[] = [
  {
    id: 'outlands-zone',
    title: 'Outlands Zone — Flow RP / PvP Rules',
    color: 'outlands',
    rules: [
      { id: 'oz-1', text: 'Flow RP applies; finish the scene first and report problems later unless admin stops the scene.' },
      { id: 'oz-2', text: 'Gangs are the dominant force in the Outlands.' },
      { id: 'oz-3', text: 'PvP is allowed with roleplay logic. Random killing is still prohibited.' },
      { id: 'oz-4', text: 'Police authority is limited in the Outlands and usually reacts only when escalation becomes severe or balance is threatened.' },
      { id: 'oz-5', text: 'Minor roleplay quality issues may be tolerated more than in the City, but exploits, border abuse, fake identity abuse, and toxicity are punished fully.' },
    ]
  }
];

export const ECONOMY_RULES: RuleBlock[] = [
  {
    id: 'city-economy',
    title: 'City — White Money Only',
    color: 'city',
    rules: [
      { id: 'ce-1', text: 'All lawful business, banking, salary, service, property, and medical transactions in the City must use white money.' },
      { id: 'ce-2', text: 'Black money is not freely usable inside the City. Using illegal funds inside the City without a valid RP mechanism is Fail RP.' },
    ]
  },
  {
    id: 'outlands-economy',
    title: 'Outlands — Black Market Economy',
    color: 'outlands',
    rules: [
      { id: 'oe-1', text: 'The Outlands supports smuggling, black-market trade, illegal payments, and risk-based underground cashflow.' },
      { id: 'oe-2', text: 'Exploitative or unrealistic money generation remains prohibited.' },
    ]
  },
  {
    id: 'economy-abuse',
    title: 'Economy Abuse Restrictions',
    color: 'warning',
    rules: [
      { id: 'ea-1', text: 'Transferring money, items, vehicles, or assets between your own characters or alternate accounts is prohibited.' },
      { id: 'ea-2', text: 'Using middlemen to bypass alt-transfer restrictions is severe FRP.' },
      { id: 'ea-3', text: 'Exploiting jobs, systems, or loopholes for progression or cash gain is prohibited.' },
    ]
  },
  {
    id: 'criminal-activity',
    title: 'Criminal Activity Rules',
    color: 'outlands',
    rules: [
      { id: 'ca-1', text: 'All criminal acts require a valid RP reason and proper initiation.' },
      { id: 'ca-2', text: 'City and Outlands criminal logic may not be mixed.' },
      { id: 'ca-3', text: 'Public violence, panic creation, or forced criminal escalation in the City without strong buildup is Fail RP.' },
      { id: 'ca-4', text: 'Outlands allows broader criminal pressure but still prohibits trolling, griefing, and exploit abuse.' },
    ]
  },
  {
    id: 'holdup-city',
    title: 'Robbing / Holding Up — City (Civilian vs Civilian)',
    color: 'city',
    rules: [
      { id: 'hc-1', text: 'Only civilians operate as civilians in the City; gangs have no active gang power there.' },
      { id: 'hc-2', text: 'Robbing or holding up another civilian requires strong RP reasoning and proper escalation.' },
      { id: 'hc-3', text: 'Random gunpoint robberies without buildup are Fail RP.' },
      { id: 'hc-4', text: 'Maximum robbery amount: 2 Lakhs cash.', type: 'warning' },
      { id: 'hc-5', text: 'The same player may not be robbed or kidnapped again within 3 hours.', type: 'warning' },
      { id: 'hc-6', text: 'Maximum ransom: 8 Lakhs.', type: 'warning' },
      { id: 'hc-7', text: 'Job / work areas are green zones — no robbery or kidnapping there.' },
      { id: 'hc-8', text: 'Maximum civilian hold-up participants: 10 total players and 4 vehicles.', type: 'warning' },
      { id: 'hc-9', text: 'A 1-hour cooldown applies before starting another civilian situation.', type: 'warning' },
    ]
  },
  {
    id: 'holdup-outlands',
    title: 'Robbing / Holding Up — Outlands (Gang vs Player)',
    color: 'outlands',
    rules: [
      { id: 'ho-1', text: 'Gangs may rob civilians or rival players in the Outlands.' },
      { id: 'ho-2', text: 'Robberies must still make RP sense and may not become griefing.' },
      { id: 'ho-3', text: 'Hostage life must still be reasonably valued.' },
      { id: 'ho-4', text: 'Civilians may not insert themselves into gang wars or use civilian status to exploit situations.' },
    ]
  }
];

export interface RobberyType {
  id: string;
  name: string;
  requiredItems?: string[];
  minPD: number;
  color: FactionColor;
  cityRules?: {
    police: string;
    robbers: string;
    robberVehicles: string;
    pdVehicles: string;
    weapons: string;
    hostage?: string;
    demands: string;
    notes?: string[];
  };
  outlandsRules?: {
    police: string;
    robbers: string;
    robberVehicles: string;
    pdVehicles: string;
    weapons: string;
    hostage?: string;
    demands: string;
    notes?: string[];
  };
  generalRules?: string[];
}

export const ROBBERIES: RobberyType[] = [
  {
    id: 'store',
    name: 'Store Robbery',
    minPD: 2,
    color: 'outlands',
    cityRules: {
      police: '2 officers',
      robbers: '1–2 robbers',
      robberVehicles: 'Max 1 vehicle',
      pdVehicles: 'Max 2 PD vehicles',
      weapons: 'Pistol only',
      hostage: 'Required for negotiation',
      demands: 'Maximum 3 demands',
      notes: ['Direct Code 99 not allowed without escalation'],
    },
    outlandsRules: {
      police: '2 officers',
      robbers: '1–2 robbers',
      robberVehicles: 'Max 1 vehicle',
      pdVehicles: 'Max 1 PD vehicle',
      weapons: 'Pistol only',
      hostage: 'Limited leverage allowed',
      demands: 'Maximum 3 demands',
      notes: ['Direct Code 99 allowed after valid warning fire'],
    }
  },
  {
    id: 'fleeca',
    name: 'Fleeca Bank Robbery',
    requiredItems: ['Bag', 'Drill'],
    minPD: 5,
    color: 'outlands',
    cityRules: {
      police: '5 officers (4 chase, 1 hostage)',
      robbers: '3–4 robbers',
      robberVehicles: 'Max 1 vehicle',
      pdVehicles: 'Max 3 PD vehicles',
      weapons: 'Pistol or SMG (same category for all)',
      hostage: 'Max 1 hostage',
      demands: 'Maximum 3 demands',
    },
    outlandsRules: {
      police: '4 officers (3 chase, 1 hostage)',
      robbers: '3–4 robbers',
      robberVehicles: 'Max 1 vehicle',
      pdVehicles: 'Max 2 PD vehicles',
      weapons: 'Pistol or SMG (same category for all)',
      hostage: 'Max 1 hostage',
      demands: 'Maximum 3 demands',
    }
  },
  {
    id: 'jewellery',
    name: 'Jewellery Robbery',
    requiredItems: ['Bag'],
    minPD: 5,
    color: 'outlands',
    cityRules: {
      police: '5 officers (4 chase, 1 hostage)',
      robbers: '3–4 robbers',
      robberVehicles: 'Max 1 vehicle',
      pdVehicles: 'Max 3 PD vehicles',
      weapons: 'Assault Rifles or SMG (same category for all)',
      hostage: 'Max 1 hostage',
      demands: 'Maximum 3 demands',
    },
  },
  {
    id: 'humane-lab',
    name: 'Humane Lab Robbery',
    requiredItems: ['USB'],
    minPD: 6,
    color: 'outlands',
    outlandsRules: {
      police: '6–8 officers',
      robbers: '6–7 robbers',
      robberVehicles: 'Max 3 including 1 helicopter',
      pdVehicles: 'Max 4 including 1 helicopter',
      weapons: 'Assault Rifles, SMG, or Pistols (same primary category)',
      hostage: 'Max 1 hostage; clear communication required',
      demands: 'Maximum 3 demands',
      notes: ['Code 99 not allowed while holding a hostage'],
    }
  },
  {
    id: 'main-bank',
    name: 'Main Bank Robbery',
    requiredItems: ['C4 Bomb', 'Drill / Hacking Device', 'Bag'],
    minPD: 6,
    color: 'outlands',
    cityRules: {
      police: '6–7 officers',
      robbers: '5–6 robbers',
      robberVehicles: 'Max 3 including 1 helicopter',
      pdVehicles: 'Max 4 including 1 helicopter',
      weapons: 'Assault Rifles, SMG, or Pistols (same primary category)',
      hostage: 'Max 1 hostage',
      demands: 'Maximum 3 demands',
      notes: ['Code 99 not allowed while holding a hostage'],
    }
  },
  {
    id: 'bike',
    name: 'Bike Robbery',
    minPD: 1,
    color: 'outlands',
    generalRules: [
      'Police max 1; robber max 1.',
      'Robber must use the exact bike spawned by the robbery blip. Police must use police bike only.',
      'No backup vehicles or backup persons allowed.',
      'Direct pitting is not allowed at the start; police may PIT only after 3 clear warnings.',
      'Robber may surrender, escape, or initiate fire only if the bike is fully damaged, fuel is empty, or the robber is clearly spotted during final delivery.',
      'Pistol only. Warning fire by robbers is required before any gunfight.',
    ]
  },
  {
    id: 'car',
    name: 'Car Robbery',
    minPD: 2,
    color: 'outlands',
    generalRules: [
      'Police min/max 2; robbers 1–2.',
      'Robbers must use the exact vehicle spawned through the blip.',
      'No backup vehicles or persons allowed.',
      'Direct pitting at the start is not allowed; police may PIT only after 3 clear warnings.',
      'Robbers may surrender, escape, or initiate fire only if the vehicle is fully damaged, fuel is empty, or robbers are spotted during final delivery.',
      'Pistol only. Warning fire by robbers is required before any gunfight.',
    ]
  },
  {
    id: 'organ',
    name: 'Organ Trafficking',
    requiredItems: ['Organ Cooler', 'Trojan USB', 'Chloroform'],
    minPD: 2,
    color: 'outlands',
    generalRules: [
      'Police 2; robbers 1–2.',
      'Robbers must use the exact trafficking vehicle.',
      'No backup vehicles or persons allowed.',
      'Direct pitting at the start is not allowed; police may PIT only after 3 clear warnings.',
      'Robbers may surrender, escape, or initiate fire only when the vehicle is fully damaged, fuel is empty, or robbers are spotted during delivery.',
      'Weapons: Pistol or SMG. Chloroform and organ transfer must be roleplayed properly.',
    ]
  },
  {
    id: 'npc',
    name: 'NPC Robberies',
    minPD: 0,
    color: 'lore',
    generalRules: [
      'NPC robberies include Merryweather Heist, Oil Rig Heist, Aircraft Barge Heist, and Army Heist.',
      'NPC robberies may be triggered at any time unless blocked by restart rules.',
      'They are primarily PvE scenarios, but STCF may investigate or intervene if they become aware.',
      'Cross-border movement is allowed during NPC robberies.',
    ]
  }
];

export const ROBBERY_GENERAL_RULES = [
  'All robberies require proper RP communication and fair escalation.',
  'Only the allowed participant counts may join each robbery.',
  'Only approved robbery vehicles and tools may be used.',
  'Dead, revived, or eliminated players may not re-enter the same robbery.',
  'All job-related or robbery-related items may only be used for their designated purpose. Misuse results in Level 3 punishment.',
];

export const ROBBERY_RESPONSE_VEHICLE_RULES = [
  'During robbery scenarios, PD must use designated robbery-response vehicles only.',
  'These vehicles may travel across the map and across the Wall only for the active robbery.',
  'After the robbery concludes, robbery-response vehicles must return immediately to PD and cannot be reused for unrelated situations.',
  'Gangs or third parties may not start side situations with PD units using robbery-response vehicles.',
  'Gang vehicles may not be used in robbery scenarios.',
];

export const STCF_RULES: RuleBlock[] = [
  {
    id: 'stcf-city',
    title: 'STCF Rules — City',
    color: 'city',
    rules: [
      { id: 'sc-1', text: 'Dirty Cop RP is prohibited.', type: 'warning' },
      { id: 'sc-2', text: 'Minimum STCF service period is 30 days.', type: 'warning' },
      { id: 'sc-3', text: 'STCF equipment may not be exchanged with civilians or gangs.' },
      { id: 'sc-4', text: 'Proper uniform and STCF vehicle are mandatory on duty.' },
      { id: 'sc-5', text: 'Safe-zone rules must be followed, but STCF may still arrest criminals inside safe zones.' },
      { id: 'sc-6', text: 'STCF follows NLR and cannot return to the same situation after death.' },
      { id: 'sc-7', text: 'Officers must provide reasonable cool-off time before pursuit.' },
      { id: 'sc-8', text: 'Tasers may be used only on empty-handed suspects.' },
      { id: 'sc-9', text: 'STCF may search suspicious people or vehicles with RP justification.' },
      { id: 'sc-10', text: 'Visible illegal weapons in public allow cuffing and confiscation.' },
      { id: 'sc-11', text: 'STCF officers do not require Fear RP in 1v1 situations.' },
      { id: 'sc-12', text: 'With a valid warrant, STCF may arrest a suspect anywhere in the City, including safe zones and gang houses.' },
      { id: 'sc-13', text: 'Dead players may not re-enter STCF situations. Illegal revives in STCF situations are prohibited.' },
      { id: 'sc-14', text: 'Open war against STCF is not allowed.', type: 'warning' },
      { id: 'sc-15', text: 'Taking STCF officers or STCF vehicles into custody is Fail RP.', type: 'warning' },
    ]
  },
  {
    id: 'citizen-stcf',
    title: 'Citizen-to-STCF Rules — City',
    color: 'city',
    rules: [
      { id: 'cs-1', text: 'Respect STCF officers at all times.' },
      { id: 'cs-2', text: 'Do not tell officers how to do their job ("Do not PD the PD").' },
      { id: 'cs-3', text: 'If you feel mistreated, continue the RP and report afterward.' },
      { id: 'cs-4', text: 'Civilians are not permitted to take PD hostage inside the City.', type: 'warning' },
      { id: 'cs-5', text: 'Killing a PD officer requires extreme RP justification. Revenge RP against PD is prohibited.', type: 'warning' },
      { id: 'cs-6', text: 'Do not hold weapons in front of PD unnecessarily. After warnings, PD may cuff, search, and confiscate.' },
      { id: 'cs-7', text: 'Masks and helmets are not allowed during active PD interaction.' },
      { id: 'cs-8', text: 'Impersonating PD or using PD uniforms is Fail RP.', type: 'warning' },
      { id: 'cs-9', text: 'Stealing PD equipment is Fail RP. PD vehicles may only be used for escape RP and not to start new situations.', type: 'warning' },
      { id: 'cs-10', text: 'Do not fight PD to free friends or insert yourself into active police scenes.' },
      { id: 'cs-11', text: 'Combat logging during PD interaction is severe FRP.', type: 'warning' },
      { id: 'cs-12', text: 'Do not end situations in water. Bike and car robberies may not end in water.' },
      { id: 'cs-13', text: 'Using reloadskin / refreshskin while tased is bug exploitation.', type: 'warning' },
    ]
  },
  {
    id: 'safe-zones',
    title: 'Safe Zones and Section 144',
    color: 'warning',
    rules: [
      { id: 'sz-1', text: 'Triggering PD inside safe zones is Fail RP.', type: 'warning' },
      { id: 'sz-2', text: 'Shooting within 100 meters of PD HQ, an active on-duty PD officer, or a declared Section 144 area without valid RP reason is treated as cop baiting and Fail RP.', type: 'warning' },
      { id: 'sz-3', text: 'During a Section 144 scene, only directly involved players may remain active. Spectating, circling, or attempting to join is prohibited.', type: 'warning' },
    ]
  },
  {
    id: 'pd-hostage-outlands',
    title: 'PD Hostage Rule — Outlands',
    color: 'outlands',
    rules: [
      { id: 'pho-1', text: 'Taking PD hostage in the Outlands is allowed only with a minimum of 4 gang members and 6 on-duty PD.', type: 'warning' },
      { id: 'pho-2', text: 'PD officers actively attending a robbery may not be taken hostage.' },
    ]
  },
  {
    id: 'gang-vehicle-city',
    title: 'Gang Vehicle Restriction in the City',
    color: 'city',
    rules: [
      { id: 'gvc-1', text: 'Gang vehicles may only be used for travel inside the City.' },
      { id: 'gvc-2', text: 'Using gang vehicles to trigger situations, start conflicts, or conduct gang operations inside the City is Fail RP.', type: 'warning' },
    ]
  },
  {
    id: 'stcf-outlands',
    title: 'STCF Rules — Outlands',
    color: 'outlands',
    rules: [
      { id: 'so-1', text: 'STCF authority is limited in the Outlands.' },
      { id: 'so-2', text: 'Police are not the dominant force there, but they still represent law and may respond to severe escalation, server-balance concerns, or admin-approved operations.' },
      { id: 'so-3', text: 'Dirty Cop RP remains prohibited. Proper STCF uniform and STCF vehicles remain mandatory.' },
      { id: 'so-4', text: 'Open war against STCF is not allowed. STCF cannot be treated as a gang.', type: 'warning' },
    ]
  },
  {
    id: 'stcf-application',
    title: 'STCF Application Requirements',
    color: 'city',
    rules: [
      { id: 'sa-1', text: 'All STCF applicants are required to provide proper, realistic names during the application process.', type: 'warning' },
      { id: 'sa-2', text: 'Names that are inappropriate, fictional, unrealistic, or unprofessional will not be accepted. Examples of rejected names: W, FTW, LOL, BOT, XD, Dracula, Dragon, etc.', type: 'warning' },
      { id: 'sa-3', text: 'All applicants must maintain professionalism and roleplay standards at all times.' },
      { id: 'sa-4', text: 'Failure to follow this guideline may result in application rejection.' },
    ]
  }
];

export const SMU_RULES: RuleBlock[] = [
  {
    id: 'smu-city',
    title: 'SMU Rules — City',
    color: 'smu',
    rules: [
      { id: 'smc-1', text: 'EMS radio connection is mandatory while on duty.' },
      { id: 'smc-2', text: 'Radio communication must be clear, professional, and roleplay-focused. Personal chatter is not allowed.' },
      { id: 'smc-3', text: 'Admin revive is allowed only when active situations are uncontrollable by available on-duty EMS.' },
      { id: 'smc-4', text: 'Medical treatment requires proper /me and emote use, with at least 2 minutes of treatment RP.' },
      { id: 'smc-5', text: 'SMU must remain neutral and professional.' },
      { id: 'smc-6', text: 'Proper SMU uniform and SMU vehicle are mandatory while on duty. No alterations. Masks are not allowed; approved helmets are allowed.' },
      { id: 'smc-7', text: 'Selling med kits or bandages to civilians is strictly prohibited and may lead to instant termination.', type: 'warning' },
      { id: 'smc-8', text: 'SMU members may not engage in illegal activity, gang involvement, or gang affiliation.', type: 'warning' },
      { id: 'smc-9', text: 'Do not kill and revive a player. You are a medic, not an executioner.', type: 'warning' },
      { id: 'smc-10', text: 'Using gang vehicles or mingling with gang members on duty is prohibited.' },
      { id: 'smc-11', text: 'AFK abuse or ignoring cases while on duty is punishable.', type: 'warning' },
      { id: 'smc-12', text: 'Bodies from on-sight killings must be transported to hospital and revived there.' },
      { id: 'smc-13', text: 'Taking custody of PD or EMS vehicles is Fail RP.', type: 'warning' },
    ]
  },
  {
    id: 'smu-outlands',
    title: 'SMU Rules — Outlands',
    color: 'smu',
    rules: [
      { id: 'smo-1', text: 'EMS radio and professionalism remain mandatory.' },
      { id: 'smo-2', text: 'Flow RP applies, but medical RP is still required.' },
      { id: 'smo-3', text: 'SMU must not take sides in gang conflicts.' },
      { id: 'smo-4', text: 'SMU must wait until the scene is safe before entering.' },
      { id: 'smo-5', text: 'Selling medical supplies, engaging in illegal activity, or assisting players in escaping situations is prohibited.', type: 'warning' },
    ]
  },
  {
    id: 'smu-operational',
    title: 'Operational Rules (Both Zones)',
    color: 'neutral',
    rules: [
      { id: 'sop-1', text: 'Your safety comes first. Contact PD before entering dangerous scenes.' },
      { id: 'sop-2', text: 'Do not treat patients in roads unless unavoidable. Move ambulatory patients to sidewalks when possible.' },
      { id: 'sop-3', text: 'If both cops and criminals are down, treat cops first.' },
      { id: 'sop-4', text: 'Do not enter active robberies or active shootouts. Enter only once PD or the active side confirms the scene is safe.' },
      { id: 'sop-5', text: 'Turn off sirens and lights on arrival.' },
      { id: 'sop-6', text: 'Air service may be used only when the location is unreachable by road.' },
    ]
  }
];

export const GANG_RULES: RuleBlock[] = [
  {
    id: 'gang-formation',
    title: 'Basic Gang Formation Rules',
    color: 'outlands',
    rules: [
      { id: 'gf-1', text: 'A gang requires a minimum of 13 members to establish and may have a maximum of 35 members.', type: 'warning' },
      { id: 'gf-2', text: 'All gang members must be whitelisted before approval and must match the approved roster.' },
      { id: 'gf-3', text: 'After Discord approval, the gang must complete 200 in-game hours within 14 days (probation phase). Only playtime after approval counts.', type: 'warning' },
      { id: 'gf-4', text: 'During probation, the group must roleplay as civilians only. No wars, gang conflicts, or FRP violations are permitted.' },
      { id: 'gf-5', text: 'Failure to complete probation results in loss of gang approval. Reapplication may be allowed after 7 days unless removed for severe rule issues.', type: 'warning' },
      { id: 'gf-6', text: 'All gang members must be at least 16 years old.', type: 'warning' },
    ]
  },
  {
    id: 'gang-border',
    title: 'Once a Gang, Always a Gang — Border System',
    color: 'lore',
    rules: [
      { id: 'gb-1', text: 'Joining a gang permanently marks your character as gang-affiliated.' },
      { id: 'gb-2', text: 'Inside the City, gang members may initiate situations but may not use gang power, backup, hierarchy, vehicles, clothing, radios, intimidation, or continue operations. All continuation must move to the Outlands.' },
      { id: 'gb-3', text: 'In the Outlands, gang members regain full gang authority and all gang systems apply.' },
      { id: 'gb-4', text: 'Crossing the border changes the rules that apply to you, not your identity.' },
    ]
  },
  {
    id: 'gang-conduct',
    title: 'Gang Roleplay, Conduct & Operational Rules',
    color: 'outlands',
    rules: [
      { id: 'gc-1', text: 'Gang RP may be toxic in character, but OOC hostility and personal attacks are prohibited.' },
      { id: 'gc-2', text: 'Burning to death ends the situation permanently. Restarting or continuing after burn is Fail RP.', type: 'warning' },
      { id: 'gc-3', text: 'After being burned, the player must respawn and NLR applies. Failure to respawn or returning to the same situation may lead to a 10-day gang-situation restriction.', type: 'warning' },
      { id: 'gc-4', text: 'Players revived by respawn, bot EMS, or admin revive may not rejoin the same situation or war.' },
      { id: 'gc-5', text: 'Kill and revive abuse is Fail RP. EMS may refuse revive if abuse is suspected.', type: 'warning' },
      { id: 'gc-6', text: 'No warning fire is required for trespassers inside a gang house.' },
      { id: 'gc-7', text: 'Do not enter gang houses immediately after robberies or police chases; use alternate hideouts.' },
      { id: 'gc-8', text: 'Aiming at EMS is Fail RP.', type: 'warning' },
      { id: 'gc-9', text: 'OOC conversation during RP situations is Fail RP.', type: 'warning' },
      { id: 'gc-10', text: 'Gang members may not participate in civilian scenarios. Civilians may not involve gangs in their situations.' },
      { id: 'gc-11', text: 'Maximum ransom in gang-vs-gang hostage situations is 10 Lakhs.', type: 'warning' },
      { id: 'gc-12', text: 'Kidnapping on-duty government officials and using government vehicles are both Fail RP.', type: 'warning' },
      { id: 'gc-13', text: 'Leaders and co-leaders are fully responsible for member behavior, rule compliance, and OOC conduct.' },
      { id: 'gc-14', text: 'Gang members must display the format GANG-TAG | CHARACTER NAME.', type: 'warning' },
      { id: 'gc-15', text: 'Improper or missing gang tag: warning first, then immediate kick for repeat offense.', type: 'warning' },
      { id: 'gc-16', text: 'A gang inactive for 7 consecutive days without valid notice may be terminated.', type: 'warning' },
    ]
  },
  {
    id: 'gang-bench',
    title: 'Gang Crew / Bench Players',
    color: 'neutral',
    rules: [
      { id: 'gcp-1', text: 'Each gang may designate up to 5 bench/crew players within the 35-member limit.', type: 'warning' },
      { id: 'gcp-2', text: 'Bench players are for communication RP only and must be updated every Sunday before restart.' },
      { id: 'gcp-3', text: 'Bench players cannot participate in wars, turf, pre-war, or active combat situations.', type: 'warning' },
      { id: 'gcp-4', text: 'Bench players are not counted toward gang war or situation member requirements.' },
      { id: 'gcp-5', text: 'If unexpectedly fired upon before a formal situation begins, a bench player may defend temporarily, but once a formal situation or war begins, they must leave immediately.' },
    ]
  },
  {
    id: 'gang-chat',
    title: 'Gang Situation & Chat Usage Rules',
    color: 'outlands',
    rules: [
      { id: 'gsc-1', text: 'All gang situations require valid RP initiation and clear communication.' },
      { id: 'gsc-2', text: 'Gang chat may be used for war calls, meeting calls, and coordination only.' },
      { id: 'gsc-3', text: 'Spam, trolling, fake calls, misleading calls, and unnecessary provocation in gang chat are prohibited.', type: 'warning' },
      { id: 'gsc-4', text: 'Gang chat must not be used inside the City to continue, threaten, pressure, or re-initiate gang conflicts.', type: 'warning' },
      { id: 'gsc-5', text: 'Official gang calls must clearly identify both gangs and the type of call.' },
    ]
  },
  {
    id: 'gang-closure',
    title: 'Gang Situation Closure, Revive & Chat Conduct',
    color: 'outlands',
    rules: [
      { id: 'gcc-1', text: 'Gang situations are valid only in Outlands.' },
      { id: 'gcc-2', text: 'Once a gang situation is officially concluded, neither gang may re-engage, restart, retaliate, or loop the same scenario.', type: 'warning' },
      { id: 'gcc-3', text: 'If one gang is fully down, the downed gang must type "Yes All Down" in gang chat.' },
      { id: 'gcc-4', text: 'After "Yes All Down", no unnecessary gang chat, taunts, or provocation is allowed.', type: 'warning' },
      { id: 'gcc-5', text: 'Admins may perform Gang Rev (GRV) when needed to maintain server flow, usually only when at least 6 members per gang were involved.' },
      { id: 'gcc-6', text: 'After Gang Rev, that player\'s participation in the situation is over. Re-entry after EMS, bot, or admin revive is Fail RP.', type: 'warning' },
      { id: 'gcc-7', text: 'Starting a gang situation without valid RP reason is Fail RP.', type: 'warning' },
      { id: 'gcc-8', text: 'If one side disengages, they must communicate within 10 minutes. Deliberate silence or delay to prolong the scene is Fail RP.', type: 'warning' },
    ]
  }
];

export const WAR_RULES: RuleBlock[] = [
  {
    id: 'pre-war',
    title: 'Pre-War Situation System',
    color: 'outlands',
    rules: [
      { id: 'pw-1', text: 'Pre-War is an escalation stage between an initial gang clash and a proper war.' },
      { id: 'pw-2', text: 'Pre-War can only occur in the Outlands.' },
      { id: 'pw-3', text: 'It may begin after an initial killing, hostage result, or retaliatory act between gangs.' },
      { id: 'pw-4', text: 'No civilians may participate. Bench players may not fight.', type: 'warning' },
      { id: 'pw-5', text: 'Vehicle limit: maximum 6 gang vehicles and 1 server-approved helicopter.', type: 'warning' },
      { id: 'pw-6', text: 'All participants must wear official gang outfits.' },
      { id: 'pw-7', text: 'A Pre-War may not exceed 24 hours from initiation.', type: 'warning' },
    ]
  },
  {
    id: 'war',
    title: 'War / Gang vs Gang Rules',
    color: 'outlands',
    rules: [
      { id: 'w-1', text: 'Only registered gang members may participate in gang wars.' },
      { id: 'w-2', text: 'Proper war declaration is mandatory. Unannounced gang fights are not permitted.', type: 'warning' },
      { id: 'w-3', text: 'A valid RP reason and face-to-face gang meeting are required before war declaration.', type: 'warning' },
      { id: 'w-4', text: 'Meeting attendance is limited and must be made by leaders or authorized representatives.' },
      { id: 'w-5', text: 'Wars are not permitted inside the City.', type: 'warning' },
      { id: 'w-6', text: 'A gang war normally permits a maximum of 5 members per gang.', type: 'warning' },
      { id: 'w-7', text: 'Post-war cooldown: 72 hours / 3 days before the same two gangs may initiate another war.', type: 'warning' },
      { id: 'w-8', text: 'Maximum ransom in gang-vs-gang hostage situations remains 10 Lakhs.', type: 'warning' },
    ]
  },
  {
    id: 'breach-discontinued',
    title: 'Gang House Breach — DISCONTINUED',
    color: 'warning',
    rules: [
      { id: 'bd-1', text: 'Gang house breaches are no longer part of the Spadikam roleplay system.' },
      { id: 'bd-2', text: 'Gang houses may no longer be forcibly breached by opposing gangs.' },
      { id: 'bd-3', text: 'If a gang retreats to their gang house during a conflict, the situation must be resolved through roleplay, negotiation, or admin intervention.' },
    ]
  }
];

export const VEHICLE_TIERS = [
  { tier: 'Tier 1 — Highest Power', vehicles: 'PD 4x4 · Gang 4x4 · Gang 6x6', color: 'outlands' as FactionColor },
  { tier: 'Tier 2 — High Power', vehicles: 'PD COM · Gang COM', color: 'warning' as FactionColor },
  { tier: 'Tier 3 — Medium Power', vehicles: 'PD Civilian Patrol', color: 'city' as FactionColor },
  { tier: 'Tier 4 — Standard Power', vehicles: 'PD Robbery Vehicles · Civilian Vehicles', color: 'neutral' as FactionColor },
  { tier: 'Special', vehicles: 'EMS Vehicles (special handling)', color: 'smu' as FactionColor },
];

export const VEHICLE_TYPES = {
  pd: ['COM', '4x4', 'Robbery', 'Civilian Patrol'],
  civilian: ['Image', 'Addon', 'Custom', 'Premium'],
  gang: ['COM', '4x4', '6x6'],
  ems: ['Special handling category'],
};

export const LORE_PARAGRAPHS = [
  'Spadikam was once one connected city and territory.',
  'As organized crime spread from the city into the outer territories, law enforcement lost the ability to control the full map.',
  'The government chose containment over collapse and built the Wall to separate controlled urban order from the dangerous outer lands.',
  'Inside the Wall, the City rebuilt under law, white-money economy, STCF authority, and stronger social order.',
  'Outside the Wall, the Outlands survived through gangs, black markets, smuggling, and raw power.',
  'The Wall does not erase identity. It changes what rules apply to you when you cross it.',
  'Everything that happens after the division is created by the players who live in Spadikam.',
];
