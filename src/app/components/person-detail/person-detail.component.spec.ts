import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Person, PersonsService } from 'target/generated-sources/openapi';

import { of } from 'rxjs';

import { PersonDetailComponent } from './person-detail.component';
import { HttpClientModule, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { PersonDetailSpecFixture } from './fixtures/person-detail-spec.fixture';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent;
  let fixture: ComponentFixture<PersonDetailComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonsService>;
  let elements: PersonDetailSpecFixture;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PersonService', ['getPerson']);
    await TestBed.configureTestingModule({
      declarations: [
        PersonDetailComponent
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: PersonsService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailComponent);
    elements = new PersonDetailSpecFixture(fixture);
    personServiceSpy = TestBed.inject(PersonsService) as jasmine.SpyObj<PersonsService>;
    component = fixture.componentInstance;
  });

  it('AC-2.1: should display person details on rest get call after submitting personId', waitForAsync(() => {
    // Given
    expect(component).toBeTruthy();
    const mockPerson: Person = {
      id: 'mock-id',
      firstname: 'mock-first',
      lastname: 'mock-last'
    };
    const mockPersonResponse = new HttpResponse({
      body: mockPerson,
      status: HttpStatusCode.Ok
    });
    personServiceSpy.getPerson.and.returnValue(of(mockPersonResponse));

    // When
    component.fg.controls['searchCriteria'].setValue(mockPerson.id);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    // Then
    fixture.whenStable().then(() => {
      expect(elements.firstname.nativeElement.textContent?.trim()).toEqual(component?.person?.firstname);
      expect(elements.lastname.nativeElement.textContent?.trim()).toEqual(component?.person?.lastname);
      expect(elements.personNotFoundMessage.nativeElement).toBeFalsy();
    });
  }));

  [undefined, null].forEach((mockPerson) => {

    fit(`AC-2.3: should display not found message when person: ${mockPerson}`, waitForAsync(() => {
      // Given
      const mockPersonResponse = new HttpResponse({
        body: mockPerson as unknown as Person,
        status: HttpStatusCode.Ok
      });
      personServiceSpy.getPerson.and.returnValue(of(mockPersonResponse));

      // When
      component.fg.controls['searchCriteria'].setValue('you will not find me');
      fixture.detectChanges();

      component.onSubmit();
      fixture.detectChanges();

      // Then
      fixture.whenStable().then(() => {
        expect(elements.firstname.nativeElement).toBeFalsy();
        expect(elements.lastname.nativeElement).toBeFalsy();
        expect(elements.personNotFoundMessage.nativeElement).toBeTruthy();
      });
    }));
  });
});

