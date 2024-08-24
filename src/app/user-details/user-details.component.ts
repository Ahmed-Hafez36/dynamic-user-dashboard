import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../user-list/users.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

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
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.usersService.getUserById(userId).subscribe(user => {
      console.log('response: ', user);
      this.user = user;
      console.log('this.user: ', this.user);
    });
  }

  goBack(): void {
    this.router.navigate(['/user-list']);
  }

}
