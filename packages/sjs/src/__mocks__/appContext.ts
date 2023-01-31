export const mockAppContext = {
  dashboards: {
    load: jest.fn(),
    add: jest.fn(),
  },
  $$dashboard: { $identity: { signout: jest.fn() } },
};
