import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarRequestsComponent } from './gerenciar-requests.component';

describe('GerenciarRequestsComponent', () => {
  let component: GerenciarRequestsComponent;
  let fixture: ComponentFixture<GerenciarRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
