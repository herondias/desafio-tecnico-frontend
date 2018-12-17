import home from './home.component';

describe('app', () => {

  describe('HomeController', () => {
    let ctrl;

    beforeEach(() => {
      angular.mock.module(home);

      angular.mock.inject(($controller) => {
        ctrl = $controller('HomeController', {});
      });
    });

    it('Deve conter o titulo da página', () => {
      expect(ctrl.title).toBe('Home');
    });
  });
});