interface Duration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function addDurationToDate(date: Date, duration: Duration): Date {
  const { years, months, weeks, days, hours, minutes, seconds } = duration;
  const totalSeconds =
    seconds +
    minutes * 60 +
    hours * 60 * 60 +
    days * 24 * 60 * 60 +
    weeks * 7 * 24 * 60 * 60;
  const totalMonths = months + years * 12;
  const newDate = new Date(date.getTime() + totalSeconds * 1000);
  newDate.setMonth(date.getMonth() + totalMonths);
  return newDate;
}
