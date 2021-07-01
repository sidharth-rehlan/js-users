function Pagination(currentPage) {
  this.currentPage = currentPage;

  this.nextPage = () => {
    this.currentPage = this.currentPage + 1;
  };
  this.previousPage = () => {
    this.currentPage =
      this.currentPage === 1 ? this.currentPage : this.currentPage - 1;
  };

  this.getCurrentPage = () => {
    return this.currentPage;
  };
}
