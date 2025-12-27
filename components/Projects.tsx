// import { resume } from "@/data/resume";
// import { Card, Pill } from "@/components/ui";

// export default function Projects() {
//   return (
//     <Card title="Recent Projects" action={<span className="text-xs text-neutral-500">Curated</span>}>
//       <div className="grid gap-3 md:grid-cols-2">
//         {resume.projects.map((p) => (
//           <div key={p.name} className="rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50 transition">
//             <p className="text-sm font-semibold">{p.name}</p>
//             <p className="text-sm text-neutral-600 mt-1">{p.desc}</p>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {p.tags.map((t) => (
//                 <Pill key={t}>{t}</Pill>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }
