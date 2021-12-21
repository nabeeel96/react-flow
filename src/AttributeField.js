import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import elementsSlice, { getElements } from "./store/slices/elements";
import { useSelector } from "react-redux";

export default ({ attribute, id, label }) => {
  const dispatch = useDispatch();
  const elements = useSelector(getElements);
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
    // console.log("input field", e.target.id);
  };

  return (
    <TextField
      id={id}
      label={label}
      value={input} // how to use attribute if they are many
      onChange={inputHandler}
    />
  );
};
