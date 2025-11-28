import React from 'react';
import { Briefcase, Code, Cpu, Award, Terminal } from 'lucide-react';

// Animation styles injected directly for the "Print-in" effect
const styles = `
  @keyframes printIn {
    0% { opacity: 0; transform: translateY(10px); filter: blur(4px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  .animate-print-in {
    animation: printIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

const StatementHeader: React.FC<{ title: string; subtitle: string; delay?: number }> = ({ title, subtitle, delay = 0 }) => (
  <div
    className="border-b border-white/10 pb-4 mb-8 flex justify-between items-end opacity-0 animate-print-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex flex-col">
      <span className="text-[0.55rem] font-mono tracking-[0.3em] text-gray-500 uppercase mb-1 flex items-center gap-2">
        {subtitle}
      </span>
      <h2 className="text-xl md:text-2xl font-display font-bold text-gray-200 tracking-[0.15em] uppercase">
        {title}
      </h2>
    </div>
    <div className="hidden md:block h-px w-24 bg-white/20 mb-2" />
  </div>
);

const StatementRow: React.FC<{
  date: string;
  entity: string;
  description: string;
  amount?: string;
  tags?: string[];
  delay: number;
}> = ({ date, entity, description, amount, tags, delay }) => (
  <div
    className="group relative py-6 border-b border-white/[0.04] hover:bg-white/[0.03] transition-all duration-300 -mx-4 px-4 rounded-lg opacity-0 animate-print-in cursor-default"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Hover Highlight Marker */}
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#cbb577] transition-all duration-300 group-hover:h-[60%] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#cbb577]" />

    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Col 1: Date */}
      <div className="md:col-span-2">
        <span className="font-mono text-[0.65rem] tracking-wider text-gray-600 group-hover:text-gray-400 transition-colors">
          {date}
        </span>
      </div>

      {/* Col 2: Content */}
      <div className="md:col-span-8">
        <h3 className="text-sm font-bold text-gray-300 tracking-wide uppercase mb-2 group-hover:text-[#cbb577] transition-colors flex items-center gap-2">
          {entity}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 font-serif leading-relaxed max-w-2xl group-hover:text-gray-400 transition-colors">
          {description}
        </p>
        {tags && (
          <div className="flex flex-wrap gap-2 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
            {tags.map(t => (
              <span key={t} className="text-[0.5rem] uppercase tracking-wider border border-white/10 px-1.5 py-0.5 rounded text-gray-500 font-mono">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Col 3: Status */}
      <div className="md:col-span-2 flex justify-end items-start">
        <span className="font-mono text-[0.6rem] text-gray-600 tracking-widest uppercase border border-transparent group-hover:border-white/10 px-2 py-1 rounded transition-all">
          {amount || 'VERIFIED'}
        </span>
      </div>
    </div>
  </div>
);

const AssetColumn: React.FC<{
  icon: React.ReactNode;
  title: string;
  items: string[];
  delay: number
}> = ({ icon, title, items, delay }) => (
  <div
    className="space-y-4 opacity-0 animate-print-in p-4 border border-transparent hover:border-white/5 rounded-lg transition-colors hover:bg-white/[0.02] group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-2 text-[#cbb577]/60 group-hover:text-[#cbb577] transition-colors">
      {icon}
      <h4 className="text-[0.65rem] font-bold uppercase tracking-widest">{title}</h4>
    </div>
    <ul className="text-xs text-gray-500 font-serif space-y-2 border-l border-white/5 pl-3 group-hover:border-[#cbb577]/30 transition-colors">
      {items.map(item => (
        <li key={item} className="group-hover:translate-x-1 transition-transform duration-300">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const Portfolio: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="w-full max-w-4xl mx-auto bg-[#080808] border border-white/[0.08] p-8 md:p-16 rounded-[2px] shadow-2xl relative overflow-hidden">

        {/* Terminal Scan Line Overlay (Subtle) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 animate-[scan_4s_linear_infinite] pointer-events-none opacity-20" />

        {/* Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cbb577]/30 to-transparent opacity-50" />

        <div className="flex justify-between mb-16 opacity-0 animate-print-in" style={{ animationDelay: '100ms' }}>
          <div className="flex flex-col gap-1">
            <span className="text-[0.5rem] font-mono tracking-widest text-gray-600 uppercase">Statement Ref</span>
            <span className="text-xs font-mono text-gray-400">#8842-XJ9-001</span>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="text-[0.5rem] font-mono tracking-widest text-gray-600 uppercase">Format</span>
            <span className="text-xs font-mono text-gray-400">DIGITAL // ENCRYPTED</span>
          </div>
        </div>

        {/* Experience Section */}
        <section className="mb-20">
          <StatementHeader title="Transaction History" subtitle="Professional Experience" delay={200} />
          <div className="space-y-2">
            <StatementRow
              date="DEC 2024 — SEP 2025"
              entity="Valk Technologies & Solutions"
              description="Architected scalable backend infrastructure using Node.js and Mongo. Designed high-performance frontend interfaces using React Native and Next.js."
              amount="COMPLETED"
              tags={['System Design', 'Full Stack', 'Architecture']}
              delay={300}
            />
            <StatementRow
              date="MAR 2024 — MAY 2024"
              entity="Notesight LLC"
              description="Spearheaded the Angular to React migration initiative. Optimized RESTful API integration layers for enhanced data throughput."
              amount="COMPLETED"
              tags={['Migration', 'Optimization', 'React']}
              delay={400}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <StatementHeader title="Asset Allocation" subtitle="Technical Capabilities" delay={500} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AssetColumn
              icon={<Code className="w-4 h-4" />}
              title="Frontend"
              items={['React.js / Next.js', 'TypeScript', 'React Native', 'Tailwind CSS']}
              delay={600}
            />
            <AssetColumn
              icon={<Cpu className="w-4 h-4" />}
              title="Backend"
              items={['Node.js / Express', 'Django / Python', 'GraphQL', 'Microservices']}
              delay={700}
            />
            <AssetColumn
              icon={<Briefcase className="w-4 h-4" />}
              title="Database"
              items={['MongoDB', 'PostgreSQL', 'Redis Cache', 'Firebase']}
              delay={800}
            />
            <AssetColumn
              icon={<Award className="w-4 h-4" />}
              title="Tools"
              items={['Docker / K8s', 'AWS Infrastructure', 'Git / CI/CD', 'Jira / Agile']}
              delay={900}
            />
          </div>
        </section>

        {/* Education */}
        <section>
          <StatementHeader title="Knowledge Base" subtitle="Academic Records" delay={1000} />
          <StatementRow
            date="2020 — 2024"
            entity="Techno India University"
            description="Bachelor of Technology in Computer Science & Engineering. Graduated with Honors (8.5/10)."
            amount="DEGREE"
            delay={1100}
          />
          <StatementRow
            date="2008 — 2020"
            entity="Bidhannagar Municipal School"
            description="Secondary & Higher Secondary Education (Pure Sciences)."
            amount="ALUMNI"
            delay={1200}
          />
        </section>

        {/* Bottom Legal Text */}
        <div className="mt-24 border-t border-dashed border-white/10 pt-8 text-center md:text-left opacity-0 animate-print-in" style={{ animationDelay: '1300ms' }}>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Terminal className="w-3 h-3 text-gray-600" />
            <span className="text-[0.5rem] font-mono text-gray-600 uppercase">End of Record</span>
          </div>
          <p className="text-[0.45rem] text-gray-700 font-serif leading-relaxed uppercase tracking-wider max-w-2xl mx-auto md:mx-0">
            This document contains proprietary information. The skills and experience listed herein are verified assets of Debjit Dey.
            Reproduction or distribution without express written consent is prohibited.
          </p>
        </div>

      </div>
    </>
  );
};