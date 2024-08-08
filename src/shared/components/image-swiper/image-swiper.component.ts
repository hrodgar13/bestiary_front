import {AfterViewInit, Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";
import Swiper from 'swiper';
import {SwiperOptions} from "swiper/types";


@Component({
  selector: 'app-image-swiper',
  templateUrl: './image-swiper.component.html',
  styleUrls: ['./image-swiper.component.scss']
})
export class ImageSwiperComponent implements AfterViewInit{
  @Input() images: string[] = []

  config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    scrollbar: { el: '.swiper-scrollbar', draggable: true }
  };
  baseUrl: string = environment.baseUrl;

  ngAfterViewInit() {
    new Swiper('.swiper-container', this.config);
  }

}
