import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class BaseSpecFixture<T> {

  constructor(public fixture: ComponentFixture<T>) { }

}

export class BaseElementByClassName<T extends HTMLElement> {

  constructor(private cssName: string, private specFixture: BaseSpecFixture<any>) { }

  get nativeElement(): T {
    return this.debugElement?.nativeElement;
  }

  get debugElement(): DebugElement {
    return this.specFixture?.fixture?.debugElement?.query(By.css(this.cssName));
  }

}

export class ElementByClassName extends BaseElementByClassName<HTMLElement> { }

export class InputElementByClassName extends BaseElementByClassName<HTMLInputElement> { }

export class ButtonElementByClassName extends BaseElementByClassName<HTMLButtonElement> { }
