import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Person, PersonsService } from 'target/generated-sources/openapi';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  @Input()
  personId!: string;

  fg: FormGroup;

  criteriaSubmitted!: string;

  responseReceived!: boolean;

  person: Person | undefined | null;

  personMatches: Person[] | undefined | null;

  constructor(private personsService: PersonsService,
              formBuilder: FormBuilder) {

    this.fg = formBuilder.group({
      searchCriteria: ''
    });
  }

  ngOnInit(): void {
    this.person = undefined;
    this.responseReceived = false;
  }

  onSelectPerson(personId: string): void {

  }

  onSubmit(): void {
    this.criteriaSubmitted = this.fg.controls['searchCriteria'].value;
    forkJoin({
      personResponse: this.personsService.getPerson(this.criteriaSubmitted, 'response'),
      matchPersonsResponse: this.personsService.fuzzySearchPersons(this.criteriaSubmitted, 'response')
    })
    .subscribe(data => {
      if (HttpStatusCode.Ok === data?.personResponse?.status) {
        this.person = data.personResponse.body;
      }
      else if (HttpStatusCode.Ok === data?.matchPersonsResponse?.status) {
        this.personMatches = data.matchPersonsResponse.body;
      }
      this.responseReceived = true;
    });
  }

}
