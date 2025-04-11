import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface AlertData {
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertData | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info') {
    this.alertSubject.next({ message, type });

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.alertSubject.next(null);
  }
  constructor() { }
}
