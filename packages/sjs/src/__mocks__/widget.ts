export class MockWidget {
  oid: string;
  container: HTMLElement;
  $$model;

  constructor(oid?: string) {
    this.oid = oid;
    this.$$model = {
      oid,
      title: 'mockTitle',
      type: 'mockType',
      subtype: 'mockSubtype',
      owner: 'mockOwner',
      userId: 'mockUserId',
      instanceType: 'mockInstanceType',
      datasource: 'mockDatasource',
      metadata: 'mockMetadata',
      style: 'mockStyle',
      destroy: jest.fn(),
    };
  }

  on() {}

  refresh() {}

  destroy() {}
}
