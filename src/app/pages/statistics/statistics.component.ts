import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBook } from './interfaces/IBook';
import { IStatistics } from './interfaces/IStatistics';
import { StatisticsService } from './services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  openTable: string = ""
  openSubGroupTables: number[] = []
  statisticsHeaders: string[][] = []
  booksByKey: IStatistics[]  = []
  bookList: IBook[]  = []
  themesDividedByKeys = ["yearsWithMoreBooks", "mostReadAuthors", "mostReadTypes", "mostReadGenres", "mostReadCountries", "mostReadLanguages"]
  themesWithSimpleList = ["oldestBooks", "biggestBooks"]
  displayedColumns: string[] = ['title', 'author', 'releaseYear', 'isFiction', 'genres', 'numberOfPages', 'countryOfOrigin', 'language'];

  constructor(private fb: FormBuilder, private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getStatisticsResume()
  }

  statisticsForm: FormGroup = this.fb.group({
    startDate: [null, []],
    endDate: [null, []]
  })

  toggleStatisticsTable(key: string)
  {
    this.openTable = this.openTable == key ? "" : key;

    this.openSubGroupTables = []

    this.getStatisticsFromKey(key)
  }

  applyFilters()
  {
    this.openTable = ""
    this.openSubGroupTables = []
    this.statisticsHeaders = []
    this.booksByKey = []
    this.bookList = []

    this.getStatisticsResume()
  }

  toggleSubGroupTable(index: number)
  {
    if (this.openSubGroupTables.includes(index))
    {
      this.openSubGroupTables.splice(this.openSubGroupTables.indexOf(index), 1)
    }
    else
    {
      this.openSubGroupTables.push(index)
    }
  }

  getStatisticsResume()
  {
    this.statisticsService.getStatisticsResume({ startDate: this.statisticsForm.controls['startDate'].value, endDate: this.statisticsForm.controls['endDate'].value })
    .subscribe(data => {
      this.statisticsHeaders = Object.entries(data);
    },
    error => window.alert(error?.error?.message))
  }

  getStatisticsFromKey(key: string)
  {
    let urlKey = ""

    switch(key)
    {
      case "yearsWithMoreBooks":
        urlKey = "years-with-more-books"
        break
      case "mostReadAuthors":
        urlKey = "most-read-authors"
        break
      case "mostReadTypes":
        urlKey = "most-read-types"
        break
      case "mostReadGenres":
        urlKey = "most-read-genres"
        break
      case "mostReadCountries":
        urlKey = "most-read-countries"
        break
      case "mostReadLanguages":
        urlKey = "most-read-languages"
        break
      case "oldestBooks":
        urlKey = "oldest-books"
        break
      case "biggestBooks":
        urlKey = "biggest-books"
        break
      default:
        urlKey = ""
    }

    if (this.themesDividedByKeys.includes(key)) {
      this.statisticsService.getStatisticsBooksDividedByKey(urlKey, { startDate: this.statisticsForm.controls['startDate'].value, endDate: this.statisticsForm.controls['endDate'].value })
      .subscribe(data => {
        this.booksByKey = data;
      },
      error => window.alert(error?.error?.message))
    }
    else {
      this.statisticsService.getStatisticsBooks(urlKey, { startDate: this.statisticsForm.controls['startDate'].value, endDate: this.statisticsForm.controls['endDate'].value })
      .subscribe(data => {
        this.bookList = data;
      },
      error => window.alert(error?.error?.message))
    }
  }

  formatHeader(key: string): string
  {
    switch(key)
    {
      case "yearsWithMoreBooks":
        return "Anos com mais livros"
      case "mostReadAuthors":
        return "Autores mais lidos"
      case "mostReadTypes":
        return "Tipos de livros mais lidos"
      case "mostReadGenres":
        return "Gêneros mais lidos"
      case "mostReadCountries":
        return "Países mais lidos"
      case "mostReadLanguages":
        return "Idiomas mais lidos"
      case "oldestBooks":
        return "Livros mais antigos"
      case "biggestBooks":
        return "Maiores livros"
      default:
        return ""
    }
  }

  restrictNumbersOnly(event: any, fromGroupKey: string) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.key);
    if (!pattern.test(inputChar)) {
      this.statisticsForm.controls[fromGroupKey].patchValue(this.statisticsForm.value[fromGroupKey].replace(/[^\d.-]/g,''))
    }
  }
}
