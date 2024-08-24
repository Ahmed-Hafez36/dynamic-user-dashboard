import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { User } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  domain: string = 'https://reqres.in/'
  apiUrl: string = `${this.domain}api/users`;
  private cache = new Map<number, User[]>(); // Cache for users page
  private userCache = new Map<number, User>(); // Cache for individual user details
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

  getUserById(id: number): Observable<User> {
    if (this.userCache.has(id)) {
      return new Observable(observer => {
        observer.next(this.userCache.get(id) as User);
        observer.complete();
      });
    } else {
      return this._httpClient.get<{ data: User }>(`${this.apiUrl}/${id}`).pipe(
        map(response => response.data),
        tap(user => this.userCache.set(id, user)),
      );
    }
  }
}
