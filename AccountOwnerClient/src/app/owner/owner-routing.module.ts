import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { OwnerDeleteComponent } from './owner-delete/owner-delete.component';

const routes: Routes = [
  {path: "list",component:OwnerListComponent},
  {path: "details/:id", component:OwnerDetailsComponent},
  {path: "create", component:OwnerCreateComponent},
  {path: "update/:id", component:OwnerCreateComponent},
  {path: "delete/:id", component:OwnerDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
