import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { SurveyDataObject, SurveyEntity } from '../../api/map.interfaces';
import { MapSurveyService } from '../../services/mapsurvey.service';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent implements OnInit {
  acceptDisclaimer: FormGroup;
  personalDetails: FormGroup;
  survey: FormGroup;
  isAccepted: boolean;

  surveyDataObjects: SurveyDataObject[] = [{
    quest: 'Satisfaction with living in the city',
    cntrlName:'citySatisfaction',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q1'
  }, {
    quest: 'Air quality in your city',
    cntrlName:'airQuality',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q2'
  }, {
    quest: 'Noise quality in your city',
    cntrlName:'noiseQuality',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q3'
  }, {
    quest: 'Public transport in your city',
    cntrlName:'transoprtQuality', 
    answerVals: [1,2,3,4,5],
    dbfield: 'Q4'
  }, {
    quest: 'Accessibility for the disabled in your city',
    cntrlName:'accessDisabled',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q5'
  }, {
    quest: 'Public spaces in your city',
    cntrlName:'publicSpaces',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q6'
  }, {
    quest: 'Cleanliness in your city',
    cntrlName:'cleanliness',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q7'
  }, {
    quest: 'Crime Safety in your city',
    cntrlName:'crimeSafety',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q8'
  }, {
    quest: 'Traffic Safety in your city',
    cntrlName:'trafficSafety',
    answerVals: [1,2,3,4,5],
    dbfield: 'Q9'
  }]
  
  constructor(
    private _formBuilder: FormBuilder,
    private mapSurveyService: MapSurveyService,
    public dialogRef: MatDialogRef<DownloadModalComponent>) { }
    

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

    this.survey = this._formBuilder.group({
      citySatisfaction: [null, Validators.required],
      airQuality: [null, Validators.required],
      noiseQuality: [null, Validators.required],
      transoprtQuality: [null, Validators.required],
      accessDisabled: [null, Validators.required],
      publicSpaces: [null, Validators.required],
      cleanliness: [null, Validators.required],
      crimeSafety: [null, Validators.required],
      trafficSafety: [null, Validators.required]
    });
  }

  public accept(stepper: MatStepper ): void {
    this.isAccepted = true;
    // bit of ugly  
    setTimeout(() => {          
      stepper.next();
      }, 1);
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public sendSurveyData(){
    const presonalDetails = this.personalDetails.getRawValue();
    const survey = this.survey.getRawValue();
    let mappedSurvey = {};
    for (let key of Object.keys(survey)) {
      const dbField = this.surveyDataObjects.find( data => data.cntrlName === key).dbfield;
      mappedSurvey[dbField] = survey[key];
    } 
    const entry: SurveyEntity = {
      ...presonalDetails, 
      ...mappedSurvey
    };
    
    this.mapSurveyService.addEntry(entry)
      .subscribe(data => {
        this.mapSurveyService.downloadFile();
      })
  }

}
