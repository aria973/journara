import {
  initDB,
  saveJournal,
  getAllJournals
} from "./db.js";

import {
  uid,
  formatDate
} from "./storage.js";

import {
  updateMood
} from "./ui.js";

const moodSlider =
document.getElementById(
  "moodSlider"
);

const openTodayBtn =
document.getElementById(
  "openTodayBtn"
);

const editorModal =
document.getElementById(
  "editorModal"
);

const saveEntryBtn =
document.getElementById(
  "saveEntryBtn"
);

const entryTitle =
document.getElementById(
  "entryTitle"
);

const entryBody =
document.getElementById(
  "entryBody"
);

const journalList =
document.getElementById(
  "journalList"
);

moodSlider.addEventListener(
"input",
()=>{

  updateMood(
    moodSlider.value
  );

});

openTodayBtn.addEventListener(
"click",
()=>{

  editorModal.showModal();

});

saveEntryBtn.addEventListener(
"click",
async ()=>{

  const data = {

    id:uid(),

    title:
      entryTitle.value,

    body:
      entryBody.value,

    mood:
      Number(
        moodSlider.value
      ),

    date:
      Date.now()

  };

  await saveJournal(data);

  renderJournals();

  editorModal.close();

});

async function renderJournals(){

  const journals =
  await getAllJournals();

  journalList.innerHTML = "";

  journals.reverse().forEach(
  journal=>{

    const item =
    document.createElement(
      "button"
    );

    item.className =
    "journal-card glass";

    item.innerHTML = `

      <div class="journal-date">
        ${
          formatDate(
            journal.date
          )
        }
      </div>

      <div class="journal-title">
        ${journal.title}
      </div>

    `;

    journalList.appendChild(
      item
    );

  });

}

async function bootstrap(){

  await initDB();

  await renderJournals();

  updateMood(3);

  if(
    "serviceWorker"
    in navigator
  ){

    navigator.serviceWorker
    .register("./sw.js");

  }

}

bootstrap();
