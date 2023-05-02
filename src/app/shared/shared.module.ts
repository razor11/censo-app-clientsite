import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from 'src/app/core/pipes/gender.pipe';
import { AvatarPipe } from 'src/app/core/pipes/avatar.pipe';
import { MunicipiosPipe } from 'src/app/core/pipes/municipios.pipe';
import { IDstatusPipe } from 'src/app/core/pipes/idstatus.pipe';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [GenderPipe, AvatarPipe, MunicipiosPipe, IDstatusPipe, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenderPipe,
    SpinnerComponent,
    AvatarPipe,
    MunicipiosPipe,
    IDstatusPipe,
    MaterialModule
  ]
})
export class SharedModule { }
