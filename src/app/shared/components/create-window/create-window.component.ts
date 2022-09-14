import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../interfaces';
import { TodosService } from '../../services/todos.servics';

@Component({
  selector: 'app-create-window',
  templateUrl: './create-window.component.html',
  styleUrls: ['./create-window.component.scss']
})
export class CreateWindowComponent implements OnInit {

  createForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateWindowComponent>,
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    })
  }

  addTodo() {
    if (this.createForm.invalid) {
      return
    }

    const todo: Todo = {
      subtitle: 'Active',
      status: true,
      title: this.createForm.value.title,
      text: this.createForm.value.text
    }

    this.todosService.create(todo).subscribe(() => {
      this.createForm.reset()
    })

  }

  close() {
    this.dialogRef.close()
  }

}
