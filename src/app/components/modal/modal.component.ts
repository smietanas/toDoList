import { Component, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
declare var $: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements AfterViewInit {
  options = {
    inDuration: 3000,
  };
  instances = null;
  modalText = '';
  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('.modal');
    const initModal = M.Modal.init(elems, this.options);
    if (initModal && initModal.length > 0) {
      this.instances = initModal[0];
    }
  }

  openModal() {
    this.instances.open();
  }
}
