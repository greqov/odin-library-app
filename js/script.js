'use strict';

(function () {
  // get unique id
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  const generateId = () => `${s4()}-${s4()}-${s4()}`;

  const myLibrary = [
    {
      id: 0,
      title: 'Anthem (Barnes & Noble Book Club Edition)',
      author: 'Noah Hawley',
      pages: 100,
      read: false,
    },
    {
      id: 1,
      title: 'It Ends with Us',
      author: 'Colleen Hoover',
      pages: 250,
      read: false,
    },
    {
      id: 2,
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

  function addBookToLibrary(book) {
    // do stuff here

    myLibrary.push(book);
  }

  const booksTable = document.querySelector('.books-table');

  function displayBooks() {
    let rows = '';
    myLibrary.forEach((book) => {
      const { id, title, author, pages, read } = book;
      const bookRow = `
      <tr data-id="${id}">
        <td>${title}</td>
        <td>${author}</td>
        <td>${pages}</td>
        <td>${read}</td>
        <td><button type="button">Remove</button></td>
      </tr>
      `;
      rows += bookRow;
    });

    booksTable.querySelector('tbody').innerHTML = rows;
  }

  // init actions
  displayBooks();
})();
