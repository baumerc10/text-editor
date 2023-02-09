import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('Request to update database.');
  const contentDb = await openDB('jate', 1);
  const trans = contentDb.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const req = store.put({id: id, value: content});
  const res = await req;
  console.log('Data updated and saved to the database.', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (content) => {
  console.log('Getting data.');
  const contentDb = await openDB('jate', 1);
  const trans = contentDb.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const req = store.getAll();
  const res = await req;
  console.log('Data saved to the database.', res);
}

initdb();
