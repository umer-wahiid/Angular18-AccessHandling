import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_services/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { menu } from '../../_model/user.model';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit {

  constructor(private service: UserService, private router: Router) {

  }

  menulist!: menu[]

  ngOnInit(): void {
    let userrole = localStorage.getItem('userrole') as string;
    this.service.Loadmenubyrole(userrole).subscribe(item => {
      this.menulist = item;
    })
  }

}
