function GameControls({
  onStartHumanVsAI,
  onStartTwoPlayers,
  onSaveGame,
  onLoadGameList,
}) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onStartHumanVsAI}
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Chơi với AI
      </button>
      <button
        onClick={onStartTwoPlayers}
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Chơi với Người
      </button>
      <button
        onClick={onSaveGame}
        className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
      >
        Lưu Trò Chơi
      </button>
      <button
        onClick={onLoadGameList}
        className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Tải Trò Chơi
      </button>
    </div>
  );
}
export default GameControls;
