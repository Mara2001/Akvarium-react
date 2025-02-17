import { useState } from "react";

function Tank(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [volume, setVolume] = useState(0);

  return (
    <div className="border rounded p-3 bg-light-blue component-container">
      <h2 className="text-center display-5">Nádrž</h2>
      <h3 className="display-6">Rozměry nádrže</h3>
      <div className="row">
        <div className="col-4">
          <label htmlFor="name" className="form-label">
            Šířka:
          </label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              id="width"
              min="0"
              value={width}
              onChange={(e) => {
                const newWidth = Number(e.target.value);
                const newVolume = (newWidth * height * depth) / 1000;
                setWidth(newWidth);
                setVolume(newVolume);
                props.handleSufficientVolume(newVolume);
              }}
              className="form-control"
            />
            <span>cm</span>
          </div>
        </div>
        <div className="col-4">
          <label htmlFor="name" className="form-label">
            Výška:
          </label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              id="height"
              min="0"
              value={height}
              onChange={(e) => {
                const newHeight = Number(e.target.value);
                const newVolume = (width * newHeight * depth) / 1000;
                setHeight(newHeight);
                setVolume(newVolume);
                props.handleSufficientVolume(newVolume);
              }}
              className="form-control"
            />
            <span>cm</span>
          </div>
        </div>
        <div className="col-4 ">
          <label htmlFor="name" className="form-label">
            Hloubka:
          </label>
          <div className="d-flex  align-items-center">
            <input
              type="number"
              id="depth"
              min="0"
              value={depth}
              onChange={(e) => {
                const newDepth = Number(e.target.value);
                const newVolume = (width * height * newDepth) / 1000;
                setDepth(newDepth);
                setVolume(newVolume);
                props.handleSufficientVolume(newVolume);
              }}
              className="form-control"
            />
            <span>cm</span>
          </div>
        </div>
        <div className="d-flex justify-content-center m-1">
          Objem nádrže je {volume} l
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button
              className={
                props.isVolumeSufficient
                  ? "btn btn-outline-success"
                  : "btn btn-outline-danger"
              }
              disabled={!props.isVolumeSufficient}
              onClick={() => {
                alert("Objem nádrže je pro rybičky dostatečný");
              }}
            >
              Schválit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tank;
