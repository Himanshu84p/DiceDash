import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDie());
  const [tenzies, setTenzies] = React.useState(false);
  const [wincount, setWincount] = React.useState(0);
  const [gameover, setGameover] = React.useState(false);

  React.useEffect(() => {
    const heldWin = dice.every((die) => die.isHeld === true);
    const valueWin = dice.every((die) => die.value === dice[0].value);

    if (heldWin && valueWin) {
      setTenzies(true);
    } 
    if (heldWin && !valueWin) {
      setGameover(true);
    }
  }, [dice]);

  function generateNewDie() {
    let randomNum = Math.ceil(Math.random() * 6);
    return {
      value: randomNum,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDie() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  function changeDie() {
    if (!tenzies && !gameover) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setDice(allNewDie());
      setTenzies(false);
      setGameover(false);
      setWincount(0);
    }
    setWincount(oldCount => oldCount + 1);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const dieElements = dice.map((dice) => {
    return (
      <Die
        value={dice.value}
        key={dice.id}
        isHeld={dice.isHeld}
        holdDice={() => holdDice(dice.id)}
      />
    );
  });

  return (
    <main className="main">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die_container">{dieElements}</div>
      <button className="roll-btn" onClick={changeDie}>
        {tenzies || gameover ? "New Game" : "Roll"}
      </button>

      {tenzies && <h2 className="win_count">You have completed game in {wincount} Roll</h2> } 
      {gameover && <h2 className="gameover">Oops Game over please restart the game</h2> } 
    </main>
  );
}

export default App;
