import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksoComponent } from './bookso.component';

describe('BooksoComponent', () => {
  let component: BooksoComponent;
  let fixture: ComponentFixture<BooksoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
