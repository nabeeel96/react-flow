import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Sidebar from "./Sidebar";
import Designer from "./Designer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignContent: "stretch",
    alignItems: "flex-start",
    width: 1366,
    height: 768
  },
  content: {},
  box: {
    width: 200,
    height: 350,
    backgroundColor: "gray",
    flex: "1 0 auto",
    alignSelf: "flex-end"
  }
}));

export default function App() {
  const classes = useStyles();
  const { elements } = useSelector((state) => state.allElements);
  console.log("ELEMENTS", elements);
  const [attribute, setAttribute] = useState({});
  const [structureInput0, setStructureInput0] = useState({});
  const [structureInput1, setStructureInput1] = useState({});
  const [structureInput2, setStructureInput2] = useState({});

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <Designer
        setAttribute={setAttribute}
        globalElements={elements}
        // setElements={setElements}
        structureInput0={structureInput0}
        structureInput1={structureInput1}
        structureInput2={structureInput2}
        setStructureInput0={setStructureInput0}
        setStructureInput1={setStructureInput1}
        setStructureInput2={setStructureInput2}
      />
    </div>
  );
}
