import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotantesComponent } from './votantes-list.component';

describe('VotantesComponent', () => {
  let component: VotantesComponent;
  let fixture: ComponentFixture<VotantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VotantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
