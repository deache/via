import { Component } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

@Component({
  selector: 'app-priority-order',
  templateUrl: './priority-order.component.html',
  styleUrls: ['./priority-order.component.scss']
})
export class PriorityOrderComponent {

  private priorityOptions = [
    {
      content: "ROI",
      effectAllowed: "move",
      disable: false,
      handle: false,
    },
    {
      content: "ANÁLISIS DE COMPETENCIA",
      effectAllowed: "move",
      disable: false,
      handle: false,
    },
    {
      content: "FLUJO DE PERSONAS",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "PROYECCIÓN A FUTURO",
      effectAllowed: "move",
      disable: false,
      handle: true,
    },
    {
      content: "COSTOS",
      effectAllowed: "move",
      disable: false,
      handle: true,
    },
    {
      content: "FLUJO VIAL",
      effectAllowed: "move",
      disable: false,
      handle: true,
    }
  ];

  constructor() { }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      let index = event.index;

      if (typeof index === "undefined") {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }

  deleteOption(index: number) {
    this.priorityOptions.splice(index, 1);
  }

  getPriorityOptions() {
    return this.priorityOptions;
  }
}
