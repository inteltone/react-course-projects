import './App.scss'
import { useEffect, useRef, useState } from "react"
import {users} from './users.js'
import User from './components/User/User'
import Button from "./components/Button/Button"
import Loading from './components/Loading/Loading'

const LOADING_DELAY = 2000

function pickRandomIndex(currentIndex) {
  if (currentIndex === null) {
    return Math.floor(Math.random() * users.length)
  }
  const offset = 1 + Math.floor(Math.random() * (users.length - 1))
  return (currentIndex + offset) % users.length
}

function App() {
  const [requestId, setRequestId] = useState(0)
  const [userIndex, setUserIndex] = useState(null)
  const [loadedRequestId, setLoadedRequestId] = useState(null)
  const shownIndexRef = useRef(null)

  const isLoading = loadedRequestId !== requestId

  useEffect(() => {
    const timerId = setTimeout(() => {
      const nextIndex = pickRandomIndex(shownIndexRef.current)
      shownIndexRef.current = nextIndex
      setUserIndex(nextIndex)
      setLoadedRequestId(requestId)
    }, LOADING_DELAY)

    return () => clearTimeout(timerId)
  }, [requestId])

  function handleNextClick() {
    setRequestId(id => id + 1)
  }

  return (
    <div className="react-life-cycle">
      <div className="user-wrapper">
        {isLoading && <Loading />}
        {!isLoading && (
          <User user={users[userIndex]} />
        )}
      </div>
      <Button onClick={handleNextClick}>Следующий</Button>
    </div>
  )
}

export default App
