function build({ topic, count = 5, difficulty = 'medium' }) {
  return (
    `Generate ${count} multiple-choice questions on the topic "${topic}" at ${difficulty} difficulty. ` +
    'Return a JSON array of objects. Each object must have: ' +
    '"question" (string), "options" (array of 4 strings), "correctIndex" (number 0-3), and "explanation" (string).\n\n' +
    `Topic: ${topic}\nDifficulty: ${difficulty}\nCount: ${count}\n\nMCQ JSON:`
  );
}

module.exports = { build };
