import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TextManagementService {
  private selectedTextSource = new BehaviorSubject<string>('');
  selectedText$ = this.selectedTextSource.asObservable();
  private selectedRangeSource = new BehaviorSubject<Range | null>(null);

  setSelectedRange(range: Range | null) {
    this.selectedRangeSource.next(range);
  }

  getSelectedRange(): Observable<Range | null> {
    return this.selectedRangeSource.asObservable();
  }

  setSelectedText(text: string) {
    this.selectedTextSource.next(text);
  }
}
