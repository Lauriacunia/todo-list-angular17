import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';
import { LabsComponent } from './pages/labs/labs.component.js';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'labs',
    component: LabsComponent,
  },
];
