const DB_NAME = "journara-pro";
const STORE = "entries";

export class DB {
  constructor(){
    this.db = null;
  }

  async init(){
    return new Promise((res,rej)=>{
      const req = indexedDB.open(DB_NAME,1);

      req.onupgradeneeded = e=>{
        const db = e.target.result;
        db.createObjectStore(STORE,{keyPath:"id",autoIncrement:true});
      };

      req.onsuccess = e=>{
        this.db = e.target.result;
        res();
      };

      req.onerror = rej;
    });
  }

  tx(mode){
    return this.db.transaction(STORE,mode).objectStore(STORE);
  }

  add(data){
    return this.tx("readwrite").add(data);
  }

  getAll(){
    return new Promise(res=>{
      const req = this.tx("readonly").getAll();
      req.onsuccess = ()=>res(req.result);
    });
  }

  get(id){
    return new Promise(res=>{
      const req = this.tx("readonly").get(id);
      req.onsuccess = ()=>res(req.result);
    });
  }
}
