jest.mock('../../../contextRegistry');
jest.mock('../../../globals');

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SisenseDashboard } from '../sisense-dashboard';
import { contextRegistry } from '../../../contextRegistry';
import { mockAppContext } from '../../../__mocks__/appContext';
import { MockDashboard } from '../../../__mocks__/dashboard';
import { newDashboard } from '../../../globals';
import { wait } from '../../../utils/utils';

const mockedContextRegistry = jest.mocked(contextRegistry);
const mockedNewDashboard = jest.mocked(newDashboard);

describe('sisense-dashboard', () => {
  beforeEach(() => {
    mockedContextRegistry.withNearestContext.mockImplementation(
      async (_1, _2, cb) => cb?.(mockAppContext),
    );
    mockAppContext.dashboards.load.mockImplementation(
      (oid: string) => new MockDashboard(oid),
    );
  });

  afterEach(() => {
    mockedContextRegistry.withNearestContext.mockClear();
    mockedContextRegistry.register.mockClear();
    mockedContextRegistry.unregister.mockClear();
    mockAppContext.dashboards.load.mockClear();
    mockAppContext.dashboards.add.mockClear();
  });

  it('renders without oid', async () => {
    const page = await newSpecPage({
      components: [SisenseDashboard],
      html: `<sisense-dashboard>children</sisense-dashboard>`,
    });

    expect(page.root).toEqualHtml(`
      <sisense-dashboard>
        children
      </sisense-dashboard>
    `);

    expect(mockAppContext.dashboards.load).toHaveBeenCalledTimes(0);
    expect(mockAppContext.dashboards.add).toHaveBeenCalledTimes(1);
  });

  it('renders with oid', async () => {
    const page = await newSpecPage({
      components: [SisenseDashboard],
      html: `<sisense-dashboard oid="12345">children</sisense-dashboard>`,
    });
    expect(page.root).toEqualHtml(`
      <sisense-dashboard oid="12345">
        children
      </sisense-dashboard>
    `);

    expect(mockAppContext.dashboards.load).toHaveBeenCalledTimes(1);
    expect(mockAppContext.dashboards.load).toHaveBeenCalledWith('12345');
    expect(mockAppContext.dashboards.add).toHaveBeenCalledTimes(0);
  });

  describe('contextRegistry', () => {
    it('registers itself to contextRegistry', async () => {
      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      expect(mockedContextRegistry.register).toHaveBeenCalledTimes(1);
      expect(mockedContextRegistry.register).toHaveBeenCalledWith(
        page.rootInstance,
      );
    });

    it('unregisters itself from contextRegistry', async () => {
      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      expect(mockedContextRegistry.unregister).toHaveBeenCalledTimes(0);

      page.root.remove();

      expect(mockedContextRegistry.unregister).toHaveBeenCalledTimes(1);
    });
  });

  describe('datasource prop', () => {
    it("sets the dashboard's datasource property", async () => {
      const mockDashboard = new MockDashboard();
      mockedNewDashboard.mockImplementation(() => mockDashboard);

      const template = () => (
        // @ts-ignore
        <sisense-dashboard datasource={{ fullname: 'src' }}></sisense-dashboard>
      );
      await newSpecPage({
        components: [SisenseDashboard],
        template,
      });

      expect(mockDashboard.datasource).toEqual({ fullname: 'src' });
    });
  });

  describe('events', () => {
    test('filtersChanged', async () => {
      let triggerEvent;
      let mockDashboard;

      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        mockDashboard = new MockDashboard(oid);
        mockDashboard.on = jest.fn().mockImplementation((eventName, cb) => {
          if (eventName === 'filterschanged') {
            triggerEvent = cb;
          }
        });
        return mockDashboard;
      });
      const onFiltersChanged = jest.fn();

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      page.root.addEventListener('filtersChanged', onFiltersChanged);

      expect(onFiltersChanged).toHaveBeenCalledTimes(0);

      triggerEvent?.(undefined, { items: [], type: 'type' });

      expect(onFiltersChanged).toHaveBeenCalledTimes(1);
      expect(onFiltersChanged).toHaveBeenCalledWith(
        expect.objectContaining({
          target: page.root,
          detail: { items: [], type: 'type' },
        }),
      );
    });

    test('refreshed', async () => {
      let triggerEvent;
      let mockDashboard;

      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        mockDashboard = new MockDashboard(oid);
        mockDashboard.on = jest.fn().mockImplementation((eventName, cb) => {
          if (eventName === 'refreshend') {
            triggerEvent = cb;
          }
        });
        return mockDashboard;
      });
      const onRefreshed = jest.fn();

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      page.root.addEventListener('refreshed', onRefreshed);

      expect(onRefreshed).toHaveBeenCalledTimes(0);

      triggerEvent?.();

      expect(onRefreshed).toHaveBeenCalledTimes(1);
      expect(onRefreshed).toHaveBeenCalledWith(
        expect.objectContaining({
          target: page.root,
        }),
      );
    });
  });

  describe('_getContext', () => {
    it('waits for context to populate before returning', async () => {
      let loadDashboardPromise, resolveLoadDashboard, mockDashboard;

      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        loadDashboardPromise = new Promise(resolve => {
          mockDashboard = new MockDashboard(oid);
          resolveLoadDashboard = () => resolve(mockDashboard);
        });
        return loadDashboardPromise;
      });

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      expect(page.rootInstance.dashboardContext).toBeFalsy();

      expect(page.rootInstance._getContext()).toEqual(loadDashboardPromise);

      resolveLoadDashboard();

      await wait(0);

      expect(page.rootInstance.dashboardContext).toEqual(mockDashboard);

      await expect(page.rootInstance._getContext()).resolves.toBe(
        mockDashboard,
      );
    });
  });

  describe('getModel', () => {
    it('returns', async () => {
      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      await expect(page.rootInstance.getModel()).resolves.toEqual({
        datasource: 'mockDatasource',
        defaultFilters: '',
        description: 'mockDescription',
        filters: undefined,
        instanceType: 'mockInstanceType',
        oid: 'mockOid',
        owner: 'mockOwner',
        title: 'mockTitle',
        userId: 'mockUserId',
        widgets: undefined,
      });
    });
  });

  describe('filters', () => {
    const filter1 = {
      datatype: 'text',
      dim: 'dim1',
      filter: {
        explicit: true,
        multiSelection: true,
        members: ['a', 'b', 'c'],
      },
    };
    const filter2 = {
      datatype: 'numeric',
      dim: 'dim2',
      filter: {
        explicit: true,
        multiSelection: true,
        members: [9, 8, 7],
      },
    };

    test('applyFilters', async () => {
      let mockDashboard;
      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        mockDashboard = new MockDashboard(oid);
        return mockDashboard;
      });

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      await page.rootInstance.applyFilters([filter1, filter2]);

      expect(mockDashboard.$$model.filters.update).toHaveBeenCalledTimes(2);
      expect(mockDashboard.$$model.filters.update).toHaveBeenNthCalledWith(
        1,
        { jaql: filter1 },
        { save: false },
      );
      expect(mockDashboard.$$model.filters.update).toHaveBeenNthCalledWith(
        2,
        { jaql: filter2 },
        { save: false },
      );
    });

    test('removeFilters', async () => {
      let mockDashboard;
      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        mockDashboard = new MockDashboard(oid);
        return mockDashboard;
      });

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      await page.rootInstance.removeFilters([filter1, filter2]);

      expect(mockDashboard.$$model.filters.remove).toHaveBeenCalledTimes(2);
      expect(mockDashboard.$$model.filters.remove).toHaveBeenNthCalledWith(
        1,
        'dim1',
      );
      expect(mockDashboard.$$model.filters.remove).toHaveBeenNthCalledWith(
        2,
        'dim2',
      );
    });

    test('clearFilters', async () => {
      let mockDashboard;
      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        mockDashboard = new MockDashboard(oid);
        return mockDashboard;
      });

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      await page.rootInstance.clearFilters();

      expect(mockDashboard.$$model.filters.clear).toHaveBeenCalledTimes(1);
    });
  });

  describe('refresh', () => {
    it('calls debouncedRefresh', async () => {
      let mockDashboard;
      mockAppContext.dashboards.load.mockImplementation((oid: string) => {
        mockDashboard = new MockDashboard(oid);
        jest.spyOn(mockDashboard, 'refresh');

        return mockDashboard;
      });

      const page = await newSpecPage({
        components: [SisenseDashboard],
        html: `<sisense-dashboard oid="12345"></sisense-dashboard>`,
      });

      jest.spyOn(mockDashboard, 'debouncedRefresh');

      await page.rootInstance.refresh();
      expect(mockDashboard.debouncedRefresh).toHaveBeenCalledTimes(1);

      await wait(1200);

      expect(mockDashboard.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
