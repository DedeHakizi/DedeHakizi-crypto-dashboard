import { useState, useEffect } from 'react'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(0)

  useEffect(() => {
    // Fetch live crypto prices from CoinGecko API
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,bitcoin-cash&vs_currencies=eur&include_24hr_change=true'
        )
        const data = await response.json()
        setCryptoData(data)
        
        // Calculate portfolio value (example: 0.01 BTC + 0.1 ETH + 1 BCH)
        const portfolio = 
          (0.01 * data.bitcoin.eur) + 
          (0.1 * data.ethereum.eur) + 
          (1 * data['bitcoin-cash'].eur)
        setPortfolioValue(portfolio)
      } catch (error) {
        console.error('Error fetching crypto data:', error)
      }
    }

    fetchCryptoPrices()
    
    // Update prices every 30 seconds
    const interval = setInterval(fetchCryptoPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #00d4ff, #7b2cbf)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🚀 Crypto Portfolio Tracker
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '3rem' }}>
          Real-time prices in EUR • Built with React + Vite
        </p>

        {/* Portfolio Summary */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00d4ff' }}>
            Your Portfolio Value
          </h2>
          <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
            {formatPrice(portfolioValue)}
          </div>
          <p style={{ color: '#a0a0a0', marginTop: '0.5rem' }}>
            (0.01 BTC + 0.1 ETH + 1 BCH)
          </p>
        </div>

        {/* Crypto Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {cryptoData.bitcoin && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3>₿ Bitcoin (BTC)</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
                {formatPrice(cryptoData.bitcoin.eur)}
              </div>
              <div style={{
                color: cryptoData.bitcoin.eur_24h_change >= 0 ? '#00ff88' : '#ff4444',
                fontSize: '1.2rem'
              }}>
                {cryptoData.bitcoin.eur_24h_change >= 0 ? '↑' : '↓'} 
                {Math.abs(cryptoData.bitcoin.eur_24h_change).toFixed(2)}% (24h)
              </div>
            </div>
          )}

          {cryptoData.ethereum && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3>Ξ Ethereum (ETH)</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
                {formatPrice(cryptoData.ethereum.eur)}
              </div>
              <div style={{
                color: cryptoData.ethereum.eur_24h_change >= 0 ? '#00ff88' : '#ff4444',
                fontSize: '1.2rem'
              }}>
                {cryptoData.ethereum.eur_24h_change >= 0 ? '↑' : '↓'} 
                {Math.abs(cryptoData.ethereum.eur_24h_change).toFixed(2)}% (24h)
              </div>
            </div>
          )}

          {cryptoData['bitcoin-cash'] && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3>₿ Bitcoin Cash (BCH)</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
                {formatPrice(cryptoData['bitcoin-cash'].eur)}
              </div>
              <div style={{
                color: cryptoData['bitcoin-cash'].eur_24h_change >= 0 ? '#00ff88' : '#ff4444',
                fontSize: '1.2rem'
              }}>
                {cryptoData['bitcoin-cash'].eur_24h_change >= 0 ? '↑' : '↓'} 
                {Math.abs(cryptoData['bitcoin-cash'].eur_24h_change).toFixed(2)}% (24h)
              </div>
            </div>
          )}
        </div>

        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: '#a0a0a0'
        }}>
          <p>Data updated every 30 seconds • CoinGecko API</p>
          <p style={{ marginTop: '1rem' }}>
            Built by Delphin Hakizimana | Cybersecurity Aspirant
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
