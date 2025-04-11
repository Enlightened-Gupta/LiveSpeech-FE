import { Component,Input, OnInit  } from '@angular/core';
import { AlertService,AlertData } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  // @Input() message: string = '';
  // @Input() type: 'success' | 'danger' | 'info' | 'warning' = 'info';
  // visible = true;
  alert: AlertData | null = null;

  constructor(private alertService: AlertService) {}
  ngOnInit(): void {
    this.alertService.alert$.subscribe((data) => {
      this.alert = data;
    });
  }

  close() {
    this.alertService.clear();
  }
  // close() {
  //   this.visible = false;
  // }
}
