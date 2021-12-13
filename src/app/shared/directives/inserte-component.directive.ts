import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  Output,
  Renderer2,
  Directive,
  ElementRef,
  Input,
  ComponentRef,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { HtmlContainer } from 'src/app/shared/services/html-container.model';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';

@Directive({
  selector: '[inserteComponent]'
})
export class InserteComponentDirective {

  @Input('componentName') componentName: string;
  @Input('question') question: string;

  /* @Input('checkBoxValue') set checkBoxValue(value: boolean) {
    this._value = value;
    if (this.componentRef) {
      //this.setCheckBoxValue();
    }
  }
  _value: boolean;
  get checkBoxValue(): boolean {
    return this._value;
  } */

  //@Output() checkBoxValueChange: EventEmitter<boolean> = new EventEmitter();

  private componentRef: ComponentRef<any>;
  private htmlContainer: HtmlContainer;

  constructor(
    private currentDiv: ElementRef,
    private appRef: ApplicationRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private componentFactoryService: ComponentFactoryService
  ) {}

  ngOnInit() {
    this.createCheckBoxComponent();
    this.handleChecboxInputs();
    //this.handleCheckboxOutputs();
  }

  createCheckBoxComponent() {
    // Create the container
    const boxContainer = document.createElement('div');
    boxContainer.className = 'cardBinaryQuestion--' + this.componentName;

    // Insert divBox in the DOM as the first child
    this.renderer.insertBefore(this.currentDiv.nativeElement, boxContainer, this.currentDiv.nativeElement.firstChild);

    // Insert the Component inside the container (DOM and Angular DOM)
    this.htmlContainer = new HtmlContainer(boxContainer, this.appRef, this.resolver, this.injector);
    const component = this.componentFactoryService.getComponent(this.componentName);
    this.componentRef = this.htmlContainer.attach(component);
  }

  private handleChecboxInputs() {
    this.componentRef.instance.question = this.question;
  }

 /*  private setCheckBoxValue() {
    this.componentRef.instance.value = this.checkBoxValue;
  }

  private handleCheckboxOutputs() {
    // Detect checkbox changes
    this.componentRef.instance.registerOnChange(() => {
      this._toggleCheckbox();
    });
  }

  private _toggleCheckbox() {
    this.checkBoxValue = !this.checkBoxValue;
    this.checkBoxValueChange.emit(this.checkBoxValue);
  } */

  ngOnDestroy() {
    this.htmlContainer.dispose();
  }
}
