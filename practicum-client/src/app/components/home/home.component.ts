import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(1000)
      ])
    ]),
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent {
  fadeInAnimationState = 'fadeIn';
  navbarExpanded = false;

  toggleNavbar() {
    this.navbarExpanded = !this.navbarExpanded;
  }

  onViewEmployees() {
    // Add your logic here for when the "View All Employees" button is clicked
  }
}
