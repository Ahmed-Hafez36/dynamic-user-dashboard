import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../user-list/users.service';
import { User } from '../user-list/user.types';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, 
    private usersService: UsersService, 
    private router: Router) {}

  ngOnInit(): void {
    // get user id from route params and fetching user data
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.usersService.getUserById(userId).subscribe(user => {
      console.log('response: ', user);
      this.user = user;
      console.log('this.user: ', this.user);
    });
  }

  // navigating back to users list
  goBack(): void {
    this.router.navigate(['/user-list']);
  }

}
