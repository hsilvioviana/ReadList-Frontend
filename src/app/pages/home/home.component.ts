import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { IBook, IBookDividedByYear } from './interfaces/IBookDividedByYear';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['title', 'author', 'releaseYear', 'isFiction', 'genres', 'numberOfPages', 'countryOfOrigin', 'language', 'actions'];
  booksDividedByYear: IBookDividedByYear[] = []
  openYearTables: number[] = []

  constructor(private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBooksDividedByYear()

    this.dialog.afterAllClosed.subscribe(() => {
      this.getBooksDividedByYear() 
    })
  }

  toggleYearTable(index: number)
  {
    if (this.openYearTables.includes(index))
    {
      this.openYearTables.splice(this.openYearTables.indexOf(index), 1)
    }
    else
    {
      this.openYearTables.push(index)
    }
  }

  getBooksDividedByYear()
  {
    this.homeService.getBooksDividedByYear()
    .subscribe(data => {
      this.booksDividedByYear = data
    },
    error => window.alert(error?.error?.message))
  }

  createBook(): void {
    this.dialog.open(AddEditBookComponent, {
      data: {
        dialogType: "add",
        genreList: this.getGenreList()
      }
    });
  }

  editBook(book: IBook): void {
    this.dialog.open(AddEditBookComponent, {
      data: {
        dialogType: "edit",
        book: book,
        genreList: this.getGenreList()
      }
    });
  }

  deleteBook(id: string): void {
    this.homeService.deleteBook(id)
    .subscribe(() => {
      this.getBooksDividedByYear()
    },
    error => window.alert(error?.error?.message))
  }

  getGenreList()
  {
    let genreList: any[] = [];

    for (const year of this.booksDividedByYear)
    {
      for (const book of year.books)
      {
        genreList = genreList.concat(book.genres)
      }
    }

    return [...new Set(genreList)].sort()
  }
}
