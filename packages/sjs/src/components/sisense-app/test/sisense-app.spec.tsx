import { wait } from '../../../utils/utils';

jest.mock('../../../contextRegistry');
jest.mock('../../../utils/libloader');

import { newSpecPage } from '@stencil/core/testing';
import { SisenseApp } from '../sisense-app';
import { contextRegistry } from '../../../contextRegistry';
import { mockAppContext } from '../../../__mocks__/appContext';
import Libloader from '../../../utils/libloader';
import { MockSisense } from '../../../__mocks__/sisense';
const mockedLibloader = jest.mocked(Libloader);

const mockedContextRegistry = jest.mocked(contextRegistry);

// hide debug msg in test console
jest.spyOn(console, 'debug').mockImplementation(() => {});

describe('sisense-app', () => {
  beforeEach(() => {
    MockSisense.connect.mockImplementation(async () => mockAppContext);
  });
  afterEach(() => {
    mockedLibloader.mockClear();
    delete window.Sisense;
    MockSisense.connect.mockClear();
    mockedContextRegistry.register.mockClear();
    mockedContextRegistry.unregister.mockClear();
    mockAppContext.$$dashboard.$identity.signout.mockClear();
  });

  it('renders with url prop, calls Libloader', async () => {
    const page = await newSpecPage({
      components: [SisenseApp],
      html: `<sisense-app url="http://mock.url">children</sisense-app>`,
    });

    expect(page.root).toEqualHtml(`
      <sisense-app url="http://mock.url">
        <div id="sisenseApp">children</div>
      </sisense-app>
    `);

    expect(mockedLibloader).toHaveBeenCalledTimes(1);
    expect(mockedLibloader).toHaveBeenCalledWith(
      new URL('http://mock.url/js/sisense.v1.js'),
    );
  });

  it('renders without url prop, does not call Libloader', async () => {
    const page = await newSpecPage({
      components: [SisenseApp],
      html: `<sisense-app>children</sisense-app>`,
    });

    expect(page.root).toEqualHtml(`
      <sisense-app>
        <div id="sisenseApp">children</div>
      </sisense-app>
    `);

    expect(mockedLibloader).toHaveBeenCalledTimes(0);
  });

  it('renders after changing url prop', async () => {
    const page = await newSpecPage({
      components: [SisenseApp],
      html: `<sisense-app url="http://mock.url">children</sisense-app>`,
    });

    expect(mockedLibloader).toHaveBeenCalledTimes(1);

    page.root.setAttribute('url', 'http://another.url');

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <sisense-app url="http://another.url">
        <div id="sisenseApp">children</div>
      </sisense-app>
    `);

    expect(mockedLibloader).toHaveBeenCalledTimes(2);
    expect(mockedLibloader).toHaveBeenLastCalledWith(
      new URL('http://another.url/js/sisense.v1.js'),
    );
  });

  it('calls Sisense.connect with url', async () => {
    await newSpecPage({
      components: [SisenseApp],
      html: `<sisense-app url="http://mock.url">children</sisense-app>`,
    });

    expect(MockSisense.connect).toHaveBeenCalledTimes(1);
    expect(MockSisense.connect).toHaveBeenCalledWith(
      'http://mock.url',
      false,
      undefined,
    );
  });

  describe('contextRegistry', () => {
    it('registers itself to contextRegistry', async () => {
      const page = await newSpecPage({
        components: [SisenseApp],
        html: `<sisense-app url="http://mock.url">children</sisense-app>`,
      });

      expect(mockedContextRegistry.register).toHaveBeenCalledTimes(1);
      expect(mockedContextRegistry.register).toHaveBeenCalledWith(
        page.rootInstance,
      );
    });

    it('unregisters itself from contextRegistry', async () => {
      const page = await newSpecPage({
        components: [SisenseApp],
        html: `<sisense-app url="http://mock.url">children</sisense-app>`,
      });

      expect(mockedContextRegistry.unregister).toHaveBeenCalledTimes(0);

      page.root.remove();

      expect(mockedContextRegistry.unregister).toHaveBeenCalledTimes(1);
    });
  });

  describe('wat', () => {
    it('passes wat param forward', async () => {
      await newSpecPage({
        components: [SisenseApp],
        html: `<sisense-app url="http://mock.url" wat="token">children</sisense-app>`,
      });

      expect(mockedLibloader).toHaveBeenCalledTimes(1);
      expect(mockedLibloader).toHaveBeenCalledWith(
        new URL('http://mock.url/js/sisense.v1.js?wat=true'),
      );

      expect(MockSisense.connect).toHaveBeenCalledTimes(1);
      expect(MockSisense.connect).toHaveBeenCalledWith(
        'http://mock.url',
        false,
        'token',
      );
    });
  });

  describe('logout', () => {
    it('calls signout', async () => {
      const page = await newSpecPage({
        components: [SisenseApp],
        html: `<sisense-app url="http://mock.url">children</sisense-app>`,
      });

      await page.rootInstance.logout();

      expect(
        mockAppContext.$$dashboard.$identity.signout,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('_getContext', () => {
    it('waits for context to populate before returning', async () => {
      let mockConnectPromise, resolveConnect;

      MockSisense.connect.mockImplementation(() => {
        mockConnectPromise = new Promise(resolve => {
          resolveConnect = () => resolve(mockAppContext);
        });
        return mockConnectPromise;
      });

      const page = await newSpecPage({
        components: [SisenseApp],
        html: `<sisense-app url="http://mock.url">children</sisense-app>`,
      });

      expect(page.rootInstance.appContext).toBeFalsy();

      expect(page.rootInstance._getContext()).toEqual(mockConnectPromise);

      resolveConnect();

      await wait(0);

      expect(page.rootInstance.appContext).toEqual(mockAppContext);

      await expect(page.rootInstance._getContext()).resolves.toBe(
        mockAppContext,
      );
    });
  });

  describe('getModel', () => {
    it('returns', async () => {
      const page = await newSpecPage({
        components: [SisenseApp],
        html: `<sisense-app url="http://mock.url">children</sisense-app>`,
      });

      await expect(page.rootInstance.getModel()).resolves.toEqual({
        isTrial: true,
        user: {
          email: 'mockEmail',
          firstName: 'mockFirstName',
          lastName: 'mockLastName',
          oid: 'mockUid',
          role: {
            name: 'mockRoleName',
            oid: 'mockRoleId',
          },
          username: 'mockUserName',
        },
        version: 'mockVer',
      });
    });
  });
});
