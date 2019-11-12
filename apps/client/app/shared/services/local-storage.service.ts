import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private ls: Storage;

  constructor() {
    this.ls = window.localStorage;
  }

  public clear(): void {
    this.ls.clear();
  }

  public setItem(key: string, data: any): void {
    const value = data.toString();
    this.ls.setItem(key, value);
  }

  public getItem(key: string): any {
    try {
      return this.ls.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }

  public removeItem(key: string) {
    this.ls.removeItem(key);
  }

}
