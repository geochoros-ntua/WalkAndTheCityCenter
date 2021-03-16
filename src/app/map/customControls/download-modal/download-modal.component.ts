import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent implements OnInit {
  isLinear = false;
  acceptDisclaimer: FormGroup;
  personalDetails: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<DownloadModalComponent>) { }
    

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.acceptDisclaimer = this._formBuilder.group({
      acceptDisclaimerCtrl: [false, Validators.required]
    });
    this.personalDetails = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      organisation: [''],
      country: [''],
      city: ['', Validators.required],
      age: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  goForward(stepper: MatStepper ,event: any){
    if (event.checked){
      stepper.next();
    }
  }

}
