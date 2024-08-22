import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { User } from './user.types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0;

  constructor(
    private _router: Router,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.loadUsersData();
  }
  
  userDetails(id: number): void {
    this._router.navigate(['user-details/' + id]);
  }

  loadUsersData(page: number = 1): void {
    this.usersService.getUsers(page).subscribe(response => {
      this.users = response.data;
      this.page = page;
      this.totalPages = response.total_pages;
      this.totalUsers = response.total;
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.loadUsersData(this.page + 1);
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.loadUsersData(this.page - 1);
    }
  }

}
