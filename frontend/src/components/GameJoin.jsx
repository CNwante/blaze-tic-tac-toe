import React, { useState } from 'react';
import axios from 'axios';

const GameJoin = ({ setPlayerO }) => {
  const [gameId, setGameId] = useState('');

  const handleJoinGame = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:3000/api/games/join', { gameId }, config);
      console.log(response.data);
      setPlayerO(response.data.playerO.username); // Assuming response contains updated game data with playerO
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
};

export default GameJoin;
