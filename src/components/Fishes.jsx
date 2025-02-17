import { useState } from "react";

function Fishes(props) {
  const [fish, setFish] = useState({ id: 0, name: "", isLarge: false });

  return (
    <div className="border rounded p-3 bg-light-blue component-container">
      <h2 className="text-center display-5">Rybičky</h2>
      <h3 className="display-6">Přidej rybičku</h3>
      <div className="row">
        <div className="col-6">
          <label htmlFor="name" className="form-label">
            Jméno:
          </label>
          <input
            type="text"
            id="name"
            value={fish.name}
            onChange={(e) => setFish({ ...fish, name: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-6">
          <div className="row">
            <label htmlFor="" className="form-label">
              Typ rybičky:
            </label>
          </div>
          <div className="row ms-1">
            <div className="form-check col-6">
              <input
                type="radio"
                id="small"
                name="type"
                onChange={() => setFish({ ...fish, isLarge: false })}
                className="form-check-input"
                checked={fish.isLarge === false}
              />
              <label htmlFor="small" className="form-check-label">
                malá
              </label>
            </div>
            <div className="form-check col-6">
              <input
                type="radio"
                id="large"
                name="type"
                onChange={() => setFish({ ...fish, isLarge: true })}
                className="form-check-input"
                checked={fish.isLarge === true}
              />
              <label htmlFor="large" className="form-check-label">
                velká
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button
            className="btn btn-outline-primary m-1"
            onClick={() => {
              if (fish.name === "") {
                return;
              } else {
                const newFish = {
                  ...fish,
                  id:
                    props.fishes.length > 0
                      ? Math.max(...props.fishes.map((item) => item.id)) + 1
                      : 1,
                };
                props.handleAddFish(newFish);
                setFish({ name: "", isLarge: false });
              }
            }}
          >
            Přidej
          </button>
        </div>
      </div>

      <h3 className="display-6">Seznam rybiček</h3>
      <ul className="list-group">
        {props.fishes.map((item, index) => {
          return (
            <li className="list-group-item" key={index}>
              <div className="row">
                <div className="col-9 d-flex align-items-center">
                  {item.name} ({item.isLarge ? "velká" : "malá"}){" "}
                </div>
                <div className="col-3 d-flex align-items-center justify-content-end">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => props.handleRemoveFish(item.id)}
                  >
                    smaž
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Fishes;
