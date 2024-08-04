import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageMetadataParagraphInterface} from "../../../../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.scss']
})
export class CreateImageComponent implements OnInit{
  @Output() sendData = new EventEmitter<string>

  payload: ImageMetadataParagraphInterface = {
    photoAlignment: 'left'
  };

  preloadedImage = '';

  ngOnInit() {
    this.preloadedImage = this.payload.imageUrl ? this.payload.imageUrl : ''
  }

  propagateData() {
    this.sendData.emit(JSON.stringify(this.payload))
  }

  setPhotoAlignment(position: 'right' | 'left') {
    this.payload.photoAlignment = position
    this.propagateData()
  }

  setPhoto($event: { url: string, width: number, height: number }) {
    this.payload.imageUrl = $event.url
    //TODO get deal with width and height
    // this.payload.width = $event.width
    // this.payload.height = $event.height
    this.propagateData()
  }
}
