document.addEventListener('DOMContentLoaded', function () {
  const blogsPerPage = 9;
  const totalBlogs = document.querySelectorAll('.blog-card').length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  displayPage(1);

  function displayPage(pageNumber) {
    const startIndex = (pageNumber - 1) * blogsPerPage;
    const endIndex = Math.min(startIndex + blogsPerPage, totalBlogs);

    hideAllBlogCards();

    for (let i = startIndex; i < endIndex; i++) {
      const blogCard = document.querySelector(`.blog-card:nth-child(${i + 1})`);
      if (blogCard) {
        blogCard.style.display = 'block';
      }
    }

    displayPaginationLinks(totalPages, pageNumber);
  }

  function hideAllBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
      card.style.display = 'none';
    });
  }

  function displayPaginationLinks(totalPages, currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const previousPageLink = createPageLink('<<', currentPage - 1);
    paginationContainer.appendChild(previousPageLink);

    const firstPageLink = createPageLink('<', 1);
    paginationContainer.appendChild(firstPageLink);

    for (let i = 1; i <= totalPages; i++) {
      const link = createPageLink(i, i);
      paginationContainer.appendChild(link);
    }

    const nextPageLink = createPageLink('>', currentPage + 1);
    paginationContainer.appendChild(nextPageLink);

    const lastPageLink = createPageLink('>>', totalPages);
    paginationContainer.appendChild(lastPageLink);

    function createPageLink(text, pageNumber) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = text;

      if (text === '<<' || text === '<' || text === '>>' || text === '>') {
        link.addEventListener('click', () => onPageClick(pageNumber));
        link.classList.add('double-arrow');
      } else {
        link.addEventListener('click', () => onPageClick(pageNumber));
        if (pageNumber === currentPage) {
          link.classList.add('active');
        }
      }

      return link;
    }
  }

  function onPageClick(pageNumber) {
    displayPage(pageNumber);
  }
});
