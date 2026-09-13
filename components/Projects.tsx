"use client";

import { projects } from "@/data/projects";
import { Card } from "@/components/ui";
import ProjectList, { Count } from "@/components/ProjectList";

/**
 * Work that can be opened and used, so each entry leads with its live demo.
 *
 * The entry list itself lives in `ProjectList`, which the Case Studies section
 * renders too; what belongs to this file is the heading, the count and the filter
 * that decides which entries are shown here.
 */
export default function Projects() {
    const live = projects.filter((p) => Boolean(p.liveUrl));

    return (
        <Card title="Projects" action={<Count n={live.length} singular="project" plural="projects" />}>
            <ProjectList items={live} />
        </Card>
    );
}
