"use client";

import { projects } from "@/data/projects";
import { Card } from "@/components/ui";
import ProjectList, { Count } from "@/components/ProjectList";

/**
 * Work that cannot be demonstrated — internal, closed or simply not deployed — so
 * there is nothing to open and the writing has to carry it.
 *
 * Which entries land here is decided by the data, not by a list kept in step by
 * hand: an entry with no `liveUrl` is filed here and the ones with a live demo go to
 * `Projects`. While there is nothing to file the card is not rendered at all, so the
 * page is unchanged until such an entry is added.
 */
export default function CaseStudies() {
    const studies = projects.filter((p) => !p.liveUrl);

    if (studies.length === 0) return null;

    return (
        <Card
            id="case-studies"
            title="Case Studies"
            delay={140}
            action={<Count n={studies.length} singular="case study" plural="case studies" />}
        >
            <ProjectList items={studies} />
        </Card>
    );
}
