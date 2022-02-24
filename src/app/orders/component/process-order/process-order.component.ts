import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidatorsService } from 'src/app/core/services/custom-validators.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  processOrderForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      CustomValidatorsService.nameValidator,
    ]),
    userLastName: new FormControl(''),
    email: new FormControl('', Validators.required),
    phones: new FormArray([new FormControl('')]),
    selfDelivery: new FormControl(false),
    address: new FormControl('', Validators.required),
  });

  validationMessagesMap = new Map<string, string>([
    ['userName', 'Incorrect First Name'],
    ['email', 'Incorrect Email'],
  ]);

  private subscription = new Subscription();

  get phones(): FormArray {
    return this.processOrderForm.get('phones') as FormArray;
  }

  get deliveryMethod(): FormControl {
    return this.processOrderForm.get('selfDelivery') as FormControl;
  }

  get address(): FormControl {
    return this.processOrderForm.get('address') as FormControl;
  }

  ngOnInit(): void {
    this.subscription = this.deliveryMethod.valueChanges.subscribe((value) =>
      this.toggleAddressValidators(value)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValidControl(controlName: string): boolean {
    const control = this.processOrderForm.get(controlName) as FormControl;
    return control.invalid && control.touched;
  }

  onRemovePhoneControl(index: number): void {
    this.phones.removeAt(index);
  }

  onAddPhoneControl(): void {
    this.phones.push(new FormControl(''));
  }

  onSubmit(): void {
    console.log(this.processOrderForm.value);
  }

  private toggleAddressValidators(isSelfDelivery: boolean): void {
    if (isSelfDelivery) {
      this.address.clearValidators();
    } else {
      this.address.setValidators(Validators.required);
    }

    this.address.updateValueAndValidity();
  }
}
