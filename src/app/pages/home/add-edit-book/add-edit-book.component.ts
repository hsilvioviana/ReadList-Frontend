import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Helpers } from 'src/app/shared/utils/helpers';
import { msg } from 'src/app/shared/utils/msg';
import { HomeService } from '../services/home.service';



@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent implements OnInit{

  helpers = Helpers;
  msg = msg;

  genreList: string[] = []
  selectedGenres = new FormControl('');
  newGenre = new FormControl<string>('');

  constructor(
    private homeService: HomeService,
    public dialogRef: MatDialogRef<AddEditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {}

    ngOnInit(): void {
      this.genreList = this.data.genreList
      this.genreList.sort((a, b) => a.localeCompare(b))

      if (this.data.dialogType == "edit")
      {
        this.bookForm.setValue({
          title: this.data.book.title,
          author: this.data.book.author,
          releaseYear: this.data.book.releaseYear,
          readingYear: this.data.book.readingYear,
          isFiction: this.data.book.isFiction,
          genres: this.data.book.genres,
          numberOfPages: this.data.book.numberOfPages,
          countryOfOrigin: this.data.book.countryOfOrigin,
          language: this.data.book.language
        });
      }
    }

  bookForm: FormGroup = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    author: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    releaseYear: ["", [Validators.required, Validators.min(1), Validators.max(10000)]],
    readingYear: ["", [Validators.required, Validators.min(1), Validators.max(10000)]],
    isFiction: [false],
    genres: [[""], [Validators.required]],
    numberOfPages: ["", [Validators.required, Validators.min(1), Validators.max(100000)]],
    countryOfOrigin: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    language: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  })

  restrictNumbersOnly(event: any, fromGroupKey: string) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.key);

    if (!pattern.test(inputChar)) {
      this.bookForm.controls[fromGroupKey].patchValue(String(Number(this.bookForm.value[fromGroupKey].replace(/[^\d.-]/g,''))))
    }
  }

  createGenre()
  {
    const newGenre = this.newGenre.value as string
    if (newGenre != null && newGenre.length >= 3 && newGenre.length <= 30) 
    {
      this.genreList.push(newGenre as string)
      this.genreList.sort((a, b) => a.localeCompare(b))
      this.newGenre.reset()
    }
  }

  createBook()
  {
    this.homeService.createBook(this.bookForm.value)
      .subscribe(() => {
        this.dialogRef.close();
      },
      error => window.alert(error?.error?.message))
  }

  editBook()
  {
    const updatedBook = {id: this.data.book.id, ...this.bookForm.value }
    this.homeService.editBook(updatedBook)
      .subscribe(() => {
        this.dialogRef.close();
      },
      error => window.alert(error?.error?.message))
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
