import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { OwnerForDelete } from 'src/app/_interfaces/ownerForDelete.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css']
})
export class OwnerDeleteComponent implements OnInit {
  bsModalRef: BsModalRef;
  owner: OwnerForDelete;

  constructor(private repository: OwnerRepositoryService, private handleError: ErrorHandlerService,
    private modal: BsModalService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  private getOwnerDetails = () => {
    const ownerId = this.activatedRoute.snapshot.params['id'];
    const apiUrl = `api/owner/${ownerId}`;

    const owner = this.repository.getOwner(apiUrl)
      .subscribe({
        next: (own: OwnerForDelete) => {
          this.owner = own;
        },
        error: (error: HttpErrorResponse) => this.handleError.handleError(error)
      });
  }

  deleteOwner = () => {
    const apiUrl = `api/owner/delete/${this.owner.id}`;
    this.repository.deleteOwner(apiUrl)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: "Success Message",
            modalBodyText: "Owner deleted successfully.",
            okButtonText: "OK"
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());
      },
      error: (error: HttpErrorResponse) => this.handleError.handleError(error)
    })
  }

  redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

}
