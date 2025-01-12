import { useEffect, useRef, useState } from "react";

const Blockchain = () => {
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
  const [isValid, serIsValid] = useState<boolean[]>(Array(4).fill(false));

  useEffect(() => {
    const calculateHash = async () => {
      const promises = blockNumber.map(async (_, idx) => {
        const message = `${blockNumber[idx]}${nonce[idx]}${data[idx]}${previousHash[idx]}`;
        return await digestMessage(message);
      });

      const newHashes = await Promise.all(promises);

      setHash(newHashes);

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
      console.log(possibleNonce);

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
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[idx] = e.target.value;
        return newData;
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
    <div className=" flex items-center gap-4 ">
      {blockNumber.map((_, idx) => (
        <div
          key={idx}
          className="gird grid-cols-1 gap-5 bg-grey-800 p-8 m-5 rounded-md shadow-2xl"
        >
          <div className="space-y-3">
            <div>
              <div>block: {blockNumber[idx]}</div>
              <div>nonce: {nonce[idx]}</div>
              <div>
                data:{" "}
                <input
                  type="text"
                  value={data[idx]}
                  onChange={handleDataChange(idx)}
                />
              </div>
              <div>
                prev hash:{" "}
                <input type="text" value={previousHash[idx]} disabled={true} />
              </div>
              <div className="break-all">hash: {hash[idx]}</div>
              <div>
                <button
                  className="ring-2"
                  onClick={handleMineNounce(idx)}
                  disabled={miningRef.current}
                >
                  {mining[idx] ? "Mining" : "Mine"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Blockchain;
