import { Component, ViewChild } from '@angular/core';
import { PriorityOrderComponent } from '../_shared/priority-order/priority-order.component';

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})

export class CompareComponent {

    @ViewChild(PriorityOrderComponent)
    priorityOrder: PriorityOrderComponent;

    constructor() { }

    showSelectedPriorityOptions() {
        alert(JSON.stringify(this.priorityOrder.getPriorityOptions()));
    }
}
