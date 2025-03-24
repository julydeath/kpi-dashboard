import SearchBar from "./SearchBar";

export default function Library() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Library</h1>
            <p className="text-gray-500 mt-1">
              Browse for assets needed for report and dashboard analysis.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800">
              Request
            </button>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
