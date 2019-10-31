import {
  Input,
  Component,
  ViewChild,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { FiltersChildComponent } from '../child-component/filters-child.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'filters',
  templateUrl: './filters-parent.component.html',
  styleUrls: ['./filters-parent.component.scss']
})

export class FiltersParentComponent {
  @Input() options: BehaviorSubject<any>;
  @ViewChild('container', { read: ViewContainerRef, static: false }) VCR: ViewContainerRef;

  public index: number = 0;
  public componentReferences = [];

  constructor(private CFR: ComponentFactoryResolver) {  }

  public createNewComponent() {
    const componentFactory = this.CFR.resolveComponentFactory(FiltersChildComponent);
    const componentRef: ComponentRef<FiltersChildComponent> = this.VCR.createComponent(componentFactory);
    const currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.index;
    currentComponent.filterOptions = this.options;
    currentComponent.compInteraction = this;

    this.componentReferences.push(componentRef);
  }

  public removeComponent(index: number) {
    if (this.VCR.length < 0) {
      return;
    }

    const componentRef = this.componentReferences.filter(component => component.instance.index === index)[0];
    const vcrIndex: number = this.VCR.indexOf(componentRef);

    this.VCR.remove(vcrIndex);
    this.componentReferences = this.componentReferences.filter(component => component.instance.index !== index);
  }
}
