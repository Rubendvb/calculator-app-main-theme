import { useEffect, useState } from 'react'
import './Header.scss'

const themes = {
  1: 'theme1',
  2: 'theme2',
  3: 'theme3',
}

export default function Header() {
  const [positionToggle, setPositionToggle] = useState(1)

  useEffect(() => {
    const root = document.documentElement

    root.setAttribute('data-theme', themes[positionToggle])
  }, [positionToggle])

  function handleThemeChange(e) {
    let valueToggle = Number(e?.target?.value)

    setPositionToggle(valueToggle)
  }

  return (
    <header className="header">
      <span className="header__calc">calc</span>

      <div className="header__container">
        <span className="header__text">Theme</span>

        <div className="header__wrapper">
          <div className="header__numbers">
            {[1, 2, 3].map((num) => (
              <span key={num}>{num}</span>
            ))}
          </div>

          <div className="range-slider">
            <input
              type="range"
              value={positionToggle}
              min={1}
              step={1}
              max={3}
              id="custom-toggle"
              className={`toggleDef toggle${positionToggle}`}
              onChange={handleThemeChange}
            />

            <div className="slider-track"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
