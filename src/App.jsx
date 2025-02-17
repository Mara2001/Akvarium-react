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

  const [fishStates, setFishStates] = useState([]);

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

  // Když se změní počet rybiček, zresetuj stavy
  useEffect(() => {
    // Inicializace rybiček podle `fishes`
    const initialFishStates = fishes.map((fish) => ({
      id: fish.id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 - 2,
      isFlipped: false,
      isLarge: fish.isLarge,
    }));

    setFishStates(initialFishStates);
  }, [fishes]);

  // Animace rybiček
  useEffect(() => {
    const intervals = [];
    const timeouts = [];

    fishStates.forEach((fish, index) => {
      const moveInterval = setInterval(() => {
        setFishStates((prev) =>
          prev.map((f) => {
            if (f.id !== fish.id) return f;

            let newX = f.x + f.dx;
            let newY = f.y + f.dy;

            let newDx = f.dx;
            let newDy = f.dy;

            if (
              newX <= 0 ||
              newX >= window.innerWidth - (f.isLarge ? 100 : 60)
            ) {
              newDx = -f.dx;
            }
            if (
              newY <= 0 ||
              newY >= window.innerHeight - (f.isLarge ? 100 : 60)
            ) {
              newDy = -f.dy;
            }

            const isFlipped = newDx < 0;

            return { ...f, x: newX, y: newY, dx: newDx, dy: newDy, isFlipped };
          })
        );
      }, 50);

      intervals.push(moveInterval);

      const changeDirection = () => {
        setFishStates((prev) =>
          prev.map((f) => {
            if (f.id !== fish.id) return f;

            const newDx = Math.random() * 4 - 2;
            const newDy = Math.random() * 4 - 2;

            const isFlipped = newDx < 0;

            return { ...f, dx: newDx, dy: newDy, isFlipped };
          })
        );

        timeouts[index] = setTimeout(
          changeDirection,
          Math.random() * 9000 + 1000
        );
      };

      timeouts[index] = setTimeout(
        changeDirection,
        Math.random() * 9000 + 1000
      );
    });

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [fishStates]);

  return (
    <div className="container">
      {fishStates.map((fish) => (
        <div
          key={fish.id}
          className="fish"
          style={{
            left: `${fish.x}px`,
            top: `${fish.y}px`,
            transform: fish.isFlipped ? "scaleX(-1)" : "scaleX(1)",
            width: fish.isLarge ? "100px" : "60px",
            height: fish.isLarge ? "100px" : "60px",
          }}
        ></div>
      ))}

      <h1 className="display-4 text-center">Akvárium</h1>
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
