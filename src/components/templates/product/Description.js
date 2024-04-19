import React from "react";

const Description = ({ longDesc }) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <p>{longDesc}</p>
    </div>
  );
};

export default Description;
