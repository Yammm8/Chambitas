import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTrabajo } from './editar-trabajo';

describe('EditarTrabajo', () => {
  let component: EditarTrabajo;
  let fixture: ComponentFixture<EditarTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTrabajo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTrabajo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
