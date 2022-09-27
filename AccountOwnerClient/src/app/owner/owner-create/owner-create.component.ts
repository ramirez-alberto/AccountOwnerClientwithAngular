import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { OwnerForCreation } from 'src/app/_interfaces/ownerForCreation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { DatePipe } from '@angular/common';
import { Owner } from 'src/app/_interfaces/owner.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

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

  validateControl = (controlName: string) => {
    if (this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched )
     return true;

    return false;
    }

  hasError = (controlName: string, errorName: string):boolean => {
    if (this.ownerForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createOwner = (ownerFormValue) => {
    if(this.ownerForm.valid)
      this.executeOwnerCreation(ownerFormValue);
  }
  private executeOwnerCreation = (ownerFormValue) => {
    const owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    };
    const apiUrl = 'api/owner';
    this.repository.createOwner(apiUrl,owner)
      .subscribe({
        next: (own: Owner) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText : 'Success Message',
              modalBodyText : `Owner: ${owner.name} created successfully`,
              okButtonText: 'OK'
            }
          };

          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          //subscribe to the redirectOnOk event that we emit from the 
          //    SucessModalComponent once we click the Ok button.
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());

        },
        error: (error: HttpErrorResponse) => { 
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      });
  }

  redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }


}
