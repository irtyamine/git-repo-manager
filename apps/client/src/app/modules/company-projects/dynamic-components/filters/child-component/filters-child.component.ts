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
  public filteringValue: string;
  private keyUp = new Subject();
  private filteringOptions = [];

  constructor(private readonly filtration: FiltrationService) {
    this.keyUp
      .pipe(
        map(value => value),
        debounceTime(450)
      )
      .subscribe((text: string) => {

        if (text.length !== 0 && this.filteringKey === 'repoType') {
          text = text[0].toUpperCase() + text.slice(1);
        }

        const newFilterObject = {
          compIndex: this.index,
          key: this.filteringKey,
          value: text
        };
        this.filtration.setFilterOptions(newFilterObject);
      });
  }

  ngOnInit(): void {
    this.filteringOptions = this.filtration.filteringOptions;
  }

  public checkForSelectedOptions(listOption: string) {
    if (this.filteringOptions.length === 0) {
      return false;
    }

    const findOption = this.filteringOptions.find((option: any) => option.key === listOption);
    return !!findOption;
  }

  public chooseSelectOption(option: string) {

    this.filteringKey = option;
  }

  public inputFilterValue(value: string) {
    this.filteringValue = value;

    this.keyUp.next(this.filteringValue);
  }

  public removeComponent(index: number) {
    this.filtration.removeFilter(this.index);
    this.compInteraction.removeComponent(index);
  }

}
