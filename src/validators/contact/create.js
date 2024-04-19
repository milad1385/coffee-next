const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  name: { type: "string", min: 3, max: 22 },
  email: { type: "string" , min : 8 , max : 45 },
  phone: { type: "string", min: 11, max: 11 },
  company: { type: "string" },
  message: { type: "string" },
};

const check = v.compile(schema);

export default check;
