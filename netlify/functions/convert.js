const cards = require('./cards');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body || "{}");
  const deckText = body.deck || "";
  const codes = deckText.trim().split(/\s+/);
  const counts = {};

  codes.forEach(code => {
    const id = code.split("-").slice(0, 2).join("-");
    counts[id] = (counts[id] || 0) + 1;
  });

  const output = Object.entries(counts)
    .map(([id, count]) => {
      const name = cards[id] || "[Unrevealed]";
      return `${count} ${name}`;
    })
    .join("\n");

  return {
    statusCode: 200,
    body: JSON.stringify({ result: output })
  };
};