function GameHeader({ error }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Trò Chơi NIM
      </h1>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
    </>
  );
}
export default GameHeader;
