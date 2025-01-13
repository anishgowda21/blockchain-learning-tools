import Blockchain from "./Blockchain";

const Distributed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-br from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Distributed Blockchain
        </h1>
      </div>
      <div className="space-y-12">
        <Blockchain name="Peer A" />
        <Blockchain name="Peer B" />
        <Blockchain name="Peer C" />
      </div>
    </div>
  );
};
export default Distributed;
