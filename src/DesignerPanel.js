import React from "react";
import PublishIcon from "@material-ui/icons/Publish";
import RestoreIcon from "@material-ui/icons/Restore";
import "./DesignerPanel.css";
import save from "./assets/save.png";
import play from "./assets/play.png";
import other from "./assets/other.png";
import entry from "./assets/entry.png";
import calculation from "./assets/calculation.png";
import filtre from "./assets/filtre.png";
// import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AttachmentIcon from "@material-ui/icons/Attachment";
function DesignerPanel({
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
  const fileUploadButton = () => {
    document.getElementById("fileButton").click();
    document.getElementById("fileButton").onchange = (e) => {
      console.log("gggggggggggg", e);
      onFileChange(e);
    };
  };
  return (
    <div className="DesignerPanel__Container">
      <div className="DesignerPanel__Menu">
        <img src={play} alt="play" className="DesignerPanel__Menu__img" />
        <img
          src={save}
          onClick={onSave}
          alt="save"
          className="DesignerPanel__Menu__img"
        />
        <img src={other} alt="other" className="DesignerPanel__Menu__img" />
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(flow)
          )}`}
          download="filename.json"
        >
          {`Download Json`}
        </a>

        <Button
          onClick={onFileUpload}
          className="DesignerPanel__Menu__img"
          style={{ backgroundColor: "#fff" }}
          endIcon={<PublishIcon />}
        >
          Upload
        </Button>
        <Button
          onClick={onRestore}
          className="DesignerPanel__Menu__img"
          style={{ backgroundColor: "#fff" }}
          endIcon={<RestoreIcon />}
        >
          Restore
        </Button>
        {/* <Button
          onClick={fileUploadButton}
          className="DesignerPanel__Menu__img"
          style={{ backgroundColor: "#fff" }}
          endIcon={<AttachmentIcon />}
        >
          Chose file
        </Button> */}
        <input
          id="fileButton"
          type="file"
          onChange={onFileChange}
          className="DesignerPanel__Menu__img"
          style={{
            width: "80px"
          }}
        />
      </div>
      <div className="DesignerPanel__Shapes">
        <img
          src={entry}
          alt="entry"
          className="DesignerPanel__Menu__img"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        />
        <img
          src={calculation}
          alt="calculation"
          className="DesignerPanel__Menu__img"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        />
        <img
          src={filtre}
          alt="filtre"
          className="DesignerPanel__Menu__img"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        />
      </div>
    </div>
  );
}

export default DesignerPanel;
