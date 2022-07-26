import { BaseSpecFixture, ButtonElementByClassName, ElementByClassName, InputElementByClassName } from "src/app/utils-for-test/base-spec-fixture";
import { PersonDetailComponent } from "../person-detail.component";

export class PersonDetailSpecFixture extends BaseSpecFixture<PersonDetailComponent> {

  readonly searchCriteria = new InputElementByClassName('.searchCriteriaElem', this);

  readonly searchButton = new ButtonElementByClassName('.searchButtonElem', this);

  readonly personDetailsPanel = new ElementByClassName('.personDetailsElim', this);

  readonly firstname = new ElementByClassName('.firstnameElem', this);

  readonly lastname = new ElementByClassName('.lastnameElem', this);

  readonly matchedPersonsList = new ElementByClassName('.matchedPersonsListElem', this);

  readonly personNotFoundMessage = new ElementByClassName('.personNotFoundMessageElem', this);

}
