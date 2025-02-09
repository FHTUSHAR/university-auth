"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationHelper = void 0;
const calculatePagination = (options) => {
    const page = options.page || 1;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    };
};
exports.PaginationHelper = {
    calculatePagination
};
