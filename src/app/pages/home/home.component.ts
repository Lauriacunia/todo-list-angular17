import {
  Component,
  Inject,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Task } from '../../models/task.models.js';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksFiltered = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });
  injector = inject(Injector);

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      console.log('listen tasks', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

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

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position != index)
    );
  }

  openEdit(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  updateTaskTitle(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const title = input.value.trim();
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
