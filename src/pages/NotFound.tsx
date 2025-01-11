import { Link } from "react-router-dom";
import { Binary, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Binary className="w-24 h-24 text-blue-500 animate-pulse" />
        </div>

        <h1 className="text-6xl font-bold text-white">
          4<span className="text-blue-500">0</span>4
        </h1>

        <div className="space-y-2">
          <p className="text-2xl text-gray-300">Block Not Found</p>
          <p className="text-gray-400">
            Looks like this block has been mined off the chain
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg
                     hover:bg-blue-600 transition-colors"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
