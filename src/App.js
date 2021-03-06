import "./styles.css";
import { getAccessibleColor, randomColor } from "./randomColor";
import { Guess } from "./Guess";
import Helmet from "react-helmet";
import { Help } from "./Help";
import { QuestionCircleIcon } from "./Icons";
import { useState } from "react";

// you're given a color, and you have to guess the hex notation.
// for each guess, the three color values are broken up and you
// get a higher/lower indicator for each.

const color = randomColor();
const targetColor = color.color;

export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const toggleHelp = () => setShowHelp((h) => !h);
  const [solved, setSolved] = useState(false);
  const [guesses, setGuesses] = useState([
    // { hex0: "aa", hex1: "ee", hex2: "bc" }
  ]);
  const [currentHex0, setCurrentHex0] = useState("");
  const [currentHex1, setCurrentHex1] = useState("");
  const [currentHex2, setCurrentHex2] = useState("");

  const resetCurrentGuess = () => {
    setCurrentHex0("");
    setCurrentHex1("");
    setCurrentHex2("");
  };

  function handleGuessInput(setter) {
    return (e) => {
      const value = e.target.value?.toUpperCase();
      setter(value);
    };
  }
  const handleGuess = () => {
    setGuesses((g) => [
      ...g,
      { hex0: currentHex0.toUpperCase(), hex1: currentHex1.toUpperCase(), hex2: currentHex2.toUpperCase() }
    ]);
    if (
      currentHex0.toUpperCase() === color.hex0.toUpperCase() &&
      currentHex1.toUpperCase() === color.hex1.toUpperCase() &&
      currentHex2.toUpperCase() === color.hex2.toUpperCase()
    ) {
      setSolved(true);
    }
    resetCurrentGuess();
  };

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={targetColor} />
      </Helmet>
      {showHelp && <Help toggle={toggleHelp} />}
      <div id="color" style={{ backgroundColor: targetColor }}>
        <div
          style={{ color: getAccessibleColor(targetColor) }}
          id="header-content"
        >
          <h1>HEXLE</h1>
          <h2>Guess this hex color</h2>
        </div>
        <button
          onClick={toggleHelp}
          className="icon-button"
          id="help-button"
          title="help"
        >
          <QuestionCircleIcon />
        </button>
      </div>
      {guesses.map((g, i) => (
        <Guess
          key={`${g.hex0}${g.hex1}${g.hex2}-${i}`}
          pre={`${i.toString().padStart(2, " ")}: #`}
          correctColor={color}
          active={false}
          hex0={{
            value: g.hex0
          }}
          hex1={{
            value: g.hex1
          }}
          hex2={{
            value: g.hex2
          }}
        />
      ))}
      {solved ? (
        <div id="solved">
          You solved the puzzle in {guesses.length}{" "}
          {guesses.length === 1 ? "try" : "tries"}!
        </div>
      ) : (
        <Guess
          pre={`${guesses.length.toString().padStart(2, " ")}: #`}
          key={`guess-${guesses.length}`}
          onClear={resetCurrentGuess}
          onGuess={handleGuess}
          hex0={{
            value: currentHex0,
            onChange: handleGuessInput(setCurrentHex0)
          }}
          hex1={{
            value: currentHex1,
            onChange: handleGuessInput(setCurrentHex1)
          }}
          hex2={{
            value: currentHex2,
            onChange: handleGuessInput(setCurrentHex2)
          }}
        />
      )}
    </>
  );
}
