interface Duration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getDurationFromDays(totalDays: number): Duration {
  const seconds = totalDays * 24 * 60 * 60;
  const years = Math.floor(totalDays / 365);
  totalDays -= years * 365;
  const months = Math.floor(totalDays / 30);
  totalDays -= months * 30;
  const weeks = Math.floor(totalDays / 7);
  totalDays -= weeks * 7;
  const daysRemaining = totalDays;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = seconds % 60;
  return {
    years,
    months,
    weeks,
    days: daysRemaining,
    hours,
    minutes,
    seconds: secondsRemaining,
  };
}
