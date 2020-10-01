import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output() clickOutside: EventEmitter<any> = new EventEmitter()

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement): void {
    let clickedInside = this._elementRef.nativeElement.contains(targetElement)

    document.querySelectorAll('.no-click-outside-action').forEach(ncoai => {
      if (ncoai.contains(targetElement)){
        clickedInside = true
      }
    })

    // console.log('native element ref', this._elementRef.nativeElement)
    // console.log('target ', targetElement)
    // console.log(clickedInsideDetails)

    if (!clickedInside) {
        this.clickOutside.emit(null)
    }
  }
}
