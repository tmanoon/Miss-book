import { AnimalList } from "./cmps/AnimalList.jsx";
import { SeasonClock } from "./cmps/SeasonClock.jsx";
import { CountDown } from "./cmps/CountDown.jsx";
import { WatcherApp } from "./cmps/WatcherApp.jsx";
import { MouseMonitor } from "./cmps/MouseMonitor.jsx";

const { useState } = React

export function RootCmp() {
    const [page, setPage] = useState('animalList')
  
    const pages = [
      'animalList',
      'seasonClock',
      'countDown',
      'watcherApp',
      'mouseMonitor',
    ]

    const animalInfos = [
      { type: 'Malayan Tiger', count: 787 },
      { type: 'Mountain Gorilla', count: 212 },
      { type: 'Fin Whale', count: 28 },
    ]
  
    function onSetPage(ev, page) {
      ev.preventDefault()
      setPage(page)
    }
  
    return (
      <section className="app">
        <header className="app-header">
          <h1>My App</h1>
        </header>
  
        <section className="home-container">
          <div className="links-container">
            {pages.map((page) => (
              <a
                key={page}
                href=""
                className="link"
                onClick={(ev) => onSetPage(ev, page)}
              >
                {page} | {' '}
              </a>
            ))}
          </div>
  
          <main>
            {page === 'animalList' && <AnimalList animalInfos={animalInfos} />}
            {page === 'seasonClock' && <SeasonClock />}
            {page === 'countDown' && (
              <CountDown startFrom={10} toTime={Date.now() + (1000 * 10)} onDone={() => {   
                  const audio = new Audio('../assets/sound/done.mp3');
                  audio.play();
                  alert('done')
              }} 
                />
            )}
            {page === 'watcherApp' && <WatcherApp />}
            {page === 'mouseMonitor' && <MouseMonitor />}
          </main>
        </section>
      </section>
    )
  }
  
  