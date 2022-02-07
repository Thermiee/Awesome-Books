class Book {
  title;
  author;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          (storage && storage.length !== 0);
  }
}

function updateLocalStorage() {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('books', JSON.stringify(books));
  }
}

const books = [];
const booksList = document.getElementById('books-list');
const localBooksData = localStorage.getItem('books');
if (localBooksData) {
  books.value = JSON.parse(localBooksData);
}


function bookExists(book) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === book.title && books[i].author === book.author) {
      return true;
    }
  }
  return false;
}

function displayNewElement(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove';

  bookDiv.innerHTML = `
    <h2 class="book-title">${book.title}</h2>
    <p class="book-author">${book.author}</p>
  `;
  bookDiv.appendChild(removeButton);
  bookDiv.appendChild(document.createElement('hr'));

  booksList.appendChild(bookDiv);

  removeButton.addEventListener('click', () => {
    removeBook(book);
    bookDiv.remove();
  });
}

function addBook(book) {
  if (!bookExists(book)) {
    console.log('yes');
    books.push(book);
    displayNewElement(book);
    updateLocalStorage();
    return;
  }
  alert('The Book and Author exist');
}

function removeBook(book) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === book.title && books[i].author === book.author) {
      books.splice(i, 1);
      updateLocalStorage();
      return;
    }
  }
}

books.forEach((book) => {
  displayNewElement(book);
});

const addBookForm = document.getElementById('add-book-form');

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook({
    title: addBookForm.elements.title.value,
    author: addBookForm.elements.author.value,
  });
});


