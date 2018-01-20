import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Attach a formControl to this component
const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  styleUrls: ['stock-counter.component.scss'],
  template: `
    <div class="stock-counter" [class.focused]="focus">
      <div>
        <!-- To focus on the div we add tabIndex -->
        <div
          tabindex="0"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          >
          <p>{{ value }}</p>
          <div>
            <button
              type="button"
              (click)="increment()"
              [disabled]="value === max">
              +
            </button>
            <button
              type="button"
              (click)="decrement()"
              [disabled]="value === min">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StockCounterComponent implements ControlValueAccessor {
  @Input() step = 10;
  @Input() min = 10;
  @Input() max = 1000;

  value = this.min;
  focus = false;

  private onTouch: Function;
  private onChange: Function;

  writeValue(value: number): void {
    this.value = value || this.min;
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouch = fn;
  }

  onKeyDown(event: KeyboardEvent): void {
    const handlers = {
      ArrowDown: this.decrement.bind(this),
      ArrowUp: () => this.increment() // no need to bind this with arrow function
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();
  }

  onFocus(event: FocusEvent): void {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onBlur(event: FocusEvent): void {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onChange(this.value);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onChange(this.value);
    }
    this.onTouch();
  }
}
