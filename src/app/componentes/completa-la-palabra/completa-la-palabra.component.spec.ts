import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletaLaPalabraComponent } from './completa-la-palabra.component';

describe('CompletaLaPalabraComponent', () => {
  let component: CompletaLaPalabraComponent;
  let fixture: ComponentFixture<CompletaLaPalabraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletaLaPalabraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletaLaPalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
