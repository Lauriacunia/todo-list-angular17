import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.models.js';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Estudiar Angular',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Ver clase de Signal',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Terminar proyecto TODO list',
      completed: true,
    },
  ]);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  changeHandler(event: Event) {
    // cuando usamos el evento change, el input ya tiene el valor
    const input = event.target as HTMLInputElement;
    const title = input.value;
    this.addTask(title);
  }
  changeHandler2() {
    // cuando usamos FormControl, el input no tiene el valor, sino que está en el FormControl
    if (this.newTaskControl.invalid) return;
    const title = this.newTaskControl.value.trim();
    if (title === '') return;
    this.addTask(title);
    this.newTaskControl.reset();
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }

  deleteTask(index: Number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position != index)
    );
  }
}
