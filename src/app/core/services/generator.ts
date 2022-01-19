import { Injectable } from '@angular/core';
import { genId } from './gen-id.generator';

@Injectable()
export class GeneratorService {
  private symbols: string =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
  private symbolsLength: number = this.symbols.length;

  constructor() {}

  generate(n: number, result = ''): string {
    const randomNumberFrom0To62 = Math.floor(
      Math.random() * this.symbolsLength
    );

    result += this.symbols[randomNumberFrom0To62];

    if (result.length < n) {
      return this.generate(n, result);
    }

    return result;
  }

  getNewID(): number {
    return genId();
  }
}
