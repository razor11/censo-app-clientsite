import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVotanteComponent } from './detalle-votante.component';

describe('DetalleVotanteComponent', () => {
  let component: DetalleVotanteComponent;
  let fixture: ComponentFixture<DetalleVotanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleVotanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
