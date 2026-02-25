import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import image from "./assets/Wallpaper edit.jpg";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="">
            <img src={image} alt="Cat" />
        </a>
      </div>
      <div>
      <h1>❤️MAX❤️     ❤️PANDA❤️     ❤️BILLU❤️</h1>
      </div>
    </>
  )
}

export default App
