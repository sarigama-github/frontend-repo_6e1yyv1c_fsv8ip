import { Search, Menu } from 'lucide-react'

export default function Navbar({ query, setQuery, onSearch }) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <a href="/" className="font-bold text-xl tracking-tight">Rentables</a>
        <div className="ml-auto flex-1 max-w-xl">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder="Search tools, gadgets, gear..."
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <a href="#list" className="ml-3 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">List an item</a>
      </div>
    </header>
  )
}
