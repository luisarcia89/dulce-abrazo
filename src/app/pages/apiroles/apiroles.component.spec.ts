import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApirolesComponent } from './apiroles.component';

describe('ApirolesComponent', () => {
  let component: ApirolesComponent;
  let fixture: ComponentFixture<ApirolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApirolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApirolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
