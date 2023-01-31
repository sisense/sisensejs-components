export const MockSisense = {
  connect: jest.fn(),
  internalScope: {
    prism: {
      version: 'mockVer',
      license: { isTrial: true },
      user: {
        _id: 'mockUid',
        email: 'mockEmail',
        userName: 'mockUserName',
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        roleId: 'mockRoleId',
        roleName: 'mockRoleName',
      },
    },
    Highcharts: {
      charts: {},
    },
  },
};
