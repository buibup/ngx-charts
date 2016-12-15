import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksComponent } from './x-axis-ticks.component';

@Component({
  selector: 'g[xAxis]',
  template: `
    <svg:g
      [attr.class]="xAxisClassName"
      [attr.transform]="transform">
      <svg:g xAxisTicks
        [tickFormatting]="tickFormatting"
        [tickCount]="tickCount"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        (dimensionsChanged)="emitTicksHeight($event)"
      />

      <svg:g axisLabel
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {

  @Input() xScale;
  @Input() dims;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() tickCount;

  @Output() dimensionsChanged = new EventEmitter();

  xAxisClassName: string = 'x axis';
  xOrient: string = 'bottom';
  tickArguments: any;
  transform: any;
  labelOffset: number = 80;
  fill: string = 'none';
  stroke: string = 'stroke';
  tickStroke: string = '#ccc';
  strokeWidth: string = 'none';
  xAxisOffset: number = 5;

  @ViewChild(XAxisTicksComponent) ticksComponent: XAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.transform = `translate(0,${this.xAxisOffset + this.dims.height})`;
  }

  emitTicksHeight({ height }): void {
    let newLabelOffset = height + 25 + 5;
    if (newLabelOffset !== this.labelOffset) {
      this.labelOffset = newLabelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({height: height});
      }, 0);
    }
  }

}
