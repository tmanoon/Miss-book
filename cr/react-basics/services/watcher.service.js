import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const STORGE_KEY = "WatcherKey";
const watchers = [
  {
    id: "w101",
    fullname: "Puki Ba",
    movies: ["Rambo", "Rocky"],
  },
  {
    id: "w102",
    fullname: "Muki Da",
    movies: ["Titanic", "Star Wars"],
  },
  {
    id: "w103",
    fullname: "Suki Sa",
    movies: ["Forrest Gump", "Avatar"],
  },
];

export const watcherService = {
  query,
  addWatcher,
  removeWatcher,
  updateWatcher,
};

//creat watcher
_creatWatchers();

function query() {
  return  storageService.query(STORGE_KEY)
}

function _getEmptyWatcher(name){
  return {
    fullname:name,
    movies:['first','second','third']
  }
}

function addWatcher(watcher) {
  return storageService.post(STORGE_KEY,  _getEmptyWatcher(watcher));
 
}
function removeWatcher(watcherId) {
  return storageService.remove(STORGE_KEY, watcherId);
}
function updateWatcher(watcher) {
  return  storageService.put(STORGE_KEY, watcher);
}

function _creatWatchers() {
  const watcherslist = utilService.loadFromStorage(STORGE_KEY) || [];
  if (!watcherslist || !watcherslist.length) {
    utilService.saveToStorage(STORGE_KEY, watchers);
  }
}
