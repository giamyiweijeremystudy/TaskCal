let db;

export function initDB() {
return new Promise(resolve => {
const req = indexedDB.open('taskcal-db', 1);


req.onupgradeneeded = e => {
db = e.target.result;
db.createObjectStore('items', { keyPath: 'id' });
};


req.onsuccess = e => {
db = e.target.result;
resolve();
};
});
}

export function saveItem(item) {
const tx = db.transaction('items', 'readwrite');
tx.objectStore('items').put(item);
}


export function getItems() {
return new Promise(resolve => {
const tx = db.transaction('items');
const req = tx.objectStore('items').getAll();
req.onsuccess = () => resolve(req.result);
});
}
