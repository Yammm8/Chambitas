import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTrabajoComponent } from './editar-trabajo';

describe('EditarTrabajoComponent', () => {
  let component: EditarTrabajoComponent;
  let fixture: ComponentFixture<EditarTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTrabajoComponent], // es standalone
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
