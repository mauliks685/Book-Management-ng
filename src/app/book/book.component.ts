import { Component } from '@angular/core';
import { Books } from '../models/book.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{

  ngOnInit(): void {

   let savedBooks = localStorage.getItem("Books")
   this.books = savedBooks ?  JSON.parse(savedBooks) : []
  }

  newBookTitle: string = "";
  newBookAuthor: string = "";
  editBookIndex: number | null = null;

  books: Books[] = []

  addBook() {

    if(this.newBookTitle.trim().length && this.newBookAuthor.trim().length) {
      let newBook : Books = {
        id: Date.now(),
        title: this.newBookTitle,
        author: this.newBookAuthor
      }
      this.books.push(newBook)
      this.newBookTitle = "";
      this.newBookAuthor= "";
      localStorage.setItem("Books", JSON.stringify(this.books));
    }
  }

  deleteBook(index: number) {
    this.books.splice(index,1);
    localStorage.setItem("Books", JSON.stringify(this.books))
  }

  editBook(index: number) {
    this.newBookTitle = this.books[index].title;
    this.newBookAuthor = this.books[index].author
    this.editBookIndex = index;
  }

  updateBook() {
    if(this.editBookIndex !== null) {
      this.books[this.editBookIndex].title = this.newBookTitle;
      this.books[this.editBookIndex].author = this.newBookAuthor;
      localStorage.setItem("Books", JSON.stringify(this.books))
      this.newBookTitle = "";
      this.newBookAuthor= "";
      this.editBookIndex = null;
    }
  }

}
