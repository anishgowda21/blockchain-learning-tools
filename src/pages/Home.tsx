const Home = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center text-white mb-12">
        Hey There
      </h1>

      <div className="max-w-2xl mx-auto">
        <div className="space-y-6 text-gray-300">
          <p className="text-lg leading-relaxed">
            I recently came across Anders Brownworth's YouTube video on
            Blockchain and really liked his tool. So I decided to redo it in
            React for both fun and learning.
          </p>

          <p className="text-lg leading-relaxed">
            I will gradually update this with other tools from his video as
            well. For now, I have only added the Block implementation.
          </p>

          <div className="bg-gray-800/50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-3">
              Available Tools:
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-green-400">
                Block Demo - Explore how blockchain hashing works
              </li>
              <li className="text-gray-500">Blockchain Demo - Coming soon</li>
              <li className="text-gray-500">
                Distributed Blockchain - Coming soon
              </li>
              <li className="text-gray-500">Tokens - Coming soon</li>
            </ul>
          </div>

          <div className="text-sm text-gray-400 mt-8">
            <p>
              Original inspiration:{" "}
              <a
                href="https://www.youtube.com/watch?v=_160oMzblY8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Anders Brownworth's Blockchain Demo
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
