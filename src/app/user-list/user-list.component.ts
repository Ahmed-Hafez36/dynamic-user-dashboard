import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { User } from './user.types';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    // fade in and out animation when searching by user id 
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class UserListComponent implements OnInit {
  // table headers instead of manually duplicating headers in html
  tableHeaders: string[] = ['ID', 'Avatar', 'Name'];
  users: User[] = [];
  page: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0;
  searchControl = new FormControl('');
  searchResults: User | null = null;

  constructor(
    private _router: Router,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    // Load user data on initialization of the page/component
    this.loadUsersData();
    
    // call api to get user data when search value change 
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // wait for 300ms pause in events
        distinctUntilChanged(), // ignore if next search term is same as previous
        switchMap((searchTerm: string) => {
          if (searchTerm) {
            const id = parseInt(searchTerm, 10);
            if (!isNaN(id)) {
              return this.usersService.getUserById(id);
            }
          }
          return of(null);
        })
      )
      .subscribe(result => {
        this.searchResults = result;
      });
  }

  // fetching users list data
  loadUsersData(page: number = 1): void {
    this.usersService.getUsers(page).subscribe(response => {
      this.users = response.data;
      this.page = page;
      this.totalPages = response.total_pages;
      this.totalUsers = response.total;
    });
  }

  // next paginated data
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.loadUsersData(this.page + 1);
    }
  }

  // previous paginated data
  prevPage(): void {
    if (this.page > 1) {
      this.loadUsersData(this.page - 1);
    }
  }

  // reroute to user details page
  goToUserDetails(userId: number): void {
    this._router.navigate(['/user-details', userId]);
  }

}
