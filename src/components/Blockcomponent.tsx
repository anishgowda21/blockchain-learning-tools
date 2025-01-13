import { ArrowRight, Cpu, Database, Hash, StepBack } from "lucide-react";

interface BlockcomponentProps {
  idx: number;
  isValid: boolean[];
  blockNumber: number[];
  nonce: number[];
  data: string[];
  previousHash: string[];
  hash: string[];
  mining: boolean[];
  progress: number[];
  miningRef: React.MutableRefObject<boolean>;
  handleNounceChange: (
    idx: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDataChange: (
    idx: number
  ) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleMineNounce: (idx: number) => () => void;
}

const Blockcomponent = ({
  idx,
  isValid,
  blockNumber,
  nonce,
  data,
  previousHash,
  hash,
  mining,
  progress,
  miningRef,
  handleNounceChange,
  handleDataChange,
  handleMineNounce,
}: BlockcomponentProps) => {
  return (
    <div
      key={idx}
      className={`min-w-[600px] gird grid-cols-1 gap-3 bg-grey-800 p-4 m-5 rounded-md shadow-2xl
                  ${
                    isValid[idx]
                      ? "ring-2 ring-green-500"
                      : "ring-2 ring-red-500"
                  }
              `}
    >
      <div className="space-y-3">
        <div>
          <label className="flex items-center gap-2 text-gray-400 mb-2">
            <Database size={20} /> Block Number
          </label>
          <div className="bg-gray-700 p-3 rounded-lg font-mono">
            {blockNumber[idx]}
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
            value={nonce[idx]}
            onChange={handleNounceChange(idx)}
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
            value={data[idx]}
            onChange={handleDataChange(idx)}
            placeholder="Enter block data..."
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-400 mb-2">
            <StepBack size={20} /> Previos Hash
          </label>
          <div className="bg-gray-700 p-3 rounded-lg font-mono break-all">
            <span className="text-gray-400">{previousHash[idx]}</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-400 mb-2">
            <Hash size={20} /> Generated Hash
          </label>
          <div className="bg-gray-700 p-3 rounded-lg font-mono break-all">
            <span className={isValid[idx] ? "text-green-500" : "text-red-500"}>
              {hash[idx].slice(0, 4)}
            </span>
            <span className="text-gray-400">{hash[idx].slice(4)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isValid[idx] ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>{" "}
            <span className="text-sm text-gray-400">
              {isValid[idx] ? "Valid Block" : "Invalid Block"}
            </span>
          </div>
        </div>

        <div className="h-4">
          {mining[idx] && (
            <div className="flex items-center gap-2">
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress[idx]}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 min-w-[40px]">
                {progress[idx]}%
              </span>
            </div>
          )}
        </div>

        <div>
          <button
            disabled={miningRef.current}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mining[idx]
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            }`}
            onClick={handleMineNounce(idx)}
          >
            {mining[idx] ? (
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
  );
};
export default Blockcomponent;
