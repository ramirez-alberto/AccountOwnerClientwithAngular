import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { OwnerForCreation } from 'src/app/_interfaces/ownerForCreation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {
  errorMessage: string = '';
  ownerForm : FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService
    ,private router: Router,private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.maxLength(60)]),
      dateOfBirth : new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required,Validators.maxLength(100)])
    });
  }

  validateControl = (value:string) => { return true;}
  hasError = (property: string, validation : string):boolean => {return true;}
  redirectToOwnerList = () => {}
  createOwner = (owner : OwnerForCreation) => {}
}
