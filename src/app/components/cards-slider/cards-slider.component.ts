import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-slider',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cards-slider.component.html',
  styleUrl: './cards-slider.component.css'
})
export class CardsSliderComponent {
  sliderList!:HTMLElement;
  allCards = 1;
  starterCardsQty = 0;
  availableCards = 1;
  currentCard = 0;

  constructor(){

  }

  ngOnInit(): void {

  }

  getCardWidth(){
    return parseFloat(getComputedStyle(this.sliderList.children[0] as HTMLElement).width.slice(0,-2));
  }

  getSliderListGap(){
    return parseInt(getComputedStyle(this.sliderList as HTMLElement).gap.slice(0,-2));
  }

  prev(e :any){
    this.availableCards += 1;
    this.currentCard -= 1;
    let amountToShift = (this.currentCard * (this.getCardWidth() + (this.getSliderListGap() * Math.floor(this.starterCardsQty / 2))));
    this.sliderList.style.transform = `translateX(-${amountToShift}px)`;
  }

  next(e: any){
    e.preventDefault()
    if(!this.sliderList){
      this.sliderList = e.currentTarget.parentElement.parentElement.children[1].children[0];
      this.allCards = this.sliderList.children.length;
      this.starterCardsQty = Math.round(parseFloat(getComputedStyle(this.sliderList).width.slice(0,-2)) / this.getCardWidth());
      this.availableCards = this.allCards - this.starterCardsQty;
      this.allCards -= this.starterCardsQty;
    }
    this.availableCards -= 1;
    this.currentCard += 1;
    let amountToShift = (this.currentCard * (this.getCardWidth() + (this.getSliderListGap() * Math.floor(this.starterCardsQty / 2))));
    this.sliderList.style.transform = `translateX(-${amountToShift}px)`;
  }
}
