import { useState } from "react";
import Fishes from "./components/Fishes";
import Tank from "./components/Tank";

function App() {
  const [fishes, setFishes] = useState([
    { id: 1, name: "Neonka", isLarge: false },
    { id: 2, name: "Čichavec", isLarge: true },
  ]);
  const [isVolumeSufficient, setIsVolumeSufficient] = useState(false);
  const [isFishesVisible, setIsFishesVisible] = useState(false);
  const [isTankVisible, setIsTankVisible] = useState(false);

  const handleAddFish = (fish) => {
    // alert(fish.name + " " + fish.isLarge);
    setFishes([...fishes, fish]);
  };
  const handleRemoveFish = (fishId) => {
    setFishes(fishes.filter((item) => item.id !== fishId));
  };

  const handleSufficientVolume = (volume) => {
    const requiredVolume = fishes.reduce(
      (accumulator, current) => accumulator + (current.isLarge ? 20 : 10),
      0
    );
    if (requiredVolume > volume) {
      setIsVolumeSufficient(false);
    } else {
      setIsVolumeSufficient(true);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Akvarium</h1>
      <div className="row">
        <div className="col-md-6 col-12 p-5">
          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-outline-info"
              onClick={() => setIsFishesVisible(!isFishesVisible)}
            >
              Zobraz/skryj Rybičky
            </button>
          </div>
          <div className={isFishesVisible ? "d-block" : "d-none"}>
            <Fishes
              fishes={fishes}
              handleAddFish={handleAddFish}
              handleRemoveFish={handleRemoveFish}
            />
          </div>
        </div>
        <div className="col-md-6 col-12 p-5">
          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-outline-info"
              onClick={() => setIsTankVisible(!isTankVisible)}
            >
              Zobraz/skryj Nádrž
            </button>
          </div>
          <div className={isTankVisible ? "d-block" : "d-none"}>
            <Tank
              handleSufficientVolume={handleSufficientVolume}
              isVolumeSufficient={isVolumeSufficient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
