function GameStatus({ game }) {
  const turnDisplay =
    game.current_turn === "ai"
      ? "AI"
      : game.current_turn.replace("player", "Player ");
  return (
    <div className="mb-6 text-center text-gray-700">
      Lượt: {turnDisplay} | Trạng thái: {game.status} | Người thắng:{" "}
      {game.winner || "Chưa có"}
    </div>
  );
}
export default GameStatus;
