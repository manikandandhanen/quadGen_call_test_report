import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ImageConverterComponent } from 'src/app/components/image-converter/image-converter.component';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [MaterialModule, ImageConverterComponent],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {}
