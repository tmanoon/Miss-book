const { useEffect, useState, useRef } = React

export function MouseMonitor() {
  // Declare state
  const [isOn, setIsOn] = useState(true)
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  })


  useEffect(() => {
    // After isOn is updated - if it's true add listener
    if (isOn) addMouseListener()
    else removeMouseListener()
    return () => {
      // Either way before each re-render caused by changing is on - remove the mouse listener.
      if (isOn) removeMouseListener()
    }
  }, [isOn])

  // Toggle isOn - some might add and remove listener here!!!
  function toggleIsOn() {
    setIsOn((prevIsOn) => !prevIsOn)
  }

  // Declare mouse add / remove listeners
  function addMouseListener() {
    document.addEventListener('mousemove', updatePos)
  }

  function removeMouseListener() {
    document.removeEventListener('mousemove', updatePos)
  }

  // Update state mouse position
  function updatePos({ clientX, clientY }) {

    setPos({
      x: clientX,
      y: clientY,
    })
  }

  // Rendering
  return (
    <section className="mouse-monitor-container">
      <h2>Mouse Position</h2>

      <div>
        x: {pos.x}, y: {pos.y}
      </div>

      <button onClick={toggleIsOn}>{isOn ? 'Pause' : 'Resume'}</button>
    </section>
  )
}
