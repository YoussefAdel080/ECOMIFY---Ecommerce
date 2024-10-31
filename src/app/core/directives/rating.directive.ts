import { Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[rating]',
  standalone: true
})
export class RatingDirective {
  rating = input<number>(0);

  constructor(private el:ElementRef) {
  }

  ngAfterViewInit() {
    const ratingContainerWidth = parseFloat(getComputedStyle(this.el.nativeElement).getPropertyValue('width').slice(0,-2))
    const ratingPer = (this.rating() / 5);
    this.el.nativeElement.style.maxWidth = `${(ratingContainerWidth * ratingPer)}px`;
  }
}
