import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  // trigger loading bar on
  show(): void {
    this.loadingSubject.next(true);
  }

  // trigger loading bar off
  hide(): void {
    this.loadingSubject.next(false);
  }
}
