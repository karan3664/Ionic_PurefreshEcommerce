import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewFilterPagePage } from './new-filter-page.page';

describe('NewFilterPagePage', () => {
  let component: NewFilterPagePage;
  let fixture: ComponentFixture<NewFilterPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFilterPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewFilterPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
