import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
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
  name = 'Lau';
  isDisabled = false;
  image = 'https://cataas.com/cat';

  catName = signal('Pipi');

  showAlert() {
    alert('Hola!');
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
    this.catName.set('Kira');
    //console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
