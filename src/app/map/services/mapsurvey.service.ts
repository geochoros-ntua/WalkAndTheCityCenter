import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurveyEntity } from '../api/map.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapSurveyService {

  private baseURL = 'backend/submit_data.php';
  private dataDownloadUrl ='https://github.com/geochoros-ntua/WalkAndTheCityCenter/raw/main/src/assets/geodata/walk_datahub_all_cities.zip'
  
  
  constructor(private http: HttpClient) { }

  /**
   * Insert the entry
   * @param entry 
   * @returns 
   */
  addEntry(entry: SurveyEntity): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(entry);
    return this.http.post(this.baseURL, body,{'headers':headers});
  }

  /**
   * Quick and dirty download.
   */
  downloadFile(): void{
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = this.dataDownloadUrl;
      a.download = 'walk_datahub_all_cities.zip'
      a.click();
      document.body.removeChild(a);
  }
 
}
