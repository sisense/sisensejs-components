import { wait } from '../../../utils/utils';

jest.mock('../../../contextRegistry');

import { newSpecPage } from '@stencil/core/testing';
import { SisenseFilters } from '../sisense-filters';
import { contextRegistry } from '../../../contextRegistry';
import { mockDashboardContext } from '../../../__mocks__/dashboardContext';

const mockedContextRegistry = jest.mocked(contextRegistry);

describe('sisense-filters', () => {
  beforeEach(() => {
    mockedContextRegistry.withNearestContext.mockImplementation(
      async (_1, _2, cb) => cb?.(mockDashboardContext),
    );
  });
  afterEach(() => {
    mockedContextRegistry.withNearestContext.mockClear();
    mockDashboardContext.renderFilters.mockClear();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [SisenseFilters],
      html: `<sisense-filters></sisense-filters>`,
    });
    expect(page.root).toEqualHtml(`
      <sisense-filters>
        <div style="width: 200px; height: 200px;"/>
      </sisense-filters>
    `);

    await wait(0);

    expect(mockDashboardContext.renderFilters).toHaveBeenCalledTimes(1);
  });

  it('renders with width and height props', async () => {
    const page = await newSpecPage({
      components: [SisenseFilters],
      html: `<sisense-filters width="123" height="456"></sisense-filters>`,
    });
    expect(page.root).toEqualHtml(`
      <sisense-filters width="123" height="456">
        <div style="width: 123px; height: 456px;"/>
      </sisense-filters>
    `);

    await wait(0);

    expect(mockDashboardContext.renderFilters).toHaveBeenCalledTimes(1);
  });
});
