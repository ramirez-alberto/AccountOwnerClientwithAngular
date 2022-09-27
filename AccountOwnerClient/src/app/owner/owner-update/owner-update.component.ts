import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { Owner } from 'src/app/_interfaces/owner.model';
import { OwnerForUpdate } from 'src/app/_interfaces/ownerForUpdate.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {
  ownerForm: FormGroup;
  modalRef: BsModalRef;
  owner: Owner;

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private route: Router, private modal: BsModalService, private datePipe: DatePipe, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.maxLength(60)]),
      dateOfBirth: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required,Validators.maxLength(100)])
    });

    this.getOwnerToUpdate();
  }

  private getOwnerToUpdate = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/owner/${id}`;

    this.repository.getOwner(apiUrl)
      .subscribe({
        next: (ow: Owner) => {
          this.owner = { ...ow,
          dateOfBirth: new Date(this.datePipe.transform(ow.dateOfBirth,'MM/dd/yyyy'))
        }
        this.ownerForm.patchValue(this.owner);
      },
        error: (error: HttpErrorResponse) => this.errorHandler.handleError(error)  
      });

  }

  validateControl = (controlName: string) => {
    if(this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName : string) => {
    if(this.ownerForm.get(controlName).hasError(errorName))
      return true;

    return false;
  }

  updateOwner = (ownerFormValue) => {
    if(this.ownerForm.valid)
      this.executeUpdateOwner(ownerFormValue);
  }

  private executeUpdateOwner = (ownerFormValue) => {
    const owner: OwnerForUpdate = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth,'yyyy-MM-dd'),
      address: ownerFormValue.address
    };
    const apiUrl = `api/owner/${this.owner.id}`;

    this.repository.updateOwner(apiUrl,owner)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: "Success Message",
            modalBodyText: "Owner updated successfully",
            okButtonText: "OK"
          }
        };
        this.modalRef = this.modal.show(SuccessModalComponent,config);
        this.modalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());
      },
      error: (error: HttpErrorResponse) => this.errorHandler.handleError(error)
    });
    
  }
  redirectToOwnerList = () => {
    this.route.navigate(['/owner/list']);
  }

}
