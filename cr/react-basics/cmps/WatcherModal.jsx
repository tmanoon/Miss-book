export function WatcherModal({ watcher, onCloseModal, onUpdateWatcher }) {
    return (
      <div className="watcher-modal-container">
        <h2>{watcher.fullname}</h2>
        <ul>
          {watcher.movies.map((movie) => (
            <li key={movie}>{movie}</li>
          ))}
        </ul>
        <button onClick={onCloseModal}>Close</button>
        <button
          onClick={() => {
            onUpdateWatcher(watcher)
          }}
        >
          Update
        </button>
      </div>
    )
  }
  