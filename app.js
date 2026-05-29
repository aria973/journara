const dbName = "journaraDB";
let db;

const moodEmoji = ["😭","😞","😐","🙂","😊","😁","🤩"];

const $ = id => document.getElementById(id);

/* ---------------- DB ---------------- */
function openDB(){
  const req = indexedDB.open(dbName,1);

  req.onupgradeneeded = e=>{
    db = e.target.result;
    db.createObjectStore("entries",{keyPath:"id",autoIncrement:true});
  };

  req.onsuccess = e=>{
    db = e.target.result;
    load();
  };
}

/* ---------------- SAVE ---------------- */
function saveEntry(data){
  const tx = db.transaction("entries","readwrite");
  tx.objectStore("entries").add(data);
  tx.oncomplete = load;
}

/* ---------------- LOAD ---------------- */
function load(){
  const tx = db.transaction("entries","readonly");
  const store = tx.objectStore("entries");

  const req = store.getAll();
  req.onsuccess = () => render(req.result.reverse());
}

/* ---------------- RENDER ---------------- */
function render(items){
  const list = $("list");
  list.innerHTML = "";

  items.forEach(i=>{
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <b>${i.title}</b>
      <div style="color:#93a4c7;font-size:12px">${i.body.slice(0,60)}</div>
    `;

    div.onclick = ()=>{
      $("readerScreen").classList.add("active");
      $("homeScreen").classList.remove("active");
      $("reader").innerText = i.body;
    };

    list.appendChild(div);
  });
}

/* ---------------- UI ---------------- */
$("newBtn").onclick = ()=>{
  $("modal").classList.remove("hidden");
};

$("saveBtn").onclick = ()=>{
  saveEntry({
    title:$("title").value,
    body:$("body").value,
    date:Date.now(),
    mood:$("mood").value
  });

  $("modal").classList.add("hidden");
  $("title").value="";
  $("body").value="";
};

$("backBtn").onclick = ()=>{
  $("readerScreen").classList.remove("active");
  $("homeScreen").classList.add("active");
};

/* ---------------- MOOD ---------------- */
$("mood").oninput = e=>{
  $("moodEmoji").innerText = moodEmoji[e.target.value];
};

/* ---------------- INIT ---------------- */
openDB();

/* ---------------- PWA ---------------- */
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./sw.js");
}
