const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const getDay = (date: Date): string => day[date.getDay()];

export const getFullDate = (date: Date): string =>
  `
    ${date.getDate()} 
    ${month[date.getMonth()]} 
    ${date.getFullYear()}
  `;

export const getMonthYear = (date: Date): string =>
  `
    ${month[date.getMonth()]} 
    ${date.getFullYear()}
  `;
