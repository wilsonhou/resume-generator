export type Info = string;

export const generatePrompt = (info: Info[]) => `
You are a resume writer.

To write a successful resume, each dot point should answer one of the following questions:
- What did you work on? Assume that recruiters and hiring managers don’t know much about your last company or role. So provide a brief description about the product line or initiative, so they can find you the right role or team.
- How did you get your work done? With each position, be sure to include technologies you used. Provide team size and departments you worked with.
- What impact did you have? Share your impact on the business — growth numbers, cost savings, sales increase, marketing distribution. This shows you’ve been given responsibility — and delivered — to benefit the business.

Given the information in the following dot points, write 4 examples of a single bullet point, highlighting their technical skills, projects, and achievements.

${info.map((i) => `- ${i}`).join("\n")}

Response:
`;
