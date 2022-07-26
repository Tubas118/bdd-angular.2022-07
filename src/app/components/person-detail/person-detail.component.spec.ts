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
    const spy = jasmine.createSpyObj('PersonService', ['getPerson','fuzzySearchPersons']);
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
      status: HttpStatusCode.Ok,
      statusText: HttpStatusCode.Ok.toString()
    });
    personServiceSpy.getPerson.and.returnValue(of(mockPersonResponse));

    // And
    personServiceSpy.fuzzySearchPersons.and.returnValue(of(mockPersonsResponse));

    // When
    component.fg.controls['searchCriteria'].setValue(mockPerson.id);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    // Then
    fixture.whenStable().then(() => {
      expect(elements.personDetailsPanel.nativeElement).toBeTruthy();
      expect(elements.firstname.nativeElement.textContent?.trim()).toEqual(component?.person?.firstname);
      expect(elements.lastname.nativeElement.textContent?.trim()).toEqual(component?.person?.lastname);
      expect(elements.personNotFoundMessage.nativeElement).toBeFalsy();
    });
  }));

  it('AC-2.2: should display person details on rest get call after submitting fuzzy value', waitForAsync(() => {
    // Given
    expect(component).toBeTruthy();
    personServiceSpy.getPerson.and.returnValue(of(mockPersonNotFoundResponse));

    // And
    const mockPersons: Person[] = [{
      id: 'mock-id-1',
      firstname: 'mock-first-1',
      lastname: 'mock-last-1'
    }, {
        id: 'mock-id-2',
        firstname: 'mock-first-2',
        lastname: 'mock-last-2'
      }];
    const mockPersonsResponse = new HttpResponse({
      body: mockPersons,
      status: HttpStatusCode.Ok,
      statusText: HttpStatusCode.Ok.toString()
    });
    personServiceSpy.fuzzySearchPersons.and.returnValue(of(mockPersonsResponse));

    // When
    component.fg.controls['searchCriteria'].setValue('search');
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    // Then
    fixture.whenStable().then(() => {
      expect(elements.personDetailsPanel.nativeElement).toBeFalsy();
      expect(elements.matchedPersonsList.nativeElement).toBeTruthy();
      expect(elements.personNotFoundMessage.nativeElement).toBeFalsy();
    });
  }));

  [undefined, null].forEach((mockPerson) => {

    it(`AC-2.3: should display not found message when person: ${mockPerson}`, waitForAsync(() => {
      // Given
      const mockPersonResponse = new HttpResponse({
        body: mockPerson as unknown as Person,
        status: HttpStatusCode.NotFound,
        statusText: HttpStatusCode.NotFound.toString(),
      });
      personServiceSpy.getPerson.and.returnValue(of(mockPersonResponse));

      // And
      personServiceSpy.fuzzySearchPersons.and.returnValue(of(mockPersonsResponse));

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

const mockPersonNotFoundResponse = new HttpResponse({
  body: { id: '-999999' },
  status: HttpStatusCode.NotFound,
  statusText: HttpStatusCode.NotFound.toString()
});

const mockPersonsResponse = new HttpResponse({
  body: [],
  status: HttpStatusCode.NotFound,
  statusText: HttpStatusCode.NotFound.toString()
});
