import { useState, useEffect } from "react";
import "./App.css";
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

  const [fishState, setFishState] = useState({
    x: 100,
    y: 100,
    isFlipped: false,
    dx: 2, // směr x
    dy: 1, // směr y
  });

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

  useEffect(() => {
    // PLYNULÝ POHYB každých 50 ms
    const moveInterval = setInterval(() => {
      setFishState((prev) => {
        let newX = prev.x + prev.dx;
        let newY = prev.y + prev.dy;

        // Odrážení od stěn
        let newDx = prev.dx;
        let newDy = prev.dy;

        if (newX <= 0 || newX >= 400) {
          newDx = -prev.dx;
        }
        if (newY <= 0 || newY >= 400) {
          newDy = -prev.dy;
        }

        // Otočení ryby podle směru
        const isFlipped = newDx < 0;

        return {
          ...prev,
          x: Math.max(0, Math.min(newX, 400)),
          y: Math.max(0, Math.min(newY, 400)),
          dx: newDx,
          dy: newDy,
          isFlipped,
        };
      });
    }, 50);

    // ZMĚNA SMĚRU KAŽDÝCH 1-10 SEKUND
    const directionChange = () => {
      setFishState((prev) => {
        const newDx = Math.random() * 4 - 2; // -2 až +2
        const newDy = Math.random() * 4 - 2;

        return {
          ...prev,
          dx: newDx,
          dy: newDy,
          isFlipped: newDx < 0,
        };
      });

      setTimeout(directionChange, Math.random() * 9000 + 1000);
    };
    const directionTimeout = setTimeout(
      directionChange,
      Math.random() * 9000 + 1000
    );

    return () => {
      clearInterval(moveInterval);
      clearTimeout(directionTimeout);
    };
  }, []);

  return (
    <div className="container">
      <div
        className="fish"
        style={{
          left: `${fishState.x}px`,
          top: `${fishState.y}px`,
          transform: fishState.isFlipped ? "scaleX(-1)" : "scaleX(1)",
        }}
      ></div>

      <h1 className="display-4 text-center">Akvarium</h1>
      <div className="row">
        <div className="col-md-6 col-12 p-5">
          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-outline-info"
              onClick={() => setIsFishesVisible(!isFishesVisible)}
            >
              {isFishesVisible ? "Skryj" : "Zobraz"} Rybičky
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
              {isTankVisible ? "Skryj" : "Zobraz"} Nádrž
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
