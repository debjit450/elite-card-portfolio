import React from 'react';
import { Briefcase, Code, Cpu, Award, Terminal } from 'lucide-react';

const styles = `
  @keyframes printIn {
    0% { opacity: 0; transform: translateY(20px); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  .animate-print-in {
    animation: printIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .animate-scan {
    animation: scan 8s linear infinite;
  }
`;

interface StatementHeaderProps {
  title: string;
  subtitle: string;
  delay?: number;
}

const StatementHeader: React.FC<StatementHeaderProps> = ({
  title,
  subtitle,
  delay = 0
}) => (
  <div
    className="border-b border-white/10 pb-4 mb-8 flex justify-between items-end opacity-0 animate-print-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex flex-col">
      <span className="text-[0.55rem] font-mono tracking-[0.3em] text-gray-500 uppercase mb-2 flex items-center gap-2">
        {subtitle}
      </span>
      <h2 className="text-xl md:text-3xl font-display font-bold text-gray-200 tracking-[0.1em] uppercase">
        {title}
      </h2>
    </div>
    <div className="hidden md:block h-px w-24 bg-white/20 mb-2" />
  </div>
);

interface StatementRowProps {
  date: string;
  entity: string;
  description: string;
  amount?: string;
  tags?: string[];
  delay: number;
}

const StatementRow: React.FC<StatementRowProps> = ({
  date,
  entity,
  description,
  amount,
  tags,
  delay
}) => (
  <div
    className="group relative py-8 border-b border-white/[0.04] hover:bg-white/[0.02] transition-all duration-500 -mx-6 px-6 rounded-lg opacity-0 animate-print-in cursor-default"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#cbb577] transition-all duration-500 group-hover:h-[60%] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#cbb577]" />

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-2">
        <span className="font-mono text-[0.65rem] tracking-wider text-gray-600 group-hover:text-gray-400 transition-colors">
          {date}
        </span>
      </div>

      <div className="md:col-span-8">
        <h3 className="text-sm font-bold text-gray-300 tracking-wide uppercase mb-3 group-hover:text-[#cbb577] transition-colors flex items-center gap-2">
          {entity}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 font-serif leading-relaxed max-w-2xl group-hover:text-gray-400 transition-colors">
          {description}
        </p>
        {tags && (
          <div className="flex flex-wrap gap-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[0.5rem] uppercase tracking-wider border border-white/10 px-2 py-1 rounded text-gray-500 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-2 flex justify-end items-start">
        <span className="font-mono text-[0.6rem] text-gray-600 tracking-widest uppercase border border-transparent group-hover:border-white/10 px-2 py-1 rounded transition-all">
          {amount || 'VERIFIED'}
        </span>
      </div>
    </div>
  </div>
);

interface AssetColumnProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  delay: number;
}

const AssetColumn: React.FC<AssetColumnProps> = ({ icon, title, items, delay }) => (
  <div
    className="space-y-4 opacity-0 animate-print-in p-6 border border-transparent hover:border-white/5 rounded-lg transition-colors hover:bg-white/[0.02] group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3 text-[#cbb577]/60 group-hover:text-[#cbb577] transition-colors">
      {icon}
      <h4 className="text-[0.65rem] font-bold uppercase tracking-widest">{title}</h4>
    </div>
    <ul className="text-xs text-gray-500 font-serif space-y-3 border-l border-white/5 pl-4 group-hover:border-[#cbb577]/30 transition-colors">
      {items.map((item) => (
        <li key={item} className="group-hover:translate-x-1 transition-transform duration-300">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

interface ProjectCardProps {
  title: string;
  subtitle: string;
  bullets: string[];
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  bullets,
  delay
}) => (
  <div
    className="opacity-0 animate-print-in group border border-white/[0.04] rounded-lg p-6 md:p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 relative overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-sm md:text-base font-semibold tracking-[0.14em] uppercase text-gray-200 flex items-center gap-2">
          <Briefcase className="w-3 h-3 text-[#cbb577]" />
          {title}
        </h3>
        <p className="text-[0.65rem] text-gray-500 mt-1 tracking-[0.18em] uppercase">
          {subtitle}
        </p>
      </div>
      <span className="text-[0.55rem] font-mono text-[#cbb577]/80 tracking-[0.22em] uppercase">
        Project
      </span>
    </div>
    <ul className="mt-4 space-y-2 text-[0.7rem] md:text-[0.75rem] text-gray-400 font-serif leading-relaxed list-disc list-inside">
      {bullets.map((b, idx) => (
        <li key={idx}>{b}</li>
      ))}
    </ul>
  </div>
);

export const Portfolio: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="w-full bg-[#080808] border border-white/[0.05] p-8 md:p-20 rounded-[4px] shadow-2xl relative overflow-hidden">
        {/* Scan line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-scan pointer-events-none opacity-20" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cbb577]/20 to-transparent opacity-50" />

        <div
          className="flex justify-between mb-20 opacity-0 animate-print-in"
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[0.5rem] font-mono tracking-widest text-gray-600 uppercase">
              Statement Ref
            </span>
            <span className="text-xs font-mono text-gray-400">#8842-XJ9-001</span>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="text-[0.5rem] font-mono tracking-widest text-gray-600 uppercase">
              Format
            </span>
            <span className="text-xs font-mono text-gray-400">DIGITAL // ENCRYPTED</span>
          </div>
        </div>

        {/* Experience */}
        <section className="mb-24">
          <StatementHeader
            title="Transaction History"
            subtitle="Professional Experience"
            delay={300}
          />
          <div className="space-y-2">
            <StatementRow
              date="DEC 2024 — SEP 2025"
              entity="Valk Technologies & Solutions"
              description="Architected scalable backend infrastructure using Node.js and Mongo. Designed high-performance frontend interfaces using React Native and Next.js."
              amount="COMPLETED"
              tags={['System Design', 'Full Stack', 'Architecture']}
              delay={400}
            />
            <StatementRow
              date="MAR 2024 — MAY 2024"
              entity="Notesight LLC"
              description="Spearheaded the Angular to React migration initiative. Optimized RESTful API integration layers for enhanced data throughput."
              amount="COMPLETED"
              tags={['Migration', 'Optimization', 'React']}
              delay={500}
            />
          </div>
        </section>

        {/* Skills */}
        <section className="mb-24">
          <StatementHeader
            title="Asset Allocation"
            subtitle="Technical Capabilities"
            delay={600}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AssetColumn
              icon={<Code className="w-4 h-4" />}
              title="Frontend"
              items={['React.js / Next.js', 'TypeScript', 'React Native', 'Tailwind CSS']}
              delay={700}
            />
            <AssetColumn
              icon={<Cpu className="w-4 h-4" />}
              title="Backend"
              items={['Node.js / Express', 'Django / Python', 'GraphQL', 'Microservices']}
              delay={800}
            />
            <AssetColumn
              icon={<Briefcase className="w-4 h-4" />}
              title="Database"
              items={['MongoDB', 'PostgreSQL', 'Redis Cache', 'Firebase']}
              delay={900}
            />
            <AssetColumn
              icon={<Award className="w-4 h-4" />}
              title="Tools"
              items={['Docker / K8s', 'AWS Infrastructure', 'Git / CI/CD', 'Jira / Agile']}
              delay={1000}
            />
          </div>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <StatementHeader title="Project Ledger" subtitle="Selected Builds" delay={1100} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Notesight"
              subtitle="AI Productivity Tool"
              delay={1200}
              bullets={[
                'Transcript Generation: Utilizes advanced AI algorithms to generate accurate transcripts from video and audio recordings in real-time.',
                'Summarization: Automatically condenses lengthy transcripts into concise summaries, saving time and improving efficiency.',
                'Actionable Feedback: Provides actionable insights and feedback based on the content of transcripts, facilitating informed decision-making.',
                'Integration: Integrates seamlessly with calendars and virtual meeting platforms, streamlining workflow and enhancing productivity.'
              ]}
            />
            <ProjectCard
              title="Octa"
              subtitle="Travel Booking Platform"
              delay={1300}
              bullets={[
                'Multi-client travel booking platform comprising customer app, driver app, and admin panel.',
                'Customer App: Supports cab booking, outstation rentals, and hotel reservations.',
                'Driver App: Manages ride requests, navigation, and trip details in real-time.',
                'Admin Panel: Monitors bookings, manages users, and oversees platform operations.'
              ]}
            />
          </div>
        </section>

        {/* Education */}
        <section>
          <StatementHeader title="Knowledge Base" subtitle="Academic Records" delay={1400} />
          <StatementRow
            date="2020 — 2024"
            entity="Techno India University"
            description="Bachelor of Technology in Computer Science & Engineering. Graduated with Honors (8.5/10)."
            amount="DEGREE"
            delay={1500}
          />
          <StatementRow
            date="2008 — 2020"
            entity="Bidhannagar Municipal School"
            description="Secondary & Higher Secondary Education (Pure Sciences)."
            amount="ALUMNI"
            delay={1600}
          />
        </section>

        {/* Bottom text */}
        <div
          className="mt-32 border-t border-dashed border-white/10 pt-12 text-center md:text-left opacity-0 animate-print-in"
          style={{ animationDelay: '1700ms' }}
        >
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Terminal className="w-3 h-3 text-gray-600" />
            <span className="text-[0.5rem] font-mono text-gray-600 uppercase">
              End of Record
            </span>
          </div>
          <p className="text-[0.45rem] text-gray-700CPu font-serif leading-relaxed uppercase tracking-wider max-w-2xl mx-auto md:mx-0">
            This document contains proprietary information. The skills and experience listed
            herein are verified assets of Debjit Dey. Reproduction or distribution without
            express written consent is prohibited.
          </p>
        </div>
      </div>
    </>
  );
};
