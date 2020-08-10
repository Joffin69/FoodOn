import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderDishPage } from './order-dish.page';

describe('OrderDishPage', () => {
  let component: OrderDishPage;
  let fixture: ComponentFixture<OrderDishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
