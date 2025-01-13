import { useEffect, useRef, useState } from "react";
import Blockcomponent from "../components/Blockcomponent";
import Initializing from "../components/Initializing";

const Blockchain = ({ name }: { name: string }) => {
  const blockNumber = [1, 2, 3, 4];
  const [nonce, setNonce] = useState<number[]>(Array(4).fill(0));
  const [data, setData] = useState<string[]>(Array(4).fill(""));
  const [previousHash, setPreviousHash] = useState<string[]>([
    "0".repeat(64),
    ...Array(3).fill(""),
  ]);
  const [hash, setHash] = useState<string[]>(Array(4).fill(""));
  const [mining, setMining] = useState<boolean[]>(Array(4).fill(false));
  const miningRef = useRef<boolean>(false);
  const [isValid, setIsValid] = useState<boolean[]>(Array(4).fill(false));
  const [progress, setProgress] = useState<number[]>(Array(4).fill(0));
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initializeMining = async () => {
      setIsInitializing(true);
      const promises = blockNumber.map(async (_, idx) => await mineNonce(idx));
      await Promise.all(promises);
      setIsInitializing(false);
    };

    initializeMining();
  }, []);

  useEffect(() => {
    const calculateHash = async () => {
      const promises = blockNumber.map(async (_, idx) => {
        const message = `${blockNumber[idx]}${nonce[idx]}${data[idx]}${previousHash[idx]}`;
        return await digestMessage(message);
      });

      const newHashes = await Promise.all(promises);

      setHash(newHashes);

      setIsValid((prev) => {
        const newValids = [...prev];
        blockNumber.forEach((_, idx) => {
          newValids[idx] = checkValidHash(hash[idx]);
        });
        return newValids;
      });

      setPreviousHash((prev) => {
        const newPrevHash = [...prev];
        for (let i = 1; i < blockNumber.length; i++) {
          newPrevHash[i] = newHashes[i - 1];
        }
        return newPrevHash;
      });
    };

    calculateHash();
  }, [nonce, data, previousHash]);

  const digestMessage = async (message: string): Promise<string> => {
    const uint8Msg = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", uint8Msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hexString = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hexString;
  };

  const checkValidHash = (hashString: string) => {
    return hashString.startsWith("0000");
  };

  const mineNonce = async (idx: number) => {
    let possibleNonce = 0;

    while (true) {
      if (possibleNonce % 100 === 0) {
        setProgress((prev) => {
          const newProg = [...prev];
          newProg[idx] = Math.min(99, Math.floor(possibleNonce / 1000));
          return newProg;
        });
      }

      let message = `${blockNumber[idx]}${possibleNonce}${data[idx]}${previousHash[idx]}`;
      let minedHash = await digestMessage(message);
      if (checkValidHash(minedHash)) {
        console.log("go valid nounce", possibleNonce);

        setNonce((prev) => {
          const newNonce = [...prev];
          newNonce[idx] = possibleNonce;
          return newNonce;
        });

        setHash((prevHash) => {
          const newHash = [...prevHash];
          newHash[idx] = minedHash;
          if (idx < blockNumber.length - 1) {
            setPreviousHash((prevPrev) => {
              const newPrevHash = [...prevPrev];
              newPrevHash[idx + 1] = minedHash;
              return newPrevHash;
            });
          }
          return newHash;
        });
        break;
      }
      possibleNonce++;
    }
  };

  const handleDataChange =
    (idx: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[idx] = e.target.value;
        return newData;
      });
    };

  const handleNounceChange =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let nonce;

      if (e.target.value === "") {
        nonce = 0;
        return;
      } else {
        nonce = parseInt(e.target.value);

        if (isNaN(nonce) || !Number.isInteger(nonce)) {
          return;
        }
      }

      setNonce((prev) => {
        const newNonce = [...prev];
        newNonce[idx] = nonce;
        return newNonce;
      });
    };

  const handleMineNounce = (idx: number) => async () => {
    miningRef.current = true;
    setMining((prev) => {
      const newMining = [...prev];
      newMining[idx] = true;
      return newMining;
    });

    await mineNonce(idx);

    setMining((prev) => {
      const newMining = [...prev];
      newMining[idx] = false;
      return newMining;
    });
    miningRef.current = false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-br from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {name}
        </h1>
      </div>
      {isInitializing ? (
        <Initializing />
      ) : (
        <div className=" flex items-center gap-4 overflow-x-auto pb-4">
          {blockNumber.map((_, idx) => (
            <Blockcomponent
              idx={idx}
              isValid={isValid}
              blockNumber={blockNumber}
              nonce={nonce}
              data={data}
              previousHash={previousHash}
              hash={hash}
              mining={mining}
              progress={progress}
              miningRef={miningRef}
              handleNounceChange={handleNounceChange}
              handleDataChange={handleDataChange}
              handleMineNounce={handleMineNounce}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Blockchain;
