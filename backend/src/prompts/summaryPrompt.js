function build(content) {
  return (
    'Summarize the following study notes into a clear, structured summary. ' +
    'Return valid JSON with this exact structure: ' +
    '{ "title": string, "intro": string, "keyTakeaways": string[], "definitions": [{ "term": string, "definition": string }] }.\n\n' +
    `Notes:\n${content}\n\nSummary JSON:`
  );
}

module.exports = { build };
