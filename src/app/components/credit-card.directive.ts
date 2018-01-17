import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[credit-card]'
})
export class CreditCardDirective {
  @HostBinding('style.border') border: string;

  constructor(private element: ElementRef) {}

  /** input same as keypress or keydown but object content is not the same */
  @HostListener('input', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const trimmed = input.value.replace(/\s+/g, '').substr(0, 16);
    const numbers = [];
    for (let i = 0, m = trimmed.length; i < m; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }
    input.value = numbers.join(' ');

    this.border = '';
    if (/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }
}
