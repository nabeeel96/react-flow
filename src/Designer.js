import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveElements, updateElements } from "./store/slices/elements";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background
  // useZoomPanHelper,
} from "react-flow-renderer";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import localforage from "localforage";

import Shapes from "./Shapes";
import DesignerPanel from "./DesignerPanel";
// import PanelConfig from "./PanelConfig";
import AttributeController from "./AttributeController";

import "./dnd.css";

localforage.config({
  name: "react-flow-docs",
  storeName: "flows"
});

const flowKey = "example-flow";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignContent: "stretch",
    alignItems: "flex-start"
  },
  content: {},
  designer: {
    width: "85vw",
    height: "90vh",
    flex: "1 0 auto",
    alignSelf: "flex-start"
  }
}));

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ globalElements }) => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [flow, setFlow] = useState(null);
  const [data, setData] = useState(null);
  const [elements, setElements] = useState(globalElements);
  const [attribute, setAttribute] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  // console.log("elements", elements);
  const classes = useStyles();

  useEffect(() => {
    // const load = async () => {
    //   let response = await fetch('api/data')
    //   response = await response.json()
    //   dataSet(response)
    // }
    // onFileUpload();
  }, [selectedFile]);

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
    // onSave();
  };
  // const { transform } = useZoomPanHelper();

  const onDragOver = (event) => {
    event.preventDefault();
    console.log("DRAG");
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    console.log("event", event.dataTransfer);
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` }
    };
    // setElements((es) => es.concat(newNode));
    setElements([...elements, newNode]);
    // onSave();
    dispatch(updateElements(newNode));
    console.log("ONDROP", elements);
  };

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const f = reactFlowInstance.toObject();
      console.log("onSave FLOW", f.elements);
      setFlow(f);
      localforage.setItem(flowKey, f);
      dispatch(saveElements(f.elements));
    }
  }, [reactFlowInstance, flow, elements, dispatch]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);
      console.log("FLOW", flow);

      if (flow) {
        // const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        // setStructureInput0(flow.elements[0].data.structureInput || {});
        // transform({ x, y, zoom: flow.zoom || 0 });
      }
    };

    restoreFlow();
  }, [setElements]);

  function onReaderLoad(event) {
    // console.log("object ", event.target.result);
    const obj = JSON.parse(event.target.result);
    setData(obj);
    console.log("data", data);
  }

  const onFileChange = (e) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    // console.log("onFileChange", selectedFile);
  };

  const onFileUpload = () => {
    const reader = new FileReader();
    // reader.append("myFile", selectedFile, selectedFile.name);
    reader.readAsText(selectedFile);
    // console.log("reader", reader);
    // console.log("result", reader.result);
    console.log("onFileUpload DATA", data);
    setElements(data.elements || []);
    // setStructureInput(data.elements[0].data.structureInput || {});
  };

  const doubleClickHandler = (e) => {
    console.log("Before", attribute);
    setShow(!show);
    setAttribute(e.target.innerText);
    const nodeId = e.target.getAttribute("data-id");
    console.log("After", attribute);
    elements.forEach((el, i) => {
      if (el.id === nodeId) {
        console.log("loop", nodeId, i);
        setSelectedElement(i);
      }
    });
    // console.log("x", selectedElement);
  };
  return (
    <div className="flex-container">
      <div className="flex-child">
        {/* <Shapes
          onSave={onSave}
          onRestore={onRestore}
          flow={flow}
          onFileChange={onFileChange}
          onFileUpload={onFileUpload}
        /> */}
        <DesignerPanel
          onSave={onSave}
          onRestore={onRestore}
          flow={flow}
          onFileChange={onFileChange}
          onFileUpload={onFileUpload}
        />
      </div>
      <Box className={classes.designer}>
        <div className="dndflow flex-child">
          <div className="dndflow">
            <ReactFlowProvider>
              <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                  elements={elements}
                  onConnect={onConnect}
                  onElementsRemove={onElementsRemove}
                  onLoad={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onNodeDoubleClick={doubleClickHandler}
                >
                  <Controls />
                  <Background color="#aaa" gap={16} />
                </ReactFlow>
              </div>
            </ReactFlowProvider>
          </div>
        </div>
      </Box>
      {show && (
        <div
          style={{
            position: "absolute",
            display: "grid",
            placeItems: "right"
          }}
        >
          {/* <PanelConfig
            attribute={attribute}
            element={elements[selectedElement]}
            elementIndex={selectedElement}
            globalElements={elements}
          /> */}
          <AttributeController
            attribute={attribute}
            element={elements[selectedElement]}
            elementIndex={selectedElement}
            globalElements={elements}
          />
        </div>
      )}
    </div>
  );
};

export default DnDFlow;
