import type { AppContext } from "site/apps/deco/records.ts";
import { profiles } from "site/db/schema.ts";

export async function loader(_: null, __: Request, { invoke }: AppContext) {
  const drizzle = await invoke('records/loaders/drizzle.ts');
  const profilesData = await drizzle.select({ name: profiles.name, email: profiles.email }).from(profiles);
  return { profiles: profilesData };
}

type SectionProps = Awaited<ReturnType<typeof loader>>

export default function Section({ profiles = [] }: SectionProps) {
  return <div class="p-2 flex flex-col items-center gap-2">
    {profiles.map(profile => (
      <span>{profile.name} - {profile.email}</span>
    ))}
    </div>
}