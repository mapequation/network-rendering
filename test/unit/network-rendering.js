import networkRendering from '../../src/network-rendering';

describe('networkRendering', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(networkRendering, 'greet');
      networkRendering.greet();
    });

    it('should have been run once', () => {
      expect(networkRendering.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(networkRendering.greet).to.have.always.returned('hello');
    });
  });
});
