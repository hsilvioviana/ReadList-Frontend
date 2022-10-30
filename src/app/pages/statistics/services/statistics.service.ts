import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBook } from '../interfaces/IBook';
import { IStatistics } from '../interfaces/IStatistics';
import { IStatisticsFilter } from '../interfaces/IStatisticsFilter';
import { IStatisticsResume } from '../interfaces/IStatisticsResume';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl

  getStatisticsResume(filter: IStatisticsFilter) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const params = this.createFilterParams(filter)

    return this.http.get<IStatisticsResume>(`${this.baseUrl}/statistics/resume${params}`, { headers })
  }

  getStatisticsBooksDividedByKey(key: string, filter: IStatisticsFilter) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const params = this.createFilterParams(filter)

    return this.http.get<IStatistics[]>(`${this.baseUrl}/statistics/${key}${params}`, { headers })
  }

  getStatisticsBooks(key: string, filter: IStatisticsFilter) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const params = this.createFilterParams(filter)

    return this.http.get<IBook[]>(`${this.baseUrl}/statistics/${key}${params}`, { headers })
  }

  createFilterParams(filter: IStatisticsFilter): string
  {
    if (filter.startDate && filter.endDate)
    {
      return `?StartDate=${filter.startDate}&EndDate=${filter.endDate}`
    }
    if (filter.startDate)
    {
      return `?StartDate=${filter.startDate}`
    }
    if (filter.endDate)
    {
      return `?EndDate=${filter.endDate}`
    }
    else 
    {
      return ""
    }
  }
}
