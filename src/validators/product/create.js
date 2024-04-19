const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  title: { type: "string", min: 3, max: 100 },
  price: { type: "number" },
  score: { type: "number", optional: true },
  shortDesc: { type: "string", min: 3, max: 10000 },
  longDesc: { type: "string", min: 3, max: 100000 },
  link: { type: "string", min: 2, max: 50 },
  count: { type: "number", optional: true },
  weight: { type: "number" },
  sutaibleFor: { type: "string", min: 2, max: 150 },
  smell: { type: "string", min: 2, max: 50 },
};

const check = v.compile(schema);

export default check;
