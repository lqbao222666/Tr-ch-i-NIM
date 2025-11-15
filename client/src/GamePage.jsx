import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "./services/apiService";
import GameHeader from "./components/GameHeader";
import HeapDisplay from "./components/HeapDisplay";
import GameStatus from "./components/GameStatus";
import MoveSelector from "./components/MoveSelector";
import GameControls from "./components/GameControls";

function GamePage() {
  const { id } = useParams(); // Lấy ID từ URL (nếu có)
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [showStartScreen, setShowStartScreen] = useState(!id); // Chỉ hiển thị trang bắt đầu nếu không có ID

  useEffect(() => {
    if (id) {
      fetchGame(id); // Tải game nếu có ID
    }
  }, [id]);

  const fetchGame = async (gameId) => {
    try {
      const data = await apiService.fetchGame(gameId);
      setGame(data);
      setShowStartScreen(false);
      setError(null);
    } catch (error) {
      setError("Lỗi khi tải trò chơi: " + error.message);
    }
  };

  const startNewGame = async (mode) => {
    try {
      const data = await apiService.startNewGame(mode);
      setGame(data);
      navigate(`/${data.id}`); // Chuyển hướng đến /${id} của game mới
      setShowStartScreen(false);
      setError(null);
    } catch (error) {
      setError("Lỗi khi bắt đầu trò chơi mới: " + error.message);
    }
  };

  const startHumanVsAI = () => startNewGame("human_vs_ai");
  const startTwoPlayers = () => startNewGame("two_players");

  const loadGame = async (gameId) => {
    try {
      const data = await apiService.fetchGame(gameId);
      setGame(data);
      navigate(`/${gameId}`); // Chuyển hướng đến /${id} của game tải
      setShowStartScreen(false);
      setError(null);
    } catch (error) {
      setError("Lỗi khi tải trò chơi: " + error.message);
    }
  };

  const saveGame = async () => {
    if (!game) return;
    try {
      const message = await apiService.saveGame(game);
      setError(message);
    } catch (error) {
      setError("Lỗi khi lưu trò chơi: " + error.message);
    }
  };

  const handleMove = async (move) => {
    if (!game) return;
    try {
      const data = await apiService.makeMove(game.id, move);
      setGame(data);
      setError(null);
    } catch (error) {
      setError("Lỗi khi thực hiện nước đi: " + error.message);
    }
  };

  // Trang bắt đầu (chỉ hiển thị khi /)
  if (showStartScreen) {
    return (
      <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg text-center">
        <GameHeader error={error} />
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Chọn chế độ chơi</h2>
          <button
            onClick={startHumanVsAI}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
          >
            Bắt đầu với AI
          </button>
          <button
            onClick={startTwoPlayers}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
          >
            Chơi với Người
          </button>
          <button
            onClick={async () => {
              const games = await apiService.loadGameList();
              if (games.length > 0) {
                const gameId = prompt(
                  "Nhập ID trò chơi để tải (1-" + games.length + "):",
                  "1"
                );
                if (gameId) loadGame(parseInt(gameId));
              } else {
                setError("Không có trò chơi nào để tải.");
              }
            }}
            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Tải Trò Chơi Cũ
          </button>
        </div>
      </div>
    );
  }

  // Giao diện chơi (hiển thị khi có ID)
  return (
    <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
      <GameHeader error={error} />
      {game && (
        <>
          <HeapDisplay heaps={game.heaps} />
          <GameStatus game={game} />
          <MoveSelector game={game} onMove={handleMove} />
        </>
      )}
      <GameControls
        onStartHumanVsAI={startHumanVsAI}
        onStartTwoPlayers={startTwoPlayers}
        onSaveGame={saveGame}
        onLoadGameList={async () => {
          const games = await apiService.loadGameList();
          if (games.length > 0) {
            const gameId = prompt(
              "Nhập ID trò chơi để tải (1-" + games.length + "):",
              "1"
            );
            if (gameId) loadGame(parseInt(gameId));
          } else {
            setError("Không có trò chơi nào để tải.");
          }
        }}
      />
    </div>
  );
}

export default GamePage;
