const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  username: { type: "string", min: 3, max: 100 },
  body: { type: "string", min: 3, max: 10000 },
  email: { type: "string" },
  score: { type: "number", optional: true },
};

const check = v.compile(schema);

export default check;
