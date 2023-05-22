import { useEffect, useState } from 'react'

const useSwipe = () => {
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [direction, setDirection] = useState(0)

  // Reset direction
  useEffect(() => {
    if (direction === 0) return
    setDirection(0)
  }, [direction])

  useEffect(() => {
    const handleStart = (e: any) => {
      if (e.changedTouches) {
        setTouchStartX(e.changedTouches[0].screenX)
        return
      }
      setTouchStartX(e.screenX)
    }
    const handleEnd = (e: any) => {
      if (e.changedTouches) {
        setTouchEndX(e.changedTouches[0].screenX)
        return
      }
      setTouchEndX(e.screenX)
    }

    document.addEventListener('touchstart', handleStart)
    document.addEventListener('mousedown', handleStart)

    document.addEventListener('touchend', handleEnd)
    document.addEventListener('mouseup', handleEnd)

    return () => {
      document.removeEventListener('mousedown', handleStart)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener(
        'touchstart',
        handleStart,
      )
      document.removeEventListener('touchend', handleEnd)
    }
  }, [])

  useEffect(() => {
    if (touchEndX === 0) return

    setTouchEndX(0)
    setTouchStartX(0)

    setDirection(touchStartX - touchEndX)
  }, [touchStartX, touchEndX])

  return direction
}

export default useSwipe
