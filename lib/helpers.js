export default {
  activePage(page, currentPage) {
    if (page === currentPage) return " active";
    return null;
  },
};
