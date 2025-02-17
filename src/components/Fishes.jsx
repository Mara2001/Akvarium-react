import { useState } from "react";

function Fishes(props) {
  const [fish, setFish] = useState({ id: 0, name: "", isLarge: false });

  return (
    <div>
      <h2 className="text-center">Rybičky</h2>
      <h3>Přidej rybičku</h3>

      <div className="row">
        <div className="col-5">
          <label htmlFor="name">Jméno:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={fish.name}
            onChange={(e) => setFish({ ...fish, name: e.target.value })}
          />
        </div>

        <div className="col-5">
          <div className="row">
            <label htmlFor="small">
              <input
                type="radio"
                id="small"
                name="type"
                onChange={() => setFish({ ...fish, isLarge: false })}
              />
              malá
            </label>
          </div>
          <div className="row">
            <label htmlFor="large">
              <input
                type="radio"
                id="large"
                name="type"
                onChange={() => setFish({ ...fish, isLarge: true })}
              />
              velká
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <button
          className="btn btn-success"
          onClick={() => {
            const newFish = {
              ...fish,
              id:
                props.fishes.length > 0
                  ? Math.max(...props.fishes.map((item) => item.id)) + 1
                  : 1,
            };
            props.handleAddFish(newFish);
            setFish({ name: "", isLarge: false });
          }}
        >
          Přidej
        </button>
      </div>

      <h3>Seznam rybiček</h3>
      <ul>
        {props.fishes.map((item, index) => {
          return (
            <li key={index}>
              {item.name} ({item.isLarge ? "velká" : "malá"}){" "}
              <button
                className="btn btn-outline-danger"
                onClick={() => props.handleRemoveFish(item.id)}
              >
                smaž
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Fishes;
