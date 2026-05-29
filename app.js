import { DB } from "./db.js";

const db = new DB();

const state = {
  selected:null,
  mood:3
};

const $ = id => document.getElementById(id);

/* ---------------- INIT ---------------- */
await db.init();
render();
updateDate();

/* ---------------- UI ---------------- */
$("newEntryBtn").onclick = ()=> openModal();

$("saveBtn").onclick = async ()=>{
  await db.add({
    title:$("title").value,
    body:$("body").value,
    mood:state.mood,
    date:Date.now()
  });

  closeModal();
  render();
};

$("backBtn").onclick = ()=>{
  switchScreen("home");
};

/* ---------------- MOOD ---------------- */
$("moodSlider").oninput = e=>{
  state.mood = e.target.value;
  const emojis = ["😭","😞","😐","🙂","😊","😁","🤩"];
  $("moodEmoji").textContent = emojis[state.mood];
};

/* ---------------- RENDER ---------------- */
async function render(){
  const list = $("list");
  list.innerHTML = "";

  const data = await db.getAll();

  data.reverse().forEach(item=>{
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <b>${item.title}</b>
      <div style="color:#8ea0c9;font-size:12px">
        ${item.body.slice(0,60)}
      </div>
    `;

    div.onclick = ()=>{
      $("readerContent").textContent = item.body;
      switchScreen("reader");
    };

    list.appendChild(div);
  });
}

/* ---------------- SCREEN ---------------- */
function switchScreen(id){
  document.querySelectorAll(".screen")
    .forEach(s=>s.classList.remove("active"));

  $(id).classList.add("active");
}

/* ---------------- MODAL ---------------- */
function openModal(){
  $("modal").classList.remove("hidden");
}

function closeModal(){
  $("modal").classList.add("hidden");
  $("title").value="";
  $("body").value="";
}

/* ---------------- DATE ---------------- */
function updateDate(){
  $("today").textContent =
    new Date().toLocaleDateString("fa-IR",{weekday:"long",day:"numeric",month:"long"});
}

/* ---------------- PWA ---------------- */
navigator.serviceWorker?.register("./sw.js");
