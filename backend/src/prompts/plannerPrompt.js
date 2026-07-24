function build({ subject, deadline, hoursPerDay }) {
  return (
    'Create a detailed daily study plan to master the subject before the deadline. ' +
    'Return a JSON array of objects. Each object must have: ' +
    '"day" (number), "title" (string), "topics" (array of strings), "hours" (number), and "focus" (string).\n\n' +
    `Subject: ${subject}\nDeadline: ${new Date(deadline).toLocaleDateString()}\nHours per day: ${hoursPerDay}\n\nStudy Plan JSON:`
  );
}

module.exports = { build };
