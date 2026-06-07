import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciASenhaComponent } from './esqueci-a-senha.component';

describe('EsqueciASenhaComponent', () => {
  let component: EsqueciASenhaComponent;
  let fixture: ComponentFixture<EsqueciASenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsqueciASenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsqueciASenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
