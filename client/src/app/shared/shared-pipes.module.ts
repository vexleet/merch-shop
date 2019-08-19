import { ReplaceSpaces } from '../core/pipes/replace-spaces.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from '../core/pipes/sum-prices.pipe';
import { GetFirstImagePipe } from '../core/pipes/get-first-image.pipe';

@NgModule({
  declarations: [
    ReplaceSpaces,
    SumPipe,
    GetFirstImagePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReplaceSpaces,
    SumPipe,
    GetFirstImagePipe
  ]
})
export class SharedPipesModule { }
