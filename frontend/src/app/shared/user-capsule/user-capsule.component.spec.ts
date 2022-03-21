import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCapsuleComponent } from './user-capsule.component';

describe('UserCapsuleComponent', () => {
  let component: UserCapsuleComponent;
  let fixture: ComponentFixture<UserCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCapsuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
