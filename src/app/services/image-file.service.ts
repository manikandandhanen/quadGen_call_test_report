import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageFileService {
  private files: File[] = [];

  addFile(file: File) {
    this.files.push(file);
  }

  getFile(filename: string): File | undefined {
    return this.files.find((f) => f.name === filename);
  }

  constructor() {}
}
