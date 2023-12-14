import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterLabelValues} from "../interfaces/filter/creature-filter.interface";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAttribute(key: string): Observable<FilterLabelValues[]> {
    return this.http.get<FilterLabelValues[]>(`api/${key}`)
  }
}
