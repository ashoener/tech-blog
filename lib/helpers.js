export default {
  activePage(page, currentPage) {
    if (page === currentPage) return " active";
    return null;
  },
  /**
   * @param {Date} date
   * @returns
   */
  renderDate(date) {
    return date.toLocaleDateString();
  },
};
