export function updateMood(
value
){

  const emoji =
  document.getElementById(
    "moodEmoji"
  );

  const label =
  document.getElementById(
    "moodLabel"
  );

  const moods = [

    ["😭","افتضاح"],
    ["😞","بد"],
    ["😕","تعریفی نداره"],
    ["🙂","خوب و متعادل"],
    ["😌","آروم"],
    ["😄","عالی"],
    ["🤩","فوق‌العاده"]

  ];

  emoji.textContent =
  moods[value][0];

  label.textContent =
  moods[value][1];

}
