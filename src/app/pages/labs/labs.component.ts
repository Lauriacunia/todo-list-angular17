
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'The Hobbit';
  movies = signal([
    'Un viaje inesperado',
    'La desolación de Smaug',
    'La batalla de los Cinco Ejércitos',
  ]);
  name = signal('Lau');
  isDisabled = false;
  image = 'https://cataas.com/cat';

  catName = signal('Pipi');

  colorCtl = new FormControl();
  widthCtl = new FormControl(100);
  nameCtl = new FormControl('Lau', {
    validators: [Validators.required, Validators.minLength(3)],
  });

  constructor() {
    this.colorCtl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  showAlert() {
    alert('Hola Angular 17!');
  }

  setCatName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.catName.set(input.value);
  }

  setName(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }
}
