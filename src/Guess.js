import classNames from "classnames";
import { useRef } from "react";

/** only allow a 0, 1, or 2 digit hex number */
const validateInput = (input) => {
  if (typeof input !== "string") return false;
  if (input === "") return true;
  if (input.length > 2) return false;
  if (!input.toUpperCase().match(/^[0-9a-f]*$/i)) return false;
  const parsed = parseInt(input, 16);
  if (isNaN(parsed)) return false;
  if (parsed > 255) return false;
  return true;
};

const hexDiff = (hex0, hex1) => {
  const dec0 = parseInt(hex0, 16);
  const dec1 = parseInt(hex1, 16);
  return dec0 - dec1;
};

const isClose = (hex0, hex1) => {
  if (hex0 === hex1) return false;
  if (hex0.slice(0) === hex1.slice(0)) return true;
  const diff = Math.abs(hexDiff(hex0, hex1));
  if (diff === 16) return true;
  if (diff < 4) return true;
  return false;
};

export function Guess({
  hex0,
  hex1,
  hex2,
  pre = "#",
  active = true,
  onGuess,
  onClear,
  correctColor
}) {
  const handleClear = () => {
    onClear();
    inputRefs.current[0].focus();
  };
  const handleChange0 = (onChange) => (e) => {
    const value = e.target.value?.toUpperCase();
    if (validateInput(value)) {
      onChange(e);
      if (value.length === 2) {
        inputRefs.current[1].focus();
      }
    }
  };
  const handleChange1 = (onChange) => (e) => {
    const value = e.target.value?.toUpperCase();
    if (validateInput(value)) {
      onChange(e);
      if (value.length === 2) {
        inputRefs.current[2].focus();
      }
      if (value.length === 0) {
        inputRefs.current[0].focus();
      }
    }
  };
  const handleChange2 = (onChange) => (e) => {
    const value = e.target.value?.toUpperCase();
    if (validateInput(value)) {
      onChange(e);
      if (value.length === 0) {
        inputRefs.current[1].focus();
      }
    }
  };
  const handleKeydown0 = (e) => {
    const caretEnd = e.target.selectionEnd;
    const { key } = e;
    if (key === "ArrowRight" && (caretEnd === 0 || caretEnd === 2)) {
      inputRefs.current[1].focus();
    }
  };

  const handleKeydown1 = (e) => {
    const caretEnd = e.target.selectionEnd;
    const { key } = e;
    if (key === "Backspace") {
      console.log(hex1.value);
      if (hex1?.value.length === 0) {
        inputRefs.current[0].focus();
      }
    }
    if (key === "ArrowLeft" && caretEnd === 0) {
      inputRefs.current[0].focus();
    }
    if (key === "ArrowRight" && (caretEnd === 0 || caretEnd === 2)) {
      inputRefs.current[2].focus();
    }
  };
  const handleKeydown2 = (e) => {
    const caretEnd = e.target.selectionEnd;
    const { key } = e;
    if (key === "Enter") {
      if (
        hex0?.value.length === 2 &&
        hex1?.value.length === 2 &&
        hex0?.value.length === 2
      ) {
        onGuess();
      }
    }
    if (key === "Backspace") {
      if (hex2?.value.length === 0) {
        inputRefs.current[1].focus();
      }
    }
    if (key === "ArrowLeft" && caretEnd === 0) {
      inputRefs.current[1].focus();
    }
  };
  const inputRefs = useRef([]);
  return (
    <>
      <div className="inputs">
        {pre}&nbsp;
        {active ? (
          <>
            <input
              {...hex0}
              autoFocus
              className={classNames("hex", "active")}
              onChange={handleChange0(hex0.onChange)}
              onKeyDown={handleKeydown0}
              ref={(e) => (inputRefs.current[0] = e)}
            />
            <input
              {...hex1}
              className={classNames("hex", "active")}
              onChange={handleChange1(hex1.onChange)}
              onKeyDown={handleKeydown1}
              ref={(e) => (inputRefs.current[1] = e)}
            />
            <input
              {...hex2}
              className={classNames("hex", "active")}
              onChange={handleChange2(hex2.onChange)}
              onKeyDown={handleKeydown2}
              ref={(e) => (inputRefs.current[2] = e)}
            />
            <button onClick={onGuess}>guess</button>
            <button
              disabled={!(hex0.value || hex1.value || hex2.value)}
              onClick={handleClear}
            >
              clear
            </button>
          </>
        ) : (
          <>
            <div
              className={classNames(
                "hex",
                "inactive",
                isClose(hex0?.value, correctColor.hex0) && "close",
                hexDiff(hex0?.value, correctColor.hex0) < 0 && "low",
                hexDiff(hex0?.value, correctColor.hex0) > 0 && "high",
                hex0?.value === correctColor.hex0 && "correct"
              )}
            >
              {hex0.value}
            </div>
            <div
              className={classNames(
                "hex",
                "inactive",
                isClose(hex1?.value, correctColor.hex1) && "close",
                hexDiff(hex1?.value, correctColor.hex1) < 0 && "low",
                hexDiff(hex1?.value, correctColor.hex1) > 0 && "high",
                hex1?.value === correctColor.hex1 && "correct"
              )}
            >
              {hex1.value}
            </div>
            <div
              className={classNames(
                "hex",
                "inactive",
                isClose(hex2?.value, correctColor.hex2) && "close",
                hexDiff(hex2?.value, correctColor.hex2) < 0 && "low",
                hexDiff(hex2?.value, correctColor.hex2) > 0 && "high",
                hex2?.value === correctColor.hex2 && "correct"
              )}
            >
              {hex2.value}
            </div>
            <div
              title="you guess"
              className="color-guessed"
              style={{
                backgroundColor: `#${hex0.value}${hex1.value}${hex2.value}`
              }}
            />
            <div
              title="correct color"
              className="color-target"
              style={{
                backgroundColor: correctColor.color
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
