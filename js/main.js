// Local Storage Functions
// eslint-disable-next-line max-classes-per-file
const storageAvailable = (type) => {
  // Check if Storage is available
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22
        || e.code === 1014
        || e.name === 'QuotaExceededError'
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && (storage && storage.length !== 0);
  }
};

class Book {
  // Book Class has a title and author
  title;

  author;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  // Library class consists of a list of books
  books = [];

  constructor(books) {
    this.books = books;
  }

  bookExists(book) {
    // Check if a book exists
    for (let i = 0; i < this.books.length; i += 1) {
      if (this.books[i].title === book.title && this.books[i].author === book.author) {
        return true;
      }
    }
    return false;
  }

  addBook(book) {
    // Add a new book to the list of books
    if (!this.bookExists(book)) {
      // eslint-disable-next-line no-use-before-define
      displayNewElement(book);
      this.books.push(book);
      this.updateLocalStorage();
      return;
    }
    alert('The Book and Author exist');
  }

  removeBook(book) {
    // Remove a book from the list of lists
    for (let i = 0; i < this.books.length; i += 1) {
      if (this.books[i].title === book.title && this.books[i].author === book.author) {
        this.books.splice(i, 1);
        this.updateLocalStorage();
        return;
      }
    }
  }

  updateLocalStorage() {
    // Updates the Local Storage
    if (storageAvailable('localStorage')) {
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }
}

// Initialize the Library
const library = new Library();

// Load initially stored data
const localBooksData = localStorage.getItem('books');
if (localBooksData) {
  library.books = JSON.parse(localBooksData);
}

// Books Related HTML Values & Functions
const booksList = document.getElementById('books-list');
const displayNewElement = (book) => {
  // Shows the added book in html
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove';

  bookDiv.innerHTML = `
  <div class="book-store">
    <h2 class="book-title">"${book.title}"</h2>
    <p class="book-author">by ${book.author}</p>
  </div>
  `;
  bookDiv.appendChild(removeButton);

  if (library.books.length === 0) {
    booksList.innerHTML = '';
  }

  booksList.appendChild(bookDiv);

  removeButton.addEventListener('click', () => {
    library.removeBook(book);
    bookDiv.remove();

    if (library.books.length === 0) {
      booksList.innerHTML = `
        <p class="empty-library">No Books in the Library.</p>
      `;
    }
  });
};

// Display all books when the page is loaded
if (library.books.length === 0) {
  booksList.innerHTML = `
        <p class="empty-library">No Books in the Library.</p>
      `;
} else {
  library.books.forEach((book) => {
    displayNewElement(book);
  });
}

// Add Event Listener on Add Book button
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  library.addBook(new Book(addBookForm.elements.title.value, addBookForm.elements.author.value));
});