import { MEMBERS } from "@/lib/members";
import { initials, avatarColor } from "@/lib/avatar";

export const metadata = {
  title: "Members",
  description: "DPK team members.",
};

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          Members
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          The people behind the DPK Content System.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((member) => (
          <div
            key={member.github}
            className="flex items-center gap-4 rounded-2xl border border-ink-200/70 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-sm ${avatarColor(
                member.name,
              )}`}
            >
              {initials(member.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900 dark:text-white">
                {member.name}
              </p>
              <p className="truncate text-xs text-ink-500 dark:text-ink-400">
                {member.role}
              </p>
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
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
