import { MockDashboard } from '../../__mocks__/dashboard';
import { MockSisense } from '../../__mocks__/sisense';

export default jest.fn().mockImplementation(async () => {
  window.Sisense = MockSisense;
  window.Dashboard = MockDashboard;
});
