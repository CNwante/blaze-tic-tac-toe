import { useState, useEffect } from 'react';
import axios from 'axios';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoad';
import GamePlayer from '../components/GamePlayer';
import RestartGameButton from '../components/RestartGameButton';
import GameJoin from '../components/GameJoin';

const initialBoard = Array(9).fill(null);

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [gameId, setGameId] = useState(''); // State for Game ID

  useEffect(() => {
    // Fetch user data or game data based on user role
    const fetchGameData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assume token is stored in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3000/api/users/profile', config);
        const { username } = response.data;
        setPlayerX(username); // Assume the user starting the game is Player X

        // Optionally, you can also create a game here if it's playerX
        const gameResponse = await axios.post('http://localhost:3000/api/games/create', {}, config);
        setGameId(gameResponse.data.gameId); // Set game ID to share with Player O
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGameData();
  }, []);

  const handleRestart = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#1b1b32] text-[#0074fc]">
      <GameHeader />
      <div className="flex justify-center items-center flex-1 w-full">
        <div className="flex justify-around items-center w-full max-w-[900px]">
          {/* Player 1 */}
          <GamePlayer playerName={playerX || 'Player X'} playerMark="X" />

          {/* Game Board */}
          <GameBoard
            board={board}
            setBoard={setBoard}
            isXNext={isXNext}
            setIsXNext={setIsXNext}
            winner={winner}
            setWinner={setWinner}
          />

          {/* Player 2 */}
          <GamePlayer playerName={playerO || 'Player O'} playerMark="O" />
        </div>
      </div>

      {/* If Player O hasn't joined, show the join component */}
      {!playerO && <GameJoin setPlayerO={setPlayerO} />}

      <RestartGameButton handleRestart={handleRestart} />
    </div>
  );
};

export default Game;
