import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <main>
      <div className="pattern">

      </div>

      <div className="wrapper">
        <header>
          <h1>
            <span className="text-gradient">
              Movies
            </span>
            You'll Enojoy Without the Hassle
          </h1>
        </header>
        <p>
          Search
        </p>
      </div>

    </main>
  )
}

export default App
