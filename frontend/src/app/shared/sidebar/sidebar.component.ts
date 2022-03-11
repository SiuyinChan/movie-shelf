import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveCategory, Section } from "../../models";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() sections: Section[] = [];
  @Output() categoryClicked: EventEmitter<ActiveCategory> = new EventEmitter<ActiveCategory>();
}
