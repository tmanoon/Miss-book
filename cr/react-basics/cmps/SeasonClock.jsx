const  { useState, useEffect, useRef } = React
import { utilService } from "../services/util.service.js";

export function SeasonClock() {
  const [isDark, setIsDark] = useState(false)
  const [time, setTime] = useState(new Date())
  const timerIntervalRef = useRef()


  useEffect(() => {
    timerIntervalRef.current = setInterval(()=>setTime(new Date()), 1000)

    return () => clearInterval(timerIntervalRef.current)
  },[])

  function toggleIsDark() {
    setIsDark((prevIsDark) => !prevIsDark)
  }
  // render time methods - no need for different pieces of state - get data from the date in the state`
  function getDayName() {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    return dayNames[time.getDay()]
  }

  function getSeasonName() {
    const currMonth = time.getMonth() + 1
    if (currMonth > 2 && currMonth < 6) return 'spring'
    if (currMonth > 5 && currMonth < 9) return 'summer'
    if (currMonth > 8 && currMonth < 12) return 'autumn'
    return 'winter'
  }

  // Rendering
  return (
    <section
      className={'season-clock-container' + (isDark ? ' dark' : '')}
      onClick={toggleIsDark}
    >
      <h2>
        {utilService.getMonthName(time)} ({getSeasonName()})
      </h2>

      <img src={`../assets/img/${getSeasonName()}.png`} alt="seasonImg" />

      {/* <div className={'season-icon ' + getSeasonName()}></div> */}
      <p>{getDayName()}</p>

      <p>{`${utilService.padNum(time.getHours())}:${utilService.padNum(
        time.getMinutes()
      )}:${utilService.padNum(time.getSeconds())}`}</p>
    </section>
  )
}
