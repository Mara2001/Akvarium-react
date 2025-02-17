import { useState } from "react";

function Tank(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [volume, setVolume] = useState(0);

  return (
    <div>
      <h2 className="text-center">Nádrž</h2>
      <h3>Rozměry nádrže</h3>
      <div className="row">
        <div className="col-3">
          <label htmlFor="name">Šířka:</label>
          <input
            type="number"
            id="width"
            name="width"
            min="0"
            value={width}
            onChange={(e) => {
              const newWidth = Number(e.target.value);
              const newVolume = (newWidth * height * depth) / 1000;
              setWidth(newWidth);
              setVolume(newVolume);
              props.handleSufficientVolume(newVolume);
            }}
          />
          cm
        </div>
        <div className="col-3">
          <label htmlFor="name">Výška:</label>
          <input
            type="number"
            id="height"
            name="height"
            min="0"
            value={height}
            onChange={(e) => {
              const newHeight = Number(e.target.value);
              const newVolume = (width * newHeight * depth) / 1000;
              setHeight(newHeight);
              setVolume(newVolume);
              props.handleSufficientVolume(newVolume);
            }}
          />
          cm
        </div>
        <div className="col-3">
          <label htmlFor="name">Hloubka:</label>
          <input
            type="number"
            id="depth"
            name="depth"
            min="0"
            value={depth}
            onChange={(e) => {
              const newDepth = Number(e.target.value);
              const newVolume = (width * height * newDepth) / 1000;
              setDepth(newDepth);
              setVolume(newVolume);
              props.handleSufficientVolume(newVolume);
            }}
          />
          cm
        </div>
        <div className="row">Objem nádrže je {volume} l</div>
        <div className="row">
          <button
            className={
              props.isVolumeSufficient ? "btn btn-success" : "btn btn-danger"
            }
            disabled={!props.isVolumeSufficient}
            onClick={() => {}}
          >
            Schválit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tank;
