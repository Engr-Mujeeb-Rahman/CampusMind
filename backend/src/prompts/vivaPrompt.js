function build({ project, count = 5 }) {
  return (
    `Generate ${count} viva voce (oral exam) questions for a project titled "${project}". ` +
    'Cover introduction, methodology, results, and defense categories. ' +
    'Return a JSON array of objects. Each object must have: ' +
    '"category" (string), "level" ("Beginner" | "Intermediate" | "Advanced"), "question" (string), and "idealAnswer" (string).\n\n' +
    `Project: ${project}\nCount: ${count}\n\nViva Questions JSON:`
  );
}

module.exports = { build };
