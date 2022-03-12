import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveCategory, Section } from "../../models";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  @Input() sections: Section[] = [];
  @Output() categoryClicked: EventEmitter<ActiveCategory> = new EventEmitter<ActiveCategory>();
  public isMobile: boolean = false;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 1280px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });
  }
}
