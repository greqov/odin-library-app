'use strict';

(function () {
  // get unique id
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  const generateId = () => `${s4()}-${s4()}-${s4()}`;

  let myLibrary = [];

  const defaultBooks = [
    {
      id: generateId(),
      title: 'Anthem (Barnes & Noble Book Club Edition)',
      author: 'Noah Hawley',
      pages: 100,
      read: false,
    },
    {
      id: generateId(),
      title: 'It Ends with Us',
      author: 'Colleen Hoover',
      pages: 250,
      read: false,
    },
    {
      id: generateId(),
      title: 'To Paradise: A Novel (Signed Book)',
      author: 'Hanya Yanagihara',
      pages: 75,
      read: true,
    },
  ];

  function Book(title, author, pages, read) {
    this.id = generateId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  Book.prototype.toggleRead = function () {
    this.read = !this.read;
  };

  function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
  }

  defaultBooks.forEach((book) => {
    const { title, author, pages, read } = book;
    addBookToLibrary(title, author, pages, read);
  });

  const booksTable = document.querySelector('.books-table');
  const booksTableBody = booksTable.querySelector('tbody');

  const noBooksTr = `<tr><td class="td-message" colspan="5">No books</td></tr>`;

  function displayBooks() {
    let rows = '';
    if (myLibrary.length) {
      myLibrary.forEach((book) => {
        const { id, title, author, pages, read } = book;
        const bookRow = `
        <tr data-id="${id}">
          <td>${title}</td>
          <td>${author}</td>
          <td>${pages}</td>
          <td>${read}</td>
          <td>
            <button class="js-btn js-toggle-read" type="button">Toggle</button>
            <button class="js-btn js-remove-book" type="button">Remove</button>
          </td>
        </tr>
        `;
        rows += bookRow;
      });
    } else {
      // TODO: remove message row on adding new book
      rows += noBooksTr;
    }

    booksTableBody.innerHTML = rows;
  }

  function toggleRead(id) {
    myLibrary
      .filter((book) => book.id === id)
      .forEach((book) => {
        book.toggleRead();
        booksTableBody
          .querySelector(`[data-id="${id}"]`)
          .querySelector('td:nth-child(4)').textContent = book.read;
      });
  }

  function removeBook(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    if (booksTableBody.querySelectorAll('tr').length > 1) {
      booksTable.querySelector(`[data-id="${id}"]`).remove();
    } else {
      booksTableBody.innerHTML = noBooksTr;
    }
  }

  // add event listeners
  booksTable.addEventListener('click', (e) => {
    const { target } = e;

    if (target.classList.contains('js-btn')) {
      // TODO: fix selector
      const id = target.parentNode.parentNode.getAttribute('data-id');

      // NOTE: assume there are only 2 buttons
      if (target.classList.contains('js-toggle-read')) {
        toggleRead(id);
      } else {
        removeBook(id);
      }
    }
  });

  const newBookBtn = document.querySelector('.js-new-book');
  const newBookForm = document.querySelector('.js-new-book-form');
  newBookBtn.addEventListener('click', () => {
    newBookForm.classList.add('is-visible');
  });

  const newBookCancelBtn = document.querySelector('.js-new-book-cancel');
  newBookCancelBtn.addEventListener('click', () => {
    newBookForm.classList.remove('is-visible');
  });

  const newBookSubmitBtn = document.querySelector('.js-new-book-submit');
  const titleField = document.querySelector('[name="new-book-title"]');
  const authorField = document.querySelector('[name="new-book-author"]');
  const pagesField = document.querySelector('[name="new-book-pages"]');
  const readField = document.querySelector('[name="new-book-read"]');
  newBookSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleField.value;
    const author = authorField.value;
    const pages = pagesField.value;
    const read = readField.checked;

    if (title && author && pages) {
      addBookToLibrary(title, author, pages, read);
      console.log({ myLibrary });
      // TODO: add row in a table
      newBookForm.reset();
      newBookForm.classList.remove('is-visible');
    } else {
      console.log('Please fill all fields');
    }
  });

  // init actions
  displayBooks();
})();
