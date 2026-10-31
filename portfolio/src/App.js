import { useEffect, useState } from 'react';
import './App.css';

const navigation = [
  { href: '#about', label: 'About' },
  { href: '#profile', label: 'Profile' },
  { href: '#projects', label: 'Projects' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#collaboration', label: 'Collaboration' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

const toolIconTypes = {
  Python: 'python',
  SQL: 'database',
  'Apache Spark': 'spark',
  'Apache Airflow': 'flow',
  'Apache Kafka': 'stream',
  Databricks: 'diamond',
  'Microsoft Fabric': 'fabric',
  'Power BI': 'chart',
  PostgreSQL: 'database',
  Git: 'branch',
  GitHub: 'hub',
  Docker: 'containers',
};

const projects = [
  {
    number: '01',
    category: 'REAL-TIME DATA ENGINEERING',
    title: 'Kafka Sales Streaming',
    description:
      'A real-time sales event pipeline with producers and consumers, Kafka topics, and PostgreSQL persistence.',
    technologies: ['Python', 'Apache Kafka', 'PostgreSQL', 'Docker Compose'],
    href: 'https://github.com/helmercapassola/kafka-sales-streaming',
    visual: 'streaming',
  },
  {
    number: '02',
    category: 'BATCH + STREAMING',
    title: 'Forex Hybrid ETL',
    description:
      'Foreign exchange data ingestion and analysis, combining scheduled batch workflows with real-time Kafka streaming and PostgreSQL storage.',
    technologies: ['Python', 'Apache Airflow', 'Apache Kafka', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/helmercapassola/forex-hybrid-etl',
    visual: 'etl',
  },
  {
    number: '03',
    category: 'LAKEHOUSE + BI',
    title: 'Angola ANPG Data Engineering',
    description:
      'An analytics lakehouse for historical oil and gas production data from Angola, with notebooks and Power BI reporting.',
    technologies: ['Microsoft Fabric', 'Fabric Lakehouse', 'Python', 'SQL', 'Power BI'],
    href: 'https://github.com/helmercapassola/angola-anpg-data-engineering',
    visual: 'lakehouse',
    status: 'Orchestration in progress',
  },
  {
    number: '04',
    category: 'LEARNING + RESEARCH',
    title: 'Data Engineering with NotebookLM',
    description:
      'A learning project exploring data engineering concepts with NotebookLM.',
    technologies: ['Data Engineering', 'NotebookLM'],
    href: 'https://github.com/helmercapassola/engenharia_de_dados_notebooklm',
    visual: 'research',
  },
];

const toolkit = [
  {
    title: 'Data engineering & streaming',
    tools: ['Python', 'SQL', 'Apache Spark', 'Apache Airflow', 'Apache Kafka', 'Databricks'],
  },
  {
    title: 'Cloud data & analytics',
    tools: ['Microsoft Fabric', 'Power BI', 'PostgreSQL'],
  },
  {
    title: 'Development tools',
    tools: ['Git', 'GitHub', 'Docker'],
  },
];

const collaborationSkills = [
  { label: 'Agile / Scrum', icon: 'scrum' },
  { label: 'Sprint Planning', icon: 'calendar' },
  { label: 'Jira', icon: 'board' },
  { label: 'Confluence', icon: 'document' },
  { label: 'Stakeholder Management', icon: 'people' },
  { label: 'Technical Mentoring', icon: 'mentor' },
];

const certifications = [
  {
    name: 'Docker Accelerated Container',
    issuer: 'Infinity Big Data',
    date: 'August 2026',
    href: 'https://meuscursos.infinitybigdata.com/verify/d1946b348c5f956ff2c829a7ac4cbbfda1317128',
    icon: 'containers',
  },
  {
    name: 'Big Data & Analytics',
    issuer: 'FIAP',
    date: 'June 2026',
    href: 'https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=224ead717f0e021d860cafcfbba803a6&action=view',
    icon: 'chart',
  },
  {
    name: 'Fundamentals of Data Engineering',
    issuer: 'Data Science Academy',
    date: 'May 2026',
    href: 'https://mycourse.app/8zTujADSeXuRMoZDB',
    icon: 'database',
  },
  {
    name: 'NLW Pocket: Mobile — Kotlin',
    issuer: 'Rocketseat',
    date: 'December 2024',
    href: 'https://app.rocketseat.com.br/certificates/ef1989c2-9cf8-47c6-9688-8595ce249558',
    icon: 'python',
  },
];

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual project-visual-${type}`} aria-hidden="true">
      <span className="visual-orbit visual-orbit-one" />
      <span className="visual-orbit visual-orbit-two" />
      <span className="visual-core">{type === 'research' ? 'R&D' : 'DATA'}</span>
      <span className="visual-node visual-node-one" />
      <span className="visual-node visual-node-two" />
      <span className="visual-node visual-node-three" />
      <span className="visual-line visual-line-one" />
      <span className="visual-line visual-line-two" />
    </div>
  );
}

function FloatingDataSvg() {
  return (
    <svg
      className="floating-data-svg"
      viewBox="0 0 680 500"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="data-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#397158" fillOpacity=".18" />
        </pattern>
        <linearGradient id="data-flow-gradient" x1="0" x2="1">
          <stop offset="0" stopColor="#397158" stopOpacity=".14" />
          <stop offset=".5" stopColor="#397158" stopOpacity=".52" />
          <stop offset="1" stopColor="#397158" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="data-node-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#edf4ee" />
        </linearGradient>
        <filter id="data-soft-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#254b3b" floodOpacity=".11" />
        </filter>
        <marker id="flow-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0 0 7 3.5 0 7" fill="none" stroke="#719780" strokeWidth="1.2" />
        </marker>
      </defs>
      <rect width="680" height="500" fill="url(#data-grid)" opacity=".55" />
      <g fill="none" stroke="#54896b" strokeOpacity=".78" strokeWidth="2.5" markerEnd="url(#flow-arrow)">
        <path className="data-flow-path data-flow-path-one" d="M188 250C205 250 198 144 218 144" />
        <path className="data-flow-path data-flow-path-two" d="M307 196V304" />
        <path className="data-flow-path data-flow-path-three" d="M396 356C420 356 422 144 458 144" />
        <path className="data-flow-path data-flow-path-four" d="M553 196V304" />
      </g>
      <g className="data-flow-packets">
        <circle className="data-flow-packet packet-one" r="5">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M188 250C205 250 198 144 218 144" />
        </circle>
        <circle className="data-flow-packet packet-two" r="4">
          <animateMotion dur="2.8s" begin="-1.4s" repeatCount="indefinite" path="M307 196V304" />
        </circle>
        <circle className="data-flow-packet packet-three" r="5">
          <animateMotion dur="3s" begin="-1.2s" repeatCount="indefinite" path="M396 356C420 356 422 144 458 144" />
        </circle>
        <circle className="data-flow-packet packet-four" r="4">
          <animateMotion dur="2.8s" begin="-0.6s" repeatCount="indefinite" path="M553 196V304" />
        </circle>
        <circle className="data-flow-packet packet-one" r="3">
          <animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite" path="M188 250C205 250 198 144 218 144" />
        </circle>
        <circle className="data-flow-packet packet-two" r="3">
          <animateMotion dur="3.2s" begin="-0.8s" repeatCount="indefinite" path="M307 196V304" />
        </circle>
        <circle className="data-flow-packet packet-three" r="3">
          <animateMotion dur="3.4s" begin="-2s" repeatCount="indefinite" path="M396 356C420 356 422 144 458 144" />
        </circle>
        <circle className="data-flow-packet packet-four" r="3">
          <animateMotion dur="3.2s" begin="-1.4s" repeatCount="indefinite" path="M553 196V304" />
        </circle>
      </g>
      <g className="data-flow-node data-node-source" filter="url(#data-soft-shadow)">
        <rect x="12" y="198" width="176" height="104" rx="12" fill="url(#data-node-gradient)" />
        <rect x="37" y="216" width="30" height="30" rx="8" fill="#e2efe7" />
        <path d="M45 223h14m-14 6h14m-14 6h9" stroke="#397158" strokeWidth="1.8" strokeLinecap="round" />
        <text x="77" y="229" className="svg-label">DATA SOURCES</text>
        <text x="37" y="274" className="svg-caption">SQL · APIs · Files</text>
        <circle cx="153" cy="219" r="3" fill="#59a27b" />
      </g>
      <g className="data-flow-node data-node-stream" filter="url(#data-soft-shadow)">
        <rect x="218" y="92" width="178" height="104" rx="12" fill="url(#data-node-gradient)" />
        <rect x="235" y="110" width="30" height="30" rx="8" fill="#e2efe7" />
        <path d="M239 125c4-8 7 8 11 0s7 8 11 0" fill="none" stroke="#397158" strokeWidth="1.8" strokeLinecap="round" />
        <text x="275" y="123" className="svg-label">INGESTION</text>
        <text x="235" y="168" className="svg-caption">Batch + streaming</text>
        <circle cx="363" cy="113" r="3" fill="#59a27b" />
      </g>
      <g className="data-flow-node data-node-transform" filter="url(#data-soft-shadow)">
        <rect x="218" y="304" width="178" height="104" rx="12" fill="#17342b" />
        <rect x="235" y="322" width="32" height="32" rx="9" fill="#254c3c" />
        <path d="m251 328 2.4 7 7 2.5-7 2.4-2.4 7-2.4-7-7-2.4 7-2.5 2.4-7Z" fill="none" stroke="#a8e0bb" strokeWidth="1.4" strokeLinejoin="round" />
        <text x="277" y="335" className="svg-label svg-label-light">TRANSFORM</text>
        <text x="235" y="380" className="svg-caption svg-caption-light">Python · SQL · Spark</text>
        <circle cx="363" cy="325" r="3" fill="#97ddb9" />
      </g>
      <g className="data-flow-node data-node-platform" filter="url(#data-soft-shadow)">
        <rect x="458" y="92" width="190" height="104" rx="12" fill="url(#data-node-gradient)" />
        <rect x="475" y="110" width="30" height="30" rx="8" fill="#e2efe7" />
        <path d="m481 120 9-5 9 5v10l-9 5-9-5v-10Zm0 0 9 5 9-5m-9 5v10" fill="none" stroke="#397158" strokeWidth="1.3" strokeLinejoin="round" />
        <text x="515" y="123" className="svg-label">LAKEHOUSE</text>
        <text x="475" y="168" className="svg-caption">Cloud · governed · ready</text>
        <circle cx="631" cy="113" r="3" fill="#59a27b" />
      </g>
      <g className="data-flow-node data-node-insight" filter="url(#data-soft-shadow)">
        <rect x="438" y="304" width="210" height="104" rx="12" fill="url(#data-node-gradient)" />
        <text x="475" y="330" className="svg-label">BUSINESS INSIGHTS</text>
        <path d="M460 383v-24m27 24v-38m27 38v-19m27 19v-31m27 31v-45m27 45v-26" stroke="#579574" strokeWidth="7" strokeLinecap="round" />
        <path d="M455 389h176" stroke="#c7d8cb" strokeWidth="1" />
        <circle cx="631" cy="325" r="3" fill="#59a27b" />
      </g>
    </svg>
  );
}

function HeroDataBubbles() {
  return (
    <svg
      className="hero-data-bubbles"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="hero-bubble-wires">
        <path className="hero-bubble-wire" d="M190 510C265 465 325 350 410 290" />
        <path className="hero-bubble-wire hero-bubble-wire-alt" d="M300 135C330 205 360 245 410 290" />
        <path className="hero-bubble-wire" d="M410 290C500 345 570 465 660 545" />
        <path className="hero-bubble-wire hero-bubble-wire-alt" d="M410 290C510 300 635 335 730 360" />
        <path className="hero-bubble-wire" d="M730 360C780 295 825 235 875 190" />
        <path className="hero-bubble-wire hero-bubble-wire-alt" d="M730 360C835 360 945 375 1060 390" />
        <path className="hero-bubble-wire" d="M1060 390C1080 465 1095 525 1120 570" />
      </g>
      <circle className="hero-floating-bubble bubble-one" cx="190" cy="510" r="13" />
      <circle className="hero-floating-bubble bubble-two" cx="1060" cy="390" r="20" />
      <circle className="hero-floating-bubble bubble-three" cx="660" cy="545" r="9" />
      <circle className="hero-floating-bubble bubble-four" cx="410" cy="290" r="7" />
      <circle className="hero-floating-bubble bubble-five" cx="875" cy="190" r="11" />
      <circle className="hero-floating-bubble bubble-six" cx="300" cy="135" r="5" />
      <circle className="hero-floating-bubble bubble-seven" cx="730" cy="360" r="6" />
      <circle className="hero-floating-bubble bubble-eight" cx="1120" cy="570" r="8" />
    </svg>
  );
}

function ToolkitDataArt() {
  return (
    <svg
      className="toolkit-data-art"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="toolkit-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#397158" stopOpacity=".14" />
          <stop offset="1" stopColor="#397158" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="toolkit-line" x1="0" x2="1">
          <stop offset="0" stopColor="#397158" stopOpacity=".08" />
          <stop offset=".48" stopColor="#397158" stopOpacity=".38" />
          <stop offset="1" stopColor="#397158" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <path
        className="toolkit-area"
        d="M0 315 112 274 210 291 326 207 428 235 542 159 643 184 752 107 855 142 970 70 1074 94 1200 28v392H0Z"
        fill="url(#toolkit-area)"
      />
      <path
        className="toolkit-chart-line"
        d="M0 315 112 274 210 291 326 207 428 235 542 159 643 184 752 107 855 142 970 70 1074 94 1200 28"
        fill="none"
        stroke="url(#toolkit-line)"
        strokeWidth="2"
      />
      <path
        className="toolkit-chart-line toolkit-chart-line-secondary"
        d="M0 355 122 329 235 341 352 299 466 314 584 268 700 281 817 239 936 254 1050 211 1160 228 1200 215"
        fill="none"
        stroke="#397158"
        strokeOpacity=".13"
        strokeWidth="1.5"
      />
      <g className="toolkit-chart-packets">
        <circle r="4">
          <animateMotion dur="12s" repeatCount="indefinite" path="M0 315 112 274 210 291 326 207 428 235 542 159 643 184 752 107 855 142 970 70 1074 94 1200 28" />
        </circle>
        <circle r="3" opacity=".7">
          <animateMotion dur="16s" begin="-8s" repeatCount="indefinite" path="M0 315 112 274 210 291 326 207 428 235 542 159 643 184 752 107 855 142 970 70 1074 94 1200 28" />
        </circle>
        <circle r="3">
          <animateMotion dur="15s" begin="-7.5s" repeatCount="indefinite" path="M0 355 122 329 235 341 352 299 466 314 584 268 700 281 817 239 936 254 1050 211 1160 228 1200 215" />
        </circle>
      </g>
      <g className="toolkit-chart-nodes">
        <circle cx="326" cy="207" r="5" />
        <circle cx="542" cy="159" r="5" />
        <circle cx="752" cy="107" r="5" />
        <circle cx="970" cy="70" r="5" />
        <circle cx="1074" cy="94" r="5" />
      </g>
      <g className="toolkit-bars">
        <rect x="1015" y="323" width="14" height="55" rx="4" />
        <rect x="1045" y="294" width="14" height="84" rx="4" />
        <rect x="1075" y="309" width="14" height="69" rx="4" />
        <rect x="1105" y="267" width="14" height="111" rx="4" />
        <rect x="1135" y="282" width="14" height="96" rx="4" />
        <rect x="1165" y="235" width="14" height="143" rx="4" />
      </g>
      <circle className="toolkit-orbit toolkit-orbit-one" cx="156" cy="111" r="31" />
      <circle className="toolkit-orbit toolkit-orbit-two" cx="156" cy="111" r="48" />
    </svg>
  );
}

function ProfessionalDataArt() {
  return (
    <svg
      className="professional-data-art"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path className="profile-data-route profile-data-route-one" d="M-30 310C190 245 260 332 430 245S710 130 900 190 1120 95 1240 40" />
      <path className="profile-data-route profile-data-route-two" d="M-20 100C180 160 290 68 460 134S760 260 930 175 1100 235 1230 315" />
      <path className="profile-data-route profile-data-route-three" d="M120 420C300 322 430 365 590 290S850 250 1050 335" />
      <g className="profile-data-nodes">
        <circle cx="210" cy="254" r="4" />
        <circle cx="430" cy="245" r="5" />
        <circle cx="680" cy="173" r="4" />
        <circle cx="900" cy="190" r="5" />
        <circle cx="460" cy="134" r="4" />
        <circle cx="930" cy="175" r="4" />
      </g>
      <g className="profile-flow-packets">
        <circle r="4">
          <animateMotion dur="11s" repeatCount="indefinite" path="M-30 310C190 245 260 332 430 245S710 130 900 190 1120 95 1240 40" />
        </circle>
        <circle r="3" opacity=".7">
          <animateMotion dur="14s" begin="-7s" repeatCount="indefinite" path="M-20 100C180 160 290 68 460 134S760 260 930 175 1100 235 1230 315" />
        </circle>
      </g>
    </svg>
  );
}

function ToolIcon({ name, type }) {
  const iconType = type || toolIconTypes[name] || 'spark';

  return (
    <svg className="tool-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {iconType === 'python' && (
        <>
          <path d="M12 3.5H8.5a3 3 0 0 0-3 3v3h6.2a2.3 2.3 0 0 1 2.3 2.3V14" />
          <path d="M12 20.5h3.5a3 3 0 0 0 3-3v-3h-6.2a2.3 2.3 0 0 1-2.3-2.3V10" />
          <circle cx="9" cy="6.8" r=".7" /><circle cx="15" cy="17.2" r=".7" />
        </>
      )}
      {iconType === 'database' && (
        <>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
          <path d="M5 5.5v6.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V5.5M5 12v6.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V12" />
        </>
      )}
      {iconType === 'spark' && (
        <>
          <path d="m12 2.8 2.2 6.8 6.9 2.4-6.9 2.3-2.2 6.9-2.3-6.9-6.8-2.3 6.8-2.4L12 2.8Z" />
          <path d="m19 3 .7 2.1 2.1.7-2.1.7L19 8.6l-.7-2.1-2.1-.7 2.1-.7L19 3Z" />
        </>
      )}
      {(iconType === 'flow' || iconType === 'scrum') && (
        <>
          <rect x="3.5" y="4" width="5" height="5" rx="1.5" />
          <rect x="15.5" y="15" width="5" height="5" rx="1.5" />
          <circle cx="18" cy="6.5" r="2.5" />
          <path d="M8.5 6.5H12a3 3 0 0 1 3 3v5.5M6 9v8h9.5" />
        </>
      )}
      {(iconType === 'stream' || iconType === 'mentor') && (
        <>
          <path d="M4 8c2.2 0 2.2 8 4.5 8S10.7 8 13 8s2.2 8 4.5 8S19.7 8 22 8" />
          <path d="M4 12h2m12 0h2" />
        </>
      )}
      {(iconType === 'diamond' || iconType === 'fabric') && (
        <>
          <path d="m12 3 8.5 5v8L12 21l-8.5-5V8L12 3Z" />
          <path d="m3.5 8 8.5 5 8.5-5M12 13v8" />
        </>
      )}
      {iconType === 'chart' && (
        <>
          <path d="M4 20V11m5 9V5m5 15v-7m5 7V8" />
          <path d="M2.5 20.5h19" />
        </>
      )}
      {(iconType === 'branch' || iconType === 'hub') && (
        <>
          <circle cx="6" cy="5" r="2" /><circle cx="18" cy="7" r="2" />
          <circle cx="8" cy="19" r="2" />
          <path d="M6 7v5a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V9M8 17v-1" />
        </>
      )}
      {(iconType === 'containers' || iconType === 'board') && (
        <>
          <rect x="3" y="4" width="8" height="7" rx="1.5" />
          <rect x="13" y="4" width="8" height="7" rx="1.5" />
          <rect x="3" y="13" width="8" height="7" rx="1.5" />
          <path d="M13 16.5h8" />
        </>
      )}
      {iconType === 'calendar' && (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M7.5 3v4m9-4v4M3.5 9.5h17M8 13h2m4 0h2m-8 3h2" />
        </>
      )}
      {iconType === 'document' && (
        <>
          <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
          <path d="M14 3.5v5h5M8 13h8m-8 4h8" />
        </>
      )}
      {iconType === 'people' && (
        <>
          <circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1a5.5 5.5 0 0 1 11 0v1h-11Z" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8m2 2a4.5 4.5 0 0 1 2.5 4V19h-3" />
        </>
      )}
    </svg>
  );
}

function App() {
  const [repoStats, setRepoStats] = useState({ status: 'loading', count: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.github.com/users/helmercapassola', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((profile) => {
        if (!Number.isInteger(profile.public_repos) || profile.public_repos < 0) {
          throw new Error('GitHub API returned an invalid repository count');
        }
        setRepoStats({ status: 'success', count: profile.public_repos });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setRepoStats({ status: 'error', count: null });
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="portfolio">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Helmer Capassola, home">
          <span className="brand-mark" aria-hidden="true">HC</span>
          <span>Helmer Capassola</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a className="header-contact" href="mailto:helmercap@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <section className="hero-section" id="about">
          <HeroDataBubbles />
          <div className="hero section-wrap">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> Data professional</p>
              <h1>
                Data Engineer<br />
                {' '}<span>&amp; Analyst</span>
              </h1>
              <p className="hero-subtitle">Data Engineering • Analytics • BI</p>
              <p className="hero-tagline">
                Transforming Data Into Insights
              </p>
              <p className="hero-description">
                I design data pipelines, analytics solutions, and data products
                that turn information into insight — from reliable ingestion to
                business-ready reporting.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href="mailto:helmercap@gmail.com">
                  Get in touch <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div
              className="hero-visual"
              role="img"
              aria-label="Animated data pipeline: data sources flow through ingestion and transformation into a lakehouse and business insights"
            >
              <FloatingDataSvg />
            </div>
          </div>
        </section>

        <section className="professional-section" id="profile">
          <ProfessionalDataArt />
          <div className="section-wrap">
            <div className="section-heading professional-heading">
              <div>
                <p className="eyebrow">Professional profile</p>
                <h2>Reliable data.<br /><span>Real-world impact.</span></h2>
              </div>
              <span className="experience-mark"><strong>5+</strong> years in data</span>
            </div>
            <div className="professional-copy">
              <p>
                Data Engineer with a Bachelor&apos;s degree in Computer Engineering,
                a Master&apos;s degree, and more than five years of experience
                designing and implementing data pipelines and data solutions.
              </p>
              <p>
                Experienced in ETL/ELT with Python and SQL, integrating
                relational and non-relational sources, improving data quality,
                optimizing processing, and building batch and streaming
                architectures with Apache Kafka and Airflow. Project experience
                includes Databricks (Spark Declarative Pipelines), Microsoft
                Fabric, and AWS S3.
              </p>
              <p>
                Technical team leadership and project delivery in agile
                environments. Autonomous, rigorous, and focused on reliable,
                scalable solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Projects that move<br /><span>data forward.</span></h2>
              </div>
              <p className="section-intro">
                A selection of hands-on projects across streaming, orchestration,
                lakehouse architecture, and analytics.
              </p>
            </div>

            <a
              className="repo-stat"
              href="https://github.com/helmercapassola?tab=repositories"
              target="_blank"
              rel="noreferrer"
              aria-live="polite"
            >
              <span className="repo-stat-icon" aria-hidden="true"><ToolIcon type="hub" /></span>
              <span className="repo-stat-copy">
                <span className="repo-count">
                  {repoStats.status === 'success' ? repoStats.count : repoStats.status === 'loading' ? '…' : '—'}
                </span>
                <span className="repo-label">Public repositories</span>
              </span>
              <span className="repo-stat-link">
                {repoStats.status === 'error' ? 'Count unavailable · View GitHub' : 'View GitHub'}
                <span aria-hidden="true">↗</span>
              </span>
            </a>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <ProjectVisual type={project.visual} />
                  <div className="project-content">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span>{project.number}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    {project.status && <p className="project-status">{project.status}</p>}
                    <div className="project-tags" aria-label={`${project.title} technologies`}>
                      {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                    <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                      View repository <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="toolkit-section" id="toolkit">
          <ToolkitDataArt />
          <div className="section-wrap">
            <div className="section-heading toolkit-heading">
              <div>
                <p className="eyebrow">Tools of the trade</p>
                <h2>A practical<br /><span>data toolkit.</span></h2>
              </div>
              <p className="section-intro">
                Technologies I&apos;ve used, studied, and worked with recently.
                Always learning, always building.
              </p>
            </div>
            <div className="toolkit-grid">
              {toolkit.map((group, index) => (
                <article className="toolkit-card" key={group.title}>
                  <span className="toolkit-number">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <div className="tool-list">
                    {group.tools.map((tool) => (
                      <span className="tool-tag" key={tool}>
                        <ToolIcon name={tool} />
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="collaboration-section" id="collaboration">
          <div className="section-wrap">
            <div className="section-heading collaboration-heading">
              <div>
                <p className="eyebrow">How I deliver</p>
                <h2>Delivery &amp;<br /><span>Collaboration.</span></h2>
              </div>
              <p className="section-intro">
                Strong delivery comes from clear planning, shared context, and
                helping teams do their best work.
              </p>
            </div>
            <div className="collaboration-grid">
              {collaborationSkills.map((skill, index) => (
                <article className="collaboration-card" key={skill.label}>
                  <span className="collaboration-icon"><ToolIcon type={skill.icon} /></span>
                  <span className="collaboration-number">0{index + 1}</span>
                  <h3>{skill.label}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="education-section" id="education">
          <div className="section-wrap">
            <div className="section-heading education-heading">
              <div>
                <p className="eyebrow">Academic background</p>
                <h2>Learning that<br /><span>builds forward.</span></h2>
              </div>
            </div>
            <div className="education-list">
              <article className="education-item">
                <div className="education-marker" aria-hidden="true"><span /></div>
                <div className="education-content">
                  <p className="education-degree">Master&apos;s Degree · EQF Level 7</p>
                  <h3>Mobile Application Development</h3>
                  <p className="education-school">Universidade Gregório Semedo · Luanda</p>
                  <p className="education-thesis">
                    Thesis: Development of a Mobile Application for Personal and
                    Professional Guidance
                  </p>
                </div>
                <span className="education-dates">Oct 2019 — Jun 2023</span>
              </article>
              <article className="education-item">
                <div className="education-marker" aria-hidden="true"><span /></div>
                <div className="education-content">
                  <p className="education-degree">Bachelor&apos;s Degree</p>
                  <h3>Computer Engineering</h3>
                  <p className="education-school">Universidade Gregório Semedo · Luanda</p>
                </div>
                <span className="education-dates">2014 — 2017</span>
              </article>
            </div>
          </div>
        </section>

        <section className="certifications-section" id="certifications">
          <div className="section-wrap">
            <div className="section-heading certifications-heading">
              <div>
                <p className="eyebrow">Verified learning</p>
                <h2>Licenses &amp;<br /><span>Certifications.</span></h2>
              </div>
              <a
                className="certifications-profile-link"
                href="https://www.linkedin.com/in/helmercapassola/details/certifications/"
                target="_blank"
                rel="noreferrer"
              >
                View LinkedIn profile <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="certifications-grid">
              {certifications.map((certification, index) => (
                <article className="certification-card" key={certification.name}>
                  <div className="certification-card-top">
                    <span className="certification-icon"><ToolIcon type={certification.icon} /></span>
                    <span className="certification-number">0{index + 1}</span>
                  </div>
                  <div>
                    <h3>{certification.name}</h3>
                    <p className="certification-issuer">{certification.issuer}</p>
                  </div>
                  <div className="certification-card-footer">
                    <span>{certification.date}</span>
                    <a href={certification.href} target="_blank" rel="noreferrer">
                      View certificate <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-strip">
          <div className="section-wrap about-inner">
            <p className="eyebrow">The way I work</p>
            <p className="about-statement">
              I enjoy building reliable <span>batch and real-time pipelines</span>,
              exploring lakehouse architecture, and turning complex data into
              <span> useful, clear insights.</span>
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div>
              <p className="eyebrow">Have a data challenge?</p>
              <h2>Let&apos;s make data<br /><span>work for you.</span></h2>
            </div>
            <div className="contact-details">
              <a href="mailto:helmercap@gmail.com">Email <span>helmercap@gmail.com</span><b aria-hidden="true">↗</b></a>
              <a href="https://www.linkedin.com/in/helmercapassola" target="_blank" rel="noreferrer">
                LinkedIn <span>Connect with me</span><b aria-hidden="true">↗</b>
              </a>
              <a href="https://github.com/helmercapassola" target="_blank" rel="noreferrer">
                GitHub <span>Explore my repositories</span><b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">HC</span> Helmer Capassola</a>
        <p>Building data solutions.</p>
        <span>© {new Date().getFullYear()} Helmer Capassola</span>
      </footer>
    </div>
  );
}

export default App;
