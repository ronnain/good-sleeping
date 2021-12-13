import {
    ComponentFactoryResolver,
    Injectable,
    Inject
  } from '@angular/core'


  @Injectable()
  export class ComponentLoaderService {

    factoryResolver;
    rootViewContainer;


    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
      this.factoryResolver = factoryResolver
    }

    setRootViewContainerRef(viewContainerRef) {
      this.rootViewContainer = viewContainerRef
    }
    addDynamicComponent(componentRef) {
      const factory = this.factoryResolver
                          .resolveComponentFactory(componentRef)
      const component = factory
        .create(this.rootViewContainer.parentInjector)
      this.rootViewContainer.insert(component.hostView)
    }
  }