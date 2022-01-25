import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import {
    CONSTANTS, ConstantsService, ConstantsServiceType
} from 'src/app/core/services/constant.service';
import { GeneratorService } from 'src/app/core/services/generator';
import { GENERATED_STRING, GeneratorFactory } from 'src/app/core/services/generator.factory';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { ChangeDetectionStrategy, Component, Inject, Input, Optional, Self } from '@angular/core';

import { Category } from '../../models/product.model';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss', '../../../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ConfigOptionsService,
    GeneratorService,
    { provide: CONSTANTS, useValue: ConstantsService },
    { provide: LocalStorageService, useValue: window.localStorage },
    {
      provide: GENERATED_STRING,
      useFactory: GeneratorFactory(14),
      deps: [GeneratorService],
    },
  ],
})
export class FirstComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() price: string | null = null;
  @Input() category!: Category;
  @Input() isAvailable!: boolean;

  constructor(
    @Self()
    @Optional()
    private configOptionsService: ConfigOptionsService,
    @Self()
    @Optional()
    private generatorService: GeneratorService,
    @Inject(CONSTANTS)
    @Self()
    @Optional()
    private constantsService: ConstantsServiceType,
    @Inject(GENERATED_STRING)
    @Self()
    @Optional()
    private generatedString: string,
    @Inject(LocalStorageService)
    @Self()
    @Optional()
    private localStorageService: LocalStorageService
  ) {}

  getProductStatus(): string {
    console.log('ConfigOptionsService', this.configOptionsService.getConfig());

    console.log('GeneratorService', this.generatorService.getNewID());

    console.log('ConstantsService', this.constantsService);

    console.log('GeneratedString', this.generatedString);

    this.localStorageService.setItem('test', 'Test value');

    console.log(
      'LocalStorageService',
      this.localStorageService.getItem('test')
    );

    return this.isAvailable ? 'Yes' : 'No';
  }
}
