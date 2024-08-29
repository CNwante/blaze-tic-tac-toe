import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DecorativeElements from '../components/DecorativeElements';
import SettingButton from '../components/SettingButton';

const CreateGame = ({ username }) => {
  const [gameMode, setGameMode] = useState('PvC');
  const [gridSize, setGridSize] = useState(3);
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/games/create');

      // Log the response for debugging
      console.log(response.data);

      setGameData(response.data);
      setError('');
      navigate(`/game/${response.data.gameId}`); // Redirect to the game board using the gameId from the response
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating game');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1b1b32] relative overflow-hidden">
      <div className="text-center">
        <h1 className="text-[#0074fc] text-[48px] font-bold">tic-tac-toe.</h1>
        <div className="bg-[#2a2a4a] p-8 mt-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <p className="text-gray-300 font-semibold mb-2">Game mode:</p>
            <div className="space-x-4">
              <SettingButton
                label="PvC"
                handleClick={() => setGameMode('PvC')}
                isSelected={gameMode === 'PvC'}
              />
              <SettingButton
                label="PvP"
                handleClick={() => setGameMode('PvP')}
                isSelected={gameMode === 'PvP'}
              />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-300 font-semibold mb-2">Grid size:</p>
            <div className="space-x-4">
              {[3, 4, 5].map((size) => (
                <SettingButton
                  key={size}
                  label={size}
                  handleClick={() => setGridSize(size)}
                  isSelected={gridSize === size}
                />
              ))}
            </div>
          </div>
          {/* Other settings and options here */}
        </div>

        <button
          className="bg-[#0074fc] hover:bg-[#0051ad] text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 mt-6"
          onClick={handleCreateGame}
        >
          Let the game begin!
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <DecorativeElements />
    </div>
  );
};

export default CreateGame;
