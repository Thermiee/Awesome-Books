class Book {
  title;
  author;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const books = [];
const booksList = document.getElementById('books-list');

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
    return;
  }
  alert('The Book and Author exist');
}

function removeBook(book) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === book.title && books[i].author === book.author) {
      books.splice(i, 1);
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

