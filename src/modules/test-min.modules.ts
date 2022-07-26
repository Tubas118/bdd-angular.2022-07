import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class TestMinModule { }
