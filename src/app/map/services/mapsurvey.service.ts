import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyEntity } from '../api/map.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapSurveyService {

  private baseURL = 'backend/submit_data.php';
  
  constructor(private http: HttpClient) { }

  
  addEntry(entry: SurveyEntity): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(entry);
    return this.http.post(this.baseURL, body,{'headers':headers});
  }
 
}
