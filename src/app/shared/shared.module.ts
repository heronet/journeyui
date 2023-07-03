import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutosizeDirective } from '../autosize.directive';

@NgModule({
  declarations: [AutosizeDirective],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, AutosizeDirective],
})
export class SharedModule {}
