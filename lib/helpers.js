import MarkdownIt from "markdown-it";
import markdownItTaskLists from "markdown-it-task-lists";

const md = new MarkdownIt();
md.use(markdownItTaskLists);

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
  renderMarkdown(data) {
    return md.render(data);
  },
};
