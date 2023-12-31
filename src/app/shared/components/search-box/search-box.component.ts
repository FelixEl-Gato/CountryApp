import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() placeholder: string = '';

  @Input() initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce : EventEmitter<string> = new EventEmitter<string>();

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
