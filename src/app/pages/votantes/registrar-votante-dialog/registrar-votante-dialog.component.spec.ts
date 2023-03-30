import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVotanteDialogComponent } from './registrar-votante-dialog.component';

describe('RegistrarVotanteDialogComponent', () => {
  let component: RegistrarVotanteDialogComponent;
  let fixture: ComponentFixture<RegistrarVotanteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarVotanteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarVotanteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
