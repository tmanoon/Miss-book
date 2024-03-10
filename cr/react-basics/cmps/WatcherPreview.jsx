export function WatcherPreview({ watcher, onSelectWatcher, onRemoveWatcher }) {

    
    return (
        <article className="watcher-preview-container" style={{ backgroundColor: watcher.color }}>
            <img src="../../assets/img/avatar.png" />
            <h2>{watcher.fullname}</h2>
            <button onClick={() => onSelectWatcher(watcher)}>Select</button>
            <button onClick={() => onRemoveWatcher(watcher.id)}>X</button>
        </article>
    )
}