export function uid(){

  return crypto.randomUUID();

}

export function formatDate(
date
){

  return new Intl.DateTimeFormat(
    "fa-IR",
    {
      weekday:"long",
      year:"numeric",
      month:"long",
      day:"numeric"
    }
  ).format(date);

}
