import { Code, Months, Title } from "./academicSemester.interface";

export const months: Months[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const title: Title[] = ["Autumn", "Summer", "Fall"];
export const code: Code[] = ["01", "02", "03"];

export const academicSemesterTitleCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
export const searchAbleFields = ["title", "code", "year"];

export const filterableFields=['searchTerm','title','code','year']
