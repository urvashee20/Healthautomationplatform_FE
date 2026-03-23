import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDto } from '../models/profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/Profile`;

  constructor(private http: HttpClient) {}

  createProfile(profile: UserProfileDto): Observable<any> {
    return this.http.post(this.apiUrl, profile, { responseType: 'text' });
  }

  updateProfile(profile: UserProfileDto): Observable<any> {
    return this.http.put(this.apiUrl, profile, { responseType: 'text' });
  }
}
