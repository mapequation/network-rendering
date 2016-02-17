import networkRendering from '../../src/network-rendering';

describe('networkRendering', () => {
  describe('overlapping nodes', () => {
    beforeEach(() => {
      spy(networkRendering, 'halfLink');
      networkRendering.halfLink({
        source: {x: 10, y: 10, r: 10},
        target: {x: 20, y: 20, r: 10}
      });
    });

    it('halfLink should have been run once', () => {
      expect(networkRendering.halfLink).to.have.been.calledOnce;
    });

    it('halfLink should have always returned empty string', () => {
      expect(networkRendering.halfLink).to.have.always.returned('');
    });
  });
});
