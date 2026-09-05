import { MEMBERS } from "@/lib/members";
import { MemberAvatar } from "@/components/MemberAvatar";

export const metadata = {
  title: "Members",
  description: "DPK team members.",
};

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
          DPK Team ({MEMBERS.length})
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          Members
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          The people designing, building, and maintaining the DPK Content System.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((member) => (
          <div
            key={member.github}
            className="group relative flex items-center gap-4 rounded-2xl border border-ink-200/80 bg-white p-5 shadow-2xs transition-colors hover:border-ink-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-ink-700"
          >
            <MemberAvatar name={member.name} github={member.github} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900 dark:text-white">
                {member.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-ink-500 dark:text-ink-400">
                {member.role}
              </p>
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-ink-100 bg-ink-50/70 px-2 py-0.5 text-[11px] font-medium text-ink-600 transition hover:border-ink-300 hover:bg-white hover:text-ink-900 dark:border-ink-800 dark:bg-ink-800/60 dark:text-ink-400 dark:hover:border-ink-600 dark:hover:bg-ink-800 dark:hover:text-white"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a11 11 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z" />
                </svg>
                @{member.github}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
