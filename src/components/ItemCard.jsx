export default function ItemCard({ item, onRent }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      {item.images?.[0] ? (
        <img src={item.images[0]} alt={item.title} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
          <span className="shrink-0 px-2 py-1 rounded text-sm bg-blue-50 text-blue-700 font-medium">${item.daily_price}/day</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span className="px-2 py-0.5 rounded bg-gray-100">{item.category}</span>
          {item.location && <span>{item.location}</span>}
        </div>
        <button onClick={() => onRent(item)} className="mt-4 w-full bg-gray-900 text-white rounded-md py-2 hover:bg-black">Request to rent</button>
      </div>
    </div>
  )
}
