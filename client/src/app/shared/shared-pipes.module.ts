import { ReplaceSpaces } from '../core/pipes/replace-spaces.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from '../core/pipes/sum-prices.pipe';

@NgModule({
  declarations: [
    ReplaceSpaces,
    SumPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReplaceSpaces,
    SumPipe,
  ]
})
export class SharedPipesModule { }
