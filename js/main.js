class Book {
  title;
  author;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const books = [];

function addBook(title, author) {
  books.push(new Book(title, author));
}

function removeBook(book) {
  for (let i=0; i<books.length; i++) {
    if (books[i].title === book.title && books[i].author === book.author) {
      books.splice(i, 1);
      return;
    }
  }
}