import { Directive, ElementRef, Renderer2, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef,
    private rendered:Renderer2) { }

    @HostListener('mouseenter') onmouseenter() {
        this.rendered.addClass(this.el.nativeElement, 'highlight')
    }
    @HostListener('mouseleave') onmouseleave() {
      this.rendered.removeClass(this.el.nativeElement, 'highlight')
    } 
}
