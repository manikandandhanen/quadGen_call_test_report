import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ImageFileService } from 'src/app/services/image-file.service';
import { CommonModule } from '@angular/common';
import { createWorker, Worker } from 'tesseract.js';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-image-converter',
  standalone: true,
  imports: [
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './image-converter.component.html',
  styleUrls: ['./image-converter.component.scss'],
})
export class ImageConverterComponent {
  callTestForm: FormGroup;

  attachedAlphaFiles: Array<{
    name: string;
    originalName: string;
    size: string;
  }> = [];
  attachedBetaFiles: Array<{
    name: string;
    originalName: string;
    size: string;
  }> = [];
  attachedGammaFiles: Array<{
    name: string;
    originalName: string;
    size: string;
  }> = [];

  attachedTextFiles: Array<{
    name: string;
    originalName: string;
    size: string;
  }> = [];

  constructor(
    private imageFileService: ImageFileService,
    private fb: FormBuilder
  ) {
    this.callTestFormGroup();
  }

  async onAlphaFileChange(event: any) {
    for (let rawFile of event.target.files) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        const ocrText = await this.performOCR(base64String);
        this.storeImageData(rawFile.name, ocrText);
      };
      reader.readAsDataURL(rawFile);

      let size = this.formatFileSize(rawFile.size);
      let truncatedName = this.truncateFileName(rawFile.name, 30);
      let file = {
        originalName: rawFile.name,
        name: truncatedName,
        size: size,
      };
      this.attachedAlphaFiles.push(file);
      this.imageFileService.addFile(rawFile);
    }
  }

  async onBetaFileChange(event: any) {
    for (let rawFile of event.target.files) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        const ocrText = await this.performOCR(base64String);
        this.storeImageData(rawFile.name, ocrText);
      };
      reader.readAsDataURL(rawFile);

      let size = this.formatFileSize(rawFile.size);
      let truncatedName = this.truncateFileName(rawFile.name, 30);
      let file = {
        originalName: rawFile.name,
        name: truncatedName,
        size: size,
      };
      this.attachedBetaFiles.push(file);
      this.imageFileService.addFile(rawFile);
    }
  }

  async onGammaFileChange(event: any) {
    for (let rawFile of event.target.files) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        const ocrText = await this.performOCR(base64String);
        this.storeImageData(rawFile.name, ocrText);
      };
      reader.readAsDataURL(rawFile);

      let size = this.formatFileSize(rawFile.size);
      let truncatedName = this.truncateFileName(rawFile.name, 30);
      let file = {
        originalName: rawFile.name,
        name: truncatedName,
        size: size,
      };
      this.attachedGammaFiles.push(file);
      this.imageFileService.addFile(rawFile);
    }
  }

  async onTextFileChange(event: any) {
    for (let rawFile of event.target.files) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        const ocrText = await this.performOCR(base64String);
        this.storeImageData(rawFile.name, ocrText);
      };
      reader.readAsDataURL(rawFile);

      let size = this.formatFileSize(rawFile.size);
      let truncatedName = this.truncateFileName(rawFile.name, 30);
      let file = {
        originalName: rawFile.name,
        name: truncatedName,
        size: size,
      };
      this.attachedTextFiles.push(file);
      this.imageFileService.addFile(rawFile);
    }
  }

  storeImageData(fileName: string, ocrText: string) {}

  truncateFileName(name: string, limit: number = 30): string {
    return name.length > limit ? `${name.substring(0, limit)}...` : name;
  }

  formatFileSize(sizeInBytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.max(
      0,
      parseInt(
        Math.floor(Math.log(sizeInBytes) / Math.log(1024)).toString(),
        10
      )
    );
    return `${Math.round(sizeInBytes / Math.pow(1024, i))} ${sizes[i]}`;
  }

  downloadFile(originalName: string) {
    const fileToDownload = this.imageFileService.getFile(originalName);
    if (fileToDownload) {
      const blobURL = URL.createObjectURL(fileToDownload);
      const anchor = document.createElement('a');
      anchor.href = blobURL;
      anchor.download = originalName;
      anchor.click();
      URL.revokeObjectURL(blobURL);
    }
  }

  removeAttachment(
    fileArray: Array<{ name: string; originalName: string; size: string }>,
    filename: string
  ) {
    const index = fileArray.findIndex((file) => file.name === filename);
    if (index > -1) {
      fileArray.splice(index, 1);
    }
  }

  async performOCR(imageBase64: string): Promise<string> {
    const worker: Worker = await createWorker();
    await worker.load();
    await worker.reinitialize('eng');
    const { data } = await worker.recognize(imageBase64);
    await worker.terminate();
    return data.text;
  }

  onDownloadExcelFile() {
    if (this.callTestForm.invalid) {
      this.callTestForm.markAllAsTouched();
      return;
    }
    const callTestData = this.callTestForm.value;
    console.log(callTestData);
    //this.callTestForm.reset();
  }

  callTestFormGroup() {
    this.callTestForm = this.fb.group({
      ueNumber: ['', [Validators.required]],
      siteName: ['', [Validators.required]],
      siteId: ['', [Validators.required]],
    });
  }
}
