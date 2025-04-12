import React, { useEffect, useState } from 'react';
import './App.css';

const cardImages = [
  { src: '🍕', matched: false },
  { src: '🚀', matched: false },
  { src: '🎧', matched: false },
  { src: '🐱', matched: false },
  { src: '🧠', matched: false },
  { src: '🎮', matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setGameOver(false);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prev =>
          prev.map(card =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  return (
    <div className="App">
      <h1>🧠 Memory Match: Test your Memory</h1>
      <button onClick={shuffleCards}>🔁 New Game</button>
      {gameOver ? (
        <h2 className="game-over">🎉 You matched all cards in {turns} turns!</h2>
      ) : (
        <p>Turns: {turns}</p>
      )}

      <div className="card-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card === choiceOne || card === choiceTwo || card.matched ? 'flipped' : ''}`}
            onClick={() => handleChoice(card)}
          >
            <div className="front">{card.src}</div>
            <div className="back">❓</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
