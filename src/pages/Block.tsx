import { ArrowRight, Cpu, Database, Hash } from "lucide-react";
import { useEffect, useState } from "react";

const Block = () => {
  const blockNumber = 1;
  const [nonce, setNonce] = useState<number>(0);
  const [data, setData] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [mining, setMining] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initializeMining = async () => {
      setIsInitializing(true);
      await mineNonce();
      setIsInitializing(false);
    };

    initializeMining();
  }, []);

  useEffect(() => {
    const calculateHash = async () => {
      console.log("Somethinf changed");

      const message = `${blockNumber}${nonce}${data}`;
      const hash = await digestMessage(message);
      setHash(hash);
      setIsValid(checkValidHash(hash));
      console.log("Is valid", checkValidHash(hash));
    };

    calculateHash();
  }, [nonce, data]);

  const checkValidHash = (hash: string) => {
    return hash.startsWith("0000");
  };

  const digestMessage = async (message: string): Promise<string> => {
    const uint8Msg = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", uint8Msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hexString = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hexString;
  };

  const handleNounceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setNonce(0);
      return;
    }

    const value = parseInt(e.target.value);

    if (isNaN(value) || !Number.isInteger(value)) {
      return;
    }

    setNonce(value);
  };

  const mineNonce = async () => {
    let possibleNonce = 0;

    while (true) {
      let message = `${blockNumber}${possibleNonce}${data}`;
      let hash = await digestMessage(message);
      if (checkValidHash(hash)) {
        setNonce(possibleNonce);
        setHash(hash);
        break;
      }
      possibleNonce++;
    }
  };

  const handleMineClick = async () => {
    setMining(true);
    await mineNonce();
    setMining(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-br from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Block
        </h1>
      </div>

      <div
        className={`bg-grey-800 p-8 m-5 rounded-md shadow-2xl ${
          isValid ? "ring-2 ring-green-500" : "ring-2 ring-red-500"
        }`}
      >
        {isInitializing ? (
          <div className="flex justify-center gap-3">
            <div className="w-10 h-10 border-2 border-gray border-t-transparent rounded-full animate-spin" />
            <h1 className="text-gray-500 text-4xl">Initializing</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1  gap-8">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <Database size={20} /> Block Number
                </label>
                <div className="bg-gray-700 p-3 rounded-lg font-mono">
                  {blockNumber}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <Cpu size={20} /> Nonce
                </label>
                <input
                  className="w-full
               bg-gray-700 rounded-lg p-3 font-mono 
               focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={nonce}
                  onChange={handleNounceChange}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <ArrowRight size={20} /> Data
                </label>
                <textarea
                  rows={3}
                  className="w-full 
               bg-gray-700 rounded-lg p-3 font-mono 
               focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Enter block data..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <Hash size={20} /> Generated Hash
                </label>
                <div className="bg-gray-700 p-3 rounded-lg font-mono break-all">
                  <span className={isValid ? "text-green-500" : "text-red-500"}>
                    {hash.slice(0, 4)}
                  </span>
                  <span className="text-gray-400">{hash.slice(4)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isValid ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>{" "}
                  <span className="text-sm text-gray-400">
                    {isValid ? "Valid Hash" : "Invalid Hash"}
                  </span>
                </div>

                <button
                  disabled={mining}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    mining
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                  }`}
                  onClick={handleMineClick}
                >
                  {mining ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mining...
                    </div>
                  ) : (
                    "Start Mining"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Block;
