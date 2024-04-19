import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  identifire: { type: "string", min: 4, max: 25 },
  password: { type: "string", min: 8, max: 20 },
};

const check = v.compile(schema);

export default check;
