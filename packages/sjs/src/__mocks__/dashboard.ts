export class MockDashboard {
  oid;
  datasource;
  $$model = {
    filters: { update: jest.fn(), remove: jest.fn(), clear: jest.fn() },
    widgets: [],
    oid: 'mockOid',
    title: 'mockTitle',
    description: 'mockDescription',
    instanceType: 'mockInstanceType',
    owner: 'mockOwner',
    userId: 'mockUserId',
    datasource: 'mockDatasource',
    defaultFilters: '',
  };

  constructor(oid?: string) {
    this.oid = oid;
  }

  refresh() {}

  on() {}
}
