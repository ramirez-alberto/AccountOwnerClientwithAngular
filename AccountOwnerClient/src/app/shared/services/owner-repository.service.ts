import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { Owner } from 'src/app/_interfaces/owner.model';
import { OwnerForCreation } from 'src/app/_interfaces/ownerForCreation.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerRepositoryService {

  constructor(private http: HttpClient, private environmenUrl: EnvironmentUrlService) { }

  /**
   * GetOwners
   */
  public GetOwners = (route: string) => {
    return this.http.get<Owner[]>(this.createCompleteRoute(route,this.environmenUrl.urlAddress));
  }
  public getOwner = (route: string) =>{
    return this.http.get<Owner>(this.createCompleteRoute(route,this.environmenUrl.urlAddress));
  }
  public createOwner = (route: string,owner: OwnerForCreation) => {
    return this.http.post<Owner>(this.createCompleteRoute(route,this.environmenUrl.urlAddress),
      owner,this.generateHeaders());
  }
  public updateOwner = (route: string, owner: Owner) => {
    return this.http.put(this.createCompleteRoute(route,this.environmenUrl.urlAddress),owner,this.generateHeaders());
  }
  public deleteOwner = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route,this.environmenUrl.urlAddress));
  }

  private createCompleteRoute(route: string, envAddress: string){
    return `${envAddress}/${route}`;
  } 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

}