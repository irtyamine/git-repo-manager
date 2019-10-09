import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FiltrationService } from '../../../services/filtration.service';
import { debounceTime, map } from 'rxjs/operators';

export interface MyInterface {
  removeComponent(index: number);
}

@Component({
  templateUrl: './filters-child.component.html',
  styleUrls: ['./filters-child.component.scss']
})

export class FiltersChildComponent implements OnInit {
  public index: number;
  public selfRef: FiltersChildComponent;
  public compInteraction: MyInterface;
  public filterOptions: BehaviorSubject<any>;
  public filteringKey: string;
  public hideCondition: boolean = false;
  private keyUp = new Subject();

  constructor(private readonly filtration: FiltrationService) {
    this.keyUp
      .pipe(
        map(value => value),
        debounceTime(450)
      )
      .subscribe(text => {
        const newFilterObject = {
          key: this.filteringKey,
          value: text
        };
        this.filtration.setFilterOptions(newFilterObject);
      });
  }

  ngOnInit(): void {  }

  public chooseSelectOption(option: string) {
    this.filteringKey = option;
  }

  public inputFilterValue(value: string) {
    this.keyUp.next(value);
  }

  public removeComponent(index: number) {
    this.filtration.removeFilter(this.filteringKey);
    this.compInteraction.removeComponent(index);
  }

}
