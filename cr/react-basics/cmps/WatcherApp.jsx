const { useState, useEffect } = React

import { watcherService } from '../services/watcher.service.js'
import { WatcherModal } from './WatcherModal.jsx'
import { WatcherPreview } from './WatcherPreview.jsx'

export function WatcherApp() {
  //add bonus update the user the rerender the model and the list etc
  const [watchers, setWatchers] = useState(null)
  const [selectedWatcher, setSelectedWatcher] = useState(null)

  useEffect(() => {
    loadWatchers()
  }, [])

  function loadWatchers() {
    watcherService.query()
      .then(setWatchers)
      .catch(err =>
        console.log('had issues loading watcher', err, watchers)
      )
  }

  function onAddWatcher() {
    const name = prompt('Watcher name')
    watcherService.addWatcher(name)
      .then(savedWatcher => {
        setWatchers((prevWatchers) => [...prevWatchers, savedWatcher])
      })

      .catch(err => {
        console.log('Had issues adding watcher', err)
      })
  }

  //update watcher by id
  function onUpdateWatcher(watcher) {

    const fullname = prompt('Update Watcher name')
    watcherService.updateWatcher({ ...watcher, fullname })
      .then(updatedWatcher => {

        setWatchers((prevWatchers) =>
          prevWatchers.map((watcher) =>
            watcher.id === updatedWatcher.id ? updatedWatcher : watcher
          )
        )
        // and the selected watcher to see it updated in the modal
        setSelectedWatcher(updatedWatcher)
      })

      .catch(err => {
        console.log('err:', err)
      })
  }

  function onSelectWatcher(watcher) {
    // Better way is to get by id from service - not neccessarry at this point
    setSelectedWatcher(watcher)
  }

  function onRemoveWatcher(id) {
    watcherService.removeWatcher(id)
      .then(() => {
        setWatchers((prevWatchers) => prevWatchers.filter((w) => w.id !== id))
      })
      .catch(
        err => console.log('Had issues removing watcher', err)
      )


  }

  if (!watchers) return <div>Loading...</div>

  return (
    <section>
      <button onClick={onAddWatcher}>Add Watcher</button>
      <div className="watcher-app-container">
        {watchers.map((watcher) => (
          <WatcherPreview
            key={watcher.id}
            watcher={watcher}
            onSelectWatcher={onSelectWatcher}
            onRemoveWatcher={onRemoveWatcher}
          />
        ))}

        {selectedWatcher && (
          <WatcherModal
            watcher={selectedWatcher}
            onUpdateWatcher={onUpdateWatcher}
            onCloseModal={() => setSelectedWatcher(null)}
          />
        )}
      </div>
    </section>
  )
}
