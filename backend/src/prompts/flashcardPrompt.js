function build(content) {
  return (
    'Generate a set of flashcards from the following study material. ' +
    'Each flashcard should have a question on the front and a concise answer on the back. ' +
    'Return the result as a JSON array of objects with "question" and "answer" fields.\n\n' +
    `Material:\n${content}\n\nFlashcards (JSON):`
  );
}

module.exports = { build };
