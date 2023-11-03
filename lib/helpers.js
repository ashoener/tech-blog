export default {
  activePage(page, currentPage) {
    console.log(page, currentPage);
    if (page === currentPage) return " active";
    return null;
  },
};
