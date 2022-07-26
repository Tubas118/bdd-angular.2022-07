import { TestBed } from '@angular/core/testing';
import { TestMinModule } from 'src/modules/test-min.modules';
import { AppComponent } from './app.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,

        PersonDetailComponent
      ],
      imports: [
        TestMinModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bdd-angular.2022-07'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bdd-angular.2022-07');
  });
});
