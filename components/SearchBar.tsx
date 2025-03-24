import { Search } from "lucide-react";

export default function SearchBar() {


    const handleSearch = (e : string) => {
        console.log(e)
    }
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
        type="text"
        placeholder="Search for assets..."
        // onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
