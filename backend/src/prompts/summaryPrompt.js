function build(content) {
  return (
    'Summarize the following study notes into a clear, structured summary. ' +
    'Include key concepts, important definitions, and main takeaways. ' +
    'Format the output using markdown bullet points and bold text for key terms.\n\n' +
    `Notes:\n${content}\n\nSummary:`
  );
}

module.exports = { build };
