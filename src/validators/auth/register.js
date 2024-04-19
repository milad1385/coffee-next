import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  name: { type: "string", min: 3, max: 255 },
  phone: { type: "string", min: 11, max: 11 },
  email: { type: "string", optional: true },
  password: { type: "string", optional: true, min: 8 },
};

const check = v.compile(schema);

export default check;
