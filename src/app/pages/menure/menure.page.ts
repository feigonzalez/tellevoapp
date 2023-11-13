import { Component, ElementRef, ViewChild } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-menure',
  templateUrl: './menure.page.html',
  styleUrls: ['./menure.page.scss'],
})
export class MenurePage  {
  @ViewChild(IonCard, { read: ElementRef }) card?: ElementRef<HTMLIonCardElement>;

  private animation!: Animation;

  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    if(this.card)
      this.animation = this.animationCtrl
        .create()
        .addElement(this.card.nativeElement)
        .duration(1500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('opacity', '1', '0');
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }
}



