function HeapDisplay({ heaps }) {
  return (
    <div className="mb-6">
      {heaps.map((heap, index) => (
        <div
          key={index}
          className="inline-block mr-4 mb-2 bg-gray-200 p-3 rounded-lg text-lg"
        >
          Đống {index + 1}: {heap} đá
        </div>
      ))}
    </div>
  );
}
export default HeapDisplay;
