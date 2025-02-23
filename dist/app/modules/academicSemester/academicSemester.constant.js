"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterableFields = exports.searchAbleFields = exports.academicSemesterTitleCodeMapper = exports.code = exports.title = exports.months = void 0;
exports.months = [
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
exports.title = ["Autumn", "Summer", "Fall"];
exports.code = ["01", "02", "03"];
exports.academicSemesterTitleCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
};
exports.searchAbleFields = ["title", "code", "year"];
exports.filterableFields = ['searchTerm', 'title', 'code', 'year'];
