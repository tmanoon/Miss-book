const { useState, useRef, useEffect } = React
import { utilService } from "../services/util.service.js";


export function CountDown({ startFrom, toTime, onDone }) {

  const [timeLeft, setTimeLeft] = useState(toTime ? (toTime - Date.now())/1000 : startFrom )
  // Keep interval in ref in order to save data that
  // will survive renders
  const timerIntervalRef = useRef()

  useEffect(() => {
    // When mounted start interval
    timerIntervalRef.current = setInterval(onSetTimeLeft, 1000)
    // When unmounted clear
    return () => clearInterval(timerIntervalRef.current)
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerIntervalRef.current)
      onDone()
    }
  }, [timeLeft])

  function onSetTimeLeft() {
    setTimeLeft((prevTime) => prevTime - 1)

  }

  const remaningTimeClass = timeLeft <= 6 ? 'danger' : ''
  const minsLeft = utilService.padNum(Math.floor(timeLeft / 60))
  const secsLeft = utilService.padNum(Math.floor(timeLeft % 60))
  return (
    <section className="count-down-container">
      <span>{minsLeft}</span>:
      <span className={remaningTimeClass}>
        {secsLeft}
      </span>
    </section>
  )
}
