import { useState } from 'react'

export default function ItemForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Tools',
    daily_price: '',
    owner_name: '',
    owner_email: '',
    location: '',
    images: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        ...form,
        daily_price: parseFloat(form.daily_price || 0),
        images: form.images ? form.images.split(',').map(s => s.trim()) : undefined
      }
      const res = await fetch(`${baseUrl}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create item')
      const data = await res.json()
      onCreated?.(data.id)
      setForm({ title: '', description: '', category: 'Tools', daily_price: '', owner_name: '', owner_email: '', location: '', images: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && <div className="p-2 bg-red-50 text-red-700 rounded">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Item title" className="input" required />
        <select name="category" value={form.category} onChange={handleChange} className="input">
          <option>Tools</option>
          <option>Electronics</option>
          <option>Outdoor</option>
          <option>Party</option>
          <option>Other</option>
        </select>
        <input name="daily_price" value={form.daily_price} onChange={handleChange} placeholder="Daily price" className="input" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="input" />
        <input name="owner_name" value={form.owner_name} onChange={handleChange} placeholder="Your name" className="input" required />
        <input name="owner_email" type="email" value={form.owner_email} onChange={handleChange} placeholder="Your email" className="input" required />
        <input name="images" value={form.images} onChange={handleChange} placeholder="Image URLs (comma separated)" className="md:col-span-2 input" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="md:col-span-2 input" rows="3" />
      </div>
      <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Listing...' : 'List item'}</button>
    </form>
  )
}
