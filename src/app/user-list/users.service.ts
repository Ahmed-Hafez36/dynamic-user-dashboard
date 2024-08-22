import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  domain: string = 'https://reqres.in/'
  apiUrl: string = `${this.domain}api/users`;
  private cache = new Map<number, User[]>();
  private totalPages: number = 1;
  private totalUsers: number = 0;

  constructor(private _httpClient: HttpClient) { }

  getUsers(page: number): Observable<{ data: User[], total_pages: number, total: number }> {
    if (this.cache.has(page)) {
      // Return cached data
      return of({ data: this.cache.get(page) as User[], total_pages: this.totalPages, total: this.totalUsers });
    } else {
      // Fetch data from API and cache it
      return this._httpClient.get<{ data: User[], total_pages: number, total: number }>(`${this.apiUrl}?page=${page}`).pipe(
        tap(response => {
          this.cache.set(page, response.data);
          this.totalPages = response.total_pages;
          this.totalUsers = response.total;
        })
      );
    }
  }

}
