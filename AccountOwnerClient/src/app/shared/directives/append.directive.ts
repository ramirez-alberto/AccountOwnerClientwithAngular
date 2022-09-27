import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Owner } from 'src/app/_interfaces/owner.model';

@Directive({
  selector: '[appAppend]'
})
export class AppendDirective implements OnChanges{
  @Input('appAppend') ownerParam : Owner;

  constructor(private element: ElementRef, private render: Renderer2) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.ownerParam.currentValue)
    {
      let accountCount = changes.ownerParam.currentValue.accounts.length;
      let span = this.render.createElement('span');
      let innerText = this.render.createText(`(${accountCount}) accounts`);

      this.render.appendChild(span,innerText);
      this.render.appendChild(this.element.nativeElement, span);
    }
    
  }
}
