import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { updateStructureInput } from "./store/slices/elements";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import AttributeField from "./AttributeField";
// import "./dnd.css";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "grid",
    position: "absolute",
    zIndex: 1500,
    width: 200,
    height: 350,
    right: "0",
    backgroundColor: "gray",
    justifyContent: "flex-end",
    alignItems: "flex-",
    flex: "0 0 auto",
    alignSelf: "flex-end"
    // visibility: "hidden"
  },
  root: {
    minWidth: 275,
    background: "linear-gradient(45deg, #081d34 30%, #081d34 90%)",
    height: "520px",
    // float: "left"
    position: "absolute",
    zIndex: 1500,
    right: "0",
    // color: "white"
    "& .MuiInputBase-input": {
      color: "white"
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
  // textField: {
  //   color: "white"
  // }
}));

export default function AttributeController({
  attribute,
  element,
  elementIndex,
  globalElements
}) {
  const [structureInput, setStructureInput] = useState(
    element.data.structureInput ? { ...element.data.structureInput } : {}
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log("ATTRIBUTE", attribute);

  const handleChange = (e) => {
    setStructureInput({
      ...structureInput,
      [e.target.getAttribute("name")]: e.target.value
    });
  };
  const onSave = () => {
    // use the updateStructureInput reducer
    let newElements = globalElements.map((e) => e);
    newElements[elementIndex].data.structureInput = structureInput;
    console.log("selected Element", newElements[elementIndex]);
    dispatch(
      updateStructureInput({
        elementIndex: elementIndex,
        structureInput: structureInput
      })
    );
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" color="secondary">
            {attribute}
          </Typography>
          <form noValidate autoComplete="off">
            {attribute === "input node" && (
              // <AttributeField
              //   key="0"
              //   id="0"
              //   label="product"
              // />
              <TextField
                // className={classes.textField}
                color="primary"
                id="0"
                label="product"
                name="product"
                value={structureInput.product}
                onChange={handleChange}
              />
            )}
            {attribute === "default node" && (
              <>
                <TextField
                  // className={classes.textField}
                  color="primary"
                  id="0"
                  label="product"
                  name="product"
                  value={structureInput.product}
                  onChange={handleChange}
                />
                <TextField
                  // className={classes.textField}
                  color="primary"
                  id="1"
                  label="price"
                  name="price"
                  value={structureInput.price}
                  onChange={handleChange}
                />
              </>
            )}
            {attribute === "output node" && (
              <>
                <TextField
                  // className={classes.textField}
                  color="primary"
                  id="0"
                  label="product"
                  name="product"
                  value={structureInput.product}
                  onChange={handleChange}
                />
                <TextField
                  // className={classes.textField}
                  color="primary"
                  id="1"
                  label="price"
                  name="price"
                  value={structureInput.price}
                  onChange={handleChange}
                />
                <TextField
                  // className={classes.textField}
                  color="primary"
                  id="2"
                  label="manufacturer"
                  name="manufacturer"
                  value={structureInput.manufacturer}
                  onChange={handleChange}
                />
              </>
            )}
          </form>
          {/* <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            SOMETHING
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onSave} color="Primary">
            save
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
