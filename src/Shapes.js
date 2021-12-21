import React from "react";

export default function Shapes({
  onSave,
  onRestore,
  flow,
  onFileChange,
  onFileUpload
}) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  // console.log("flow", flow);

  return (
    <aside>
      <div className="dndflowShapes">
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Default Node
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        >
          Output Node
        </div>
        <div>
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(flow)
            )}`}
            download="filename.json"
          >
            {`Download Json`}
          </a>
          <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload!</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
