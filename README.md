# Acceptance Criteria #2 - accessing Person endpoints

### Example requirements / BDD ticket

##### UI Acceptance Criteria

As an user of the UI, I want to enter a person id:

1) Display the matching person record when found (id, firstname and lastname)

2) Display a list of matching person records for the user to select from

3) Display a notification message when no match found.


##### BDD #1 - Return single person record by identifier.

GIVEN:
* the user enters a person identifier for a known record into a search box and clicks "Search"

WHEN:
* the get person endpoint is called
* AND returns the person record

THEN:
* person details panel is displayed with id, firstname and lastname


##### BDD #2 - Return a list of person record by identifier.

GIVEN:
* the user enters a person identifier for a known record into a search box and submits

WHEN:
* the get search person endpoint is called

THEN:
* returns at least two possible person records
* AND displays a list for the user to select one user

WHEN:
* user selects one person in list

THEN:
* process continues to AC #2.1 as if the user entered the person idenifier and clicked "Search"


##### BDD #3 - Display a notification message when no match found.

GIVEN:
* the user enters a value in the search box and clicks "Search"

WHEN:
* AC #2.1 and AC #2.2 both return 404

THEN:
* display message stating no matches are found


# BddAngular.202207

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
