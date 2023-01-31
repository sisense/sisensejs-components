import { Component, h, Element, Prop } from '@stencil/core';
import { contextRegistry } from '../../contextRegistry';
import { wait } from '../../utils/utils';

@Component({
  tag: 'sisense-filters',
  shadow: false,
})
export class SisenseFilters {
  @Element() el: HTMLElement;
  private filtersDiv: HTMLDivElement;

  /**
   * The width of the filters panel
   */
  @Prop() width = 200;

  /**
   * The height of the filters panel
   */
  @Prop() height = 200;

  connectedCallback() {
    contextRegistry.withNearestContext(
      this,
      'sisense-dashboard',
      async context => {
        if (!this.filtersDiv) {
          await wait(0);
        }

        void context.renderFilters(this.filtersDiv);
      },
    );
  }

  render() {
    return (
      <div
        style={{
          width: this.width ? `${this.width}px` : '',
          height: this.height ? `${this.height}px` : '',
        }}
        ref={el => (this.filtersDiv = el)}
      />
    );
  }
}
