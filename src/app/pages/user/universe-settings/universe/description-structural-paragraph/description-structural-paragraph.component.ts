import {Component, HostListener, Input, OnInit} from '@angular/core';
import {
  DateMetadataParagraphInterface,
  ImageMetadataParagraphInterface,
  ListMetadataParagraphInterface,
  NumberMetadataParagraphInterface,
  TextMetadataParagraphInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-description-structural-paragraph',
  templateUrl: './description-structural-paragraph.component.html',
  styleUrls: ['./description-structural-paragraph.component.scss']
})
export class DescriptionStructuralParagraphComponent implements OnInit{
  @Input() paragraph!: UniverseStructureParagraphInterface
  @Input() showPlaceForImage = false

  textParagraphOptions!: TextMetadataParagraphInterface
  numberParagraphOptions!: NumberMetadataParagraphInterface
  dateParagraphOptions!: DateMetadataParagraphInterface
  imageParagraphOptions!: ImageMetadataParagraphInterface
  listParagraphOptions!: ListMetadataParagraphInterface
  baseUrl: string = environment.baseUrl;
  multiplier: number = 1;

  ngOnInit() {
    this.onResize()
    switch (this.paragraph.type) {
      case "date": {
        this.convertDateJsonToDate(this.paragraph.metadata)
        break;
      }
      case "image": {
        this.convertImageJsonToStyle(this.paragraph.metadata)
        break;
      }
      case "text": {
        this.convertTextJsonToText(this.paragraph.metadata)
        break;
      }
      case "number": {
        this.convertNumberJsonToNumber(this.paragraph.metadata)
        break;
      }
      case "list": {
        this.convertListJsonToStyle(this.paragraph.metadata)
        break;
      }
      default: {
        this.convertTextJsonToText(this.paragraph.metadata)
      }
    }
  }

  convertTextJsonToText(metadata: any) {
    this.textParagraphOptions = {
      description: metadata.description
    }
  }

  convertNumberJsonToNumber(metadata: any) {
    this.numberParagraphOptions = {
      value: metadata.value
    }
  }

  convertDateJsonToDate(metadata: any) {
    this.dateParagraphOptions = {
      day: metadata.day,
      month: metadata.month,
      year: metadata.year
    }
  }

  convertImageJsonToStyle(metadata: any): any {
    this.imageParagraphOptions = {
      width: metadata.width,
      height: metadata.height,
      photoAlignment: metadata.photoAlignment,
      imageUrl: metadata.imageUrl
    };
  }

  convertListJsonToStyle(metadata: any): any {
    this.listParagraphOptions = {
      type: metadata.type,
      listItems: metadata.listItems
    }
  }

  protected readonly String = String;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1440) {
      this.multiplier = 1; // Full size for large screens
    } else if (screenWidth >= 768 && screenWidth < 1440) {
      this.multiplier = 0.75; // 75% size for medium screens
    } else {
      this.multiplier = 0.5; // 50% size for small screens
    }
  }
}
