import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appChecked]',
})
export class CheckedDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }
  @Input()
  private date: string;
  private paragraph;

  ngOnInit(): void {
    // let li = this.el.nativeElement;
    // this.renderer.setStyle(li, 'list-style-image', 'url(/assets/image.png)');
  }
  li = this.el.nativeElement;
  @HostListener('mousedown')
  mousedown(eventDate: Event) {
    this.paragraph.innerHTML = 'Utworzono: ' + this.date;
    this.renderer.addClass(this.paragraph, 'par');
    this.renderer.setStyle(this.li, 'text-decoration', 'none');
    this.renderer.appendChild(this.li, this.paragraph);
  }

  @HostListener('mouseup')
  mouseup(eventDate: Event) {
    this.renderer.removeChild(this.li, this.paragraph);
  }
}
