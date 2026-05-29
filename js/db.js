const DB_NAME = "journara-db";
const DB_VERSION = 1;

let db;

export async function initDB(){

  return new Promise((resolve,reject)=>{

    const request =
      indexedDB.open(DB_NAME,DB_VERSION);

    request.onupgradeneeded = (e)=>{

      db = e.target.result;

      if(!db.objectStoreNames.contains("journals")){

        const store =
          db.createObjectStore(
            "journals",
            { keyPath:"id" }
          );

        store.createIndex(
          "date",
          "date"
        );

      }

    };

    request.onsuccess = ()=>{

      db = request.result;

      resolve(db);

    };

    request.onerror = ()=>{

      reject(request.error);

    };

  });

}

export async function saveJournal(data){

  return new Promise((resolve,reject)=>{

    const tx =
      db.transaction(
        "journals",
        "readwrite"
      );

    tx.objectStore("journals")
      .put(data);

    tx.oncomplete = ()=>resolve();

    tx.onerror = ()=>reject();

  });

}

export async function getAllJournals(){

  return new Promise((resolve,reject)=>{

    const tx =
      db.transaction(
        "journals",
        "readonly"
      );

    const req =
      tx.objectStore("journals")
      .getAll();

    req.onsuccess =
      ()=>resolve(req.result);

    req.onerror =
      ()=>reject(req.error);

  });

}
