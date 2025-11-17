import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ItemCard from './components/ItemCard'
import ItemForm from './components/ItemForm'

function App() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const url = new URL(`${baseUrl}/api/items`)
      if (category !== 'All') url.searchParams.set('category', category)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
      if (!res.ok) throw new Error('Failed to load items')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const onRent = async (item) => {
    const renter_name = prompt('Your name')
    if (!renter_name) return
    const renter_email = prompt('Your email')
    if (!renter_email) return
    const start_date = prompt('Start date (YYYY-MM-DD)')
    const end_date = prompt('End date (YYYY-MM-DD)')
    const message = prompt('Optional message') || ''
    try {
      const payload = { item_id: item._id, item_title: item.title, owner_email: item.owner_email, renter_name, renter_email, start_date, end_date, message }
      const res = await fetch(`${baseUrl}/api/rentals`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed to request rental')
      alert('Request sent! The owner will review it.')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar query={query} setQuery={setQuery} onSearch={fetchItems} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Explore items</h2>
          <div className="flex items-center gap-2 mb-4">
            {['All','Tools','Electronics','Outdoor','Party','Other'].map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 rounded border ${category===cat? 'bg-gray-900 text-white border-gray-900':'bg-white text-gray-700 border-gray-300'}`}>{cat}</button>
            ))}
            <button onClick={fetchItems} className="ml-auto px-3 py-1.5 rounded bg-blue-600 text-white">Refresh</button>
          </div>
          {error && <div className="p-3 bg-red-50 text-red-700 rounded mb-4">{error}</div>}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_,i) => (
                <div key={i} className="h-64 rounded-lg bg-white border animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map(item => (
                <ItemCard key={item._id} item={item} onRent={onRent} />
              ))}
            </div>
          )}
        </section>

        <section id="list" className="bg-white rounded-xl border p-5">
          <h2 className="text-xl font-semibold mb-3">List an item</h2>
          <ItemForm onCreated={() => { fetchItems(); alert('Item listed!') }} />
        </section>
      </main>

      <style>
        {`.input{border:1px solid #d1d5db;border-radius:.5rem;padding:.5rem .75rem;width:100%;}
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}
      </style>
    </div>
  )
}

export default App
