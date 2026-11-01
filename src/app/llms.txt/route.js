import HeroInfo from "@/utility/hero.json";
import { SITE_URL } from "@/utility/site-config";

export function GET() {
  const currentRole = HeroInfo.experience[0];
  const yearsExperience = HeroInfo.stats.find(
    (stat) => stat.label === "Years Experience"
  );
  const skills = HeroInfo.skills.flatMap((category) =>
    category.skills.map((skill) => skill.name)
  );
  const experience = HeroInfo.experience
    .map(
      (role) =>
        `- **${role.title}, ${role.company}** (${role.period}): ${role.description}`
    )
    .join("\n");
  const projects = HeroInfo.projects
    .map((project) => `- **${project.title}:** ${project.description}`)
    .join("\n");

  const profile = `# ${HeroInfo.name}

> ${HeroInfo.name} is a software engineer based in ${HeroInfo.location} with ${yearsExperience.value}${yearsExperience.suffix} years of experience. Currently an ${currentRole.title} at ${currentRole.company}.

Use this page as a concise, self-reported profile. For current details, refer to the linked official profiles.

## Profile

- Current role: ${currentRole.title} at ${currentRole.company}
- Location: ${HeroInfo.location}
- Website: ${SITE_URL}
- LinkedIn: ${HeroInfo.linkedinUrl}
- GitHub: ${HeroInfo.githubUrl}
- Contact: ${HeroInfo.email}
- Summary: ${HeroInfo.seoDescription}

## Experience

${experience}

## Skills

${skills.join(", ")}

## Projects

${projects}
`;

  return new Response(profile, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
