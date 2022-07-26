import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  onSubmit(): void {
    this.criteriaSubmitted = this.fg.controls['searchCriteria'].value;
    this.personsService.getPerson(this.criteriaSubmitted, 'response').subscribe(response => {
      console.log(`onSubmit result: ${JSON.stringify(response?.body)}`);
      this.responseReceived = true;
      this.person = response?.body;
    });
  }

}
