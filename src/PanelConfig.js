import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import elementsSlice from "./store/slices/elements";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import AttributeField from "./AttributeField";

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
    color: "white"
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
  },
  textField: {
    width: "100%"
    // margin: 8px 0,
    //display: inline-block,
    // border: 1px solid #ccc,
    // border-radius: 4px,
    // box-sizing: border-box,
  }
}));

export default function PanelConfig({
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
  // console.log("my selected element", element);

  const handleChange = (e) => {
    setStructureInput({
      ...structureInput,
      [e.target.getAttribute("name")]: e.target.value
    });
  };
  const onSave = () => {
    // let newElements = globalElements.map((e, i) => {
    //   if (i === 0) {
    //     return { ...e, data: { ...e.data, structureInput: structureInput } };
    //   }
    //   return e;
    // });
    // let newElements = [...globalElements];
    // newElements[elementIndex].data = {
    //   ...newElements[elementIndex].data,
    //   structureInput: { ...structureInput }
    // };
    let newElements = globalElements.map((e) => e);
    newElements[elementIndex].data.structureInput = structureInput;
    // newElements[elementIndex].test = { xxx: "xxx" };
    // console.log(
    //   "data.structureInput",
    //   newElements[elementIndex].data.structureInput
    // );
    // console.log("Structure input", structureInput);
    console.log("selected Element", newElements[elementIndex]);
    // dispatch(
    //   elementsSlice.actions.updateStructureInput({
    //     index: elementIndex,
    //     input: structureInput
    //   })
    // );
    dispatch(elementsSlice.actions.saveElements(newElements));
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
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
                className={classes.root}
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
                  id="0"
                  label="product"
                  name="product"
                  value={structureInput.product}
                  onChange={handleChange}
                />
                <TextField
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
                  id="0"
                  label="product"
                  name="product"
                  value={structureInput.product}
                  onChange={handleChange}
                />
                <TextField
                  id="1"
                  label="price"
                  name="price"
                  value={structureInput.price}
                  onChange={handleChange}
                />
                <TextField
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
