import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWindowComponent } from './create-window.component';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateWindowComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CreateWindowComponent]
})
export class CreateWindowModule { }
