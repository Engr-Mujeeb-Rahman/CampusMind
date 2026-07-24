async function send(req, res) {
  const { message } = req.body;
  res.json({
    data: {
      reply: '[AI response placeholder]',
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = { send };
