import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      string += "0123456789";
    }

    if (characterAllowed) {
      string += "(){}[]-+=_#`@$%!&~*";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      generatedPassword += string.charAt(char);
    }
    setPassword(generatedPassword);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyToClipBoardButton = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 2);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600">
        <h1 className="text-2xl text-center text-green-500 font-semibold my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1  px-3"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipBoardButton}
            className="outline-none bg-orange-500 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={1}
              max={18}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-orange-400 font-semibold">
              Length : {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="numberInput"
              className="text-orange-400 font-semibold"
            >
              Number
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="characterInput"
              className="text-orange-400 font-semibold"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
