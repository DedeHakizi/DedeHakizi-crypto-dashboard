import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 20,
              page: 1,
              sparkline: false,
            },
          }
        )
        setCoins(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load crypto data')
        setLoading(false)
      }
    }

    fetchCoins()
    // Refresh every 60 seconds
    const interval = setInterval(fetchCoins, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="status">Loading...</div>
  if (error) return <div className="status error">{error}</div>

  return (
    <div className="dashboard">
      <h1>Crypto Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td className="coin-name">
                <img src={coin.image} alt={coin.name} width="24" height="24" />
                <span>{coin.name}</span>
                <span className="symbol">{coin.symbol.toUpperCase()}</span>
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
