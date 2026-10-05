/**
 * All copy on this site is taken from PreTT's uploaded knowledge base
 * (Content_for_website.pdf, PreTT_NCSD.pdf). Nothing here is invented.
 */

export const COMPANY = {
  name: "PreTT",
  tagline: "Target. Click. Treat.",
  address: "Ole Maaløes Vej 3, 2200 Copenhagen, Denmark",
  email: "info@pre-tt.com",
  cvr: "DK43121618",
  linkedin: "https://www.linkedin.com/company/pre-tt/posts/",
  website: "www.pre-tt.com",
};

export const SHORT_DESCRIPTION =
  "Our technology uses a nontoxic vector to find and tag cancer cells. Then we introduce a small radioactive molecule that clicks onto the tags, releasing the radiation precisely at the tumour while sparing healthy tissue.";

export const NUTSHELL =
  'PreTT\'s "target-click-treat" technology redefines the Therapeutic Index in Radioligand Therapy by separating tumour targeting from dose delivery. We first send in non-radioactive antibodies — highly specific targeting molecules — to find and tag cancer cells. Only once they\'ve reached the tumour do we introduce a small molecule carrying the radioactive payload, which clicks onto them. The radiation lands where it should, and healthy tissue is left alone.\nAnd because our proprietary click molecule is the only one of its kind to cross the blood-brain barrier, we can reach primary brain tumours and metastases that remain inaccessible to every other systemic therapy.';

export const MISSION_QUOTE =
  "Systemic toxicity keeps patients from tolerating the doses they need. Pretargeting is the solution.";

export const STEPS = [
  {
    number: "1",
    title: "Target",
    body: "Tumour targeting with mAb-TCO. Accumulation at the tumour site and elimination from circulation.",
  },
  {
    number: "2",
    title: "Click",
    body: 'Administration of radioactive Tz. Ultrafast in vivo "click" reaction with mAb-TCO. Fast clearance of unclicked Tz.',
  },
  {
    number: "3",
    title: "Treat",
    body: "Therapeutic radiation delivered at tumour without systemic toxicity.",
  },
];

export const CLICK_CHEMISTRY_POINTS = [
  "Ultra fast",
  "Highly specific",
  "Irreversible",
  "Standard medicinal chemistry approaches to influence the pharmacokinetics of the click reagents",
];

export const AT211_POINTS = [
  {
    title: "7.2 h",
    body: "Optimal half-life for the pretargeting approach.",
  },
  {
    title: "\u03B1-emission",
    body: "One \u03B1-particle per decay, short pathlength, high linear energy transfer, highly localized DNA damage.",
  },
  {
    title: "BBB",
    body: "Covalent labeling supports brain penetration.",
  },
];

export const COMPARISON_BENEFITS = [
  {
    title: "Superior Signal-to-Noise",
    body: "High precision.",
  },
  {
    title: "Optimized Dosimetry",
    body: "Higher therapeutic doses delivered directly to the tumour.",
  },
  {
    title: "Reduced Toxicity",
    body: "Rapid clearance of unbound radiation, significantly sparing healthy organs.",
  },
];

export const PATENTS = [
  {
    number: "EP3887359A1",
    title: "Novel tetrazine compounds for in vivo imaging",
    priority: "29-11-2019",
    status: "Granted in US \u00B7 National phase in EU",
  },
  {
    number: "EP4305009A2",
    title: "\u00B9\u2078F-aliphatic labelled tetrazines",
    priority: "11-03-2021",
    status: "Pending",
  },
  {
    number: "EP3976118A1",
    title: "\u00B9\u2078F-labeled novel tetrazines imaging probes for pretargeting in PET imaging",
    priority: "25-05-2020",
    status: "Pending",
  },
  {
    number: "EP4199970A1",
    title:
      "Extracorporeal clearing traps based on inverse electron-demand Diels\u2013Alder cycloaddition for (pre-)targeted therapy and diagnostics",
    priority: "18-08-2021",
    status: "Pending",
  },
  {
    number: "EP4149931A1",
    title:
      "Nuclide-labelled H-tetrazines and use thereof for PET and SPECT pretargeted imaging and radionuclide therapy",
    priority: "12-05-2021",
    status: "Pending",
  },
];

export const MILESTONES = [
  {
    year: "2022",
    items: ["Company inception \u2014 spin out of the University of Copenhagen", "3 patents filed"],
  },
  {
    year: "2023",
    items: [
      "Blood-Brain-Barrier crossing \u2014 proof of concept in partnership with Roche",
      "Patent filed",
    ],
  },
  {
    year: "2024",
    items: [
      "BII Venture Lab \u2014 selected & funded to develop our platform",
      "1 additional patent granted",
      "Innobooster Grant \u2014 development of pretargeted radioligand therapy for brain metastasis in breast cancer (Innovationsfonden)",
    ],
  },
  {
    year: "2025",
    items: [
      "BII Venture House \u2014 selected for further funding to develop our platform & assets",
      "Eurostars Grant \u2014 development of pretargeted radiotheranostic for precision treatment of highly metastatic, recurrent and advanced cancer",
    ],
  },
  {
    year: "2026",
    items: [
      "Grand Solutions Grant \u2014 development of a pretargeted bispecific antibody alpha radioligand therapy to address glioblastoma (Innovationsfonden)",
    ],
  },
];

export type PipelineRow = {
  program: string;
  indication: string;
  target: string;
  isotope: string;
  partners: string;
  stageIndex: number; // 0..3 -> Discovery, Preclinical, Phase 1, Phase 2
  stagePct: number; // bar fill width derived from the Supabase stage value
};

export const PIPELINE_STAGES = ["Discovery", "Preclinical", "Phase 1", "Phase 2"];

export const PIPELINE_FALLBACK: PipelineRow[] = [
  {
    program: "HER2 Brain",
    indication: "HER2+ breast cancer brain metastases \u00B7 OSR 5y <12%",
    target: "HER2",
    isotope: "\u00B2\u00B9\u00B9At",
    partners: "",
    stageIndex: 0,
    stagePct: 15,
  },
  {
    program: "PRE-BREACH",
    indication: "Glioblastoma \u00B7 OSR 5y 5\u201310%",
    target: "uPAR",
    isotope: "\u00B2\u00B9\u00B9At",
    partners: "University of Copenhagen, Curasight, PanTarg, Rigshospitalet",
    stageIndex: 0,
    stagePct: 15,
  },
  {
    program: "PRECISE",
    indication: "HNSCC \u00B7 OSR 5y <20%",
    target: "CD44V6",
    isotope: "Radiometals",
    partners: "Akiram Therapeutics, TetraKit Technologies",
    stageIndex: 1,
    stagePct: 35,
  },
];

export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  group: string;
  photo_url?: string | null;
};

export const TEAM_FALLBACK: TeamMember[] = [
  {
    name: "Natalia Herrero Alvarez, PhD",
    title: "CEO & Director of R&D",
    bio: "10+ years in radiopharma and drug development.",
    group: "Management",
  },
  {
    name: "Prof. Andreas Kjaer, MD, PhD",
    title: "CMO & Co-Founder",
    bio: "30+ years in radiopharma and clinical translation.",
    group: "Management",
  },
  {
    name: "Prof. Matthias Herth, PhD",
    title: "CSO & Co-Founder",
    bio: "20+ years in radiopharma R&D.",
    group: "Management",
  },
  {
    name: "Sophie Stotz, PhD",
    title: "Industrial Postdoctoral Researcher",
    bio: "[PLACEHOLDER]",
    group: "Research & Development",
  },
  {
    name: "Mamina Bohl, PhD",
    title: "Radiopharmaceutical Scientist",
    bio: "[PLACEHOLDER]",
    group: "Research & Development",
  },
  {
    name: "Lars Hvass, PhD",
    title: "PreTT Part-time Researcher",
    bio: "[PLACEHOLDER]",
    group: "Research & Development",
  },
  {
    name: "Leo Meschenmoser",
    title: "Business Developer",
    bio: "[PLACEHOLDER]",
    group: "Business Development & Finance",
  },
];

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  full: string;
  link?: string | null;
};
