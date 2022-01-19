import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator';

export const GENERATED_STRING = new InjectionToken<string>('Generated String');

export function GeneratorFactory(
  n: number
): (generator: GeneratorService) => string {
  return (generator: GeneratorService): string => generator.generate(n);
}
