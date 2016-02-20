import networkRendering from '../../src/network-rendering';

function checkLink(link) {
  expect(link).to.be.a('string');
  expect(link.length).to.be.within(100, 500);
  expect(link.charAt(0)).to.equal('M');
  expect(link.charAt(link.length - 1)).to.equal('Z');
  expect(link).to.not.contain('NaN');
}

describe('networkRendering', () => {
  describe('halfLink', () => {
    var linkRenderer;

    beforeEach(() => {
      spy(networkRendering, 'halfLink');
      linkRenderer = networkRendering.halfLink();
      spy(linkRenderer, 'width');
      spy(linkRenderer, 'bend');
    });

    it('halfLink should have been called once', () => {
      expect(networkRendering.halfLink).to.have.been.calledOnce;
    });

    it('should return empty link for overlapping nodes', () => {
      const link = linkRenderer({
        source: {x: 10, y: 10, r: 10},
        target: {x: 20, y: 20, r: 10}
      });
      expect(link).to.equal('');
    });

    it('should return non-empty link for overlapping nodes if large bend', () => {
      linkRenderer.bend(50);
      const link = linkRenderer({
        source: {x: 10, y: 10, r: 10},
        target: {x: 20, y: 20, r: 10}
      });
      expect(linkRenderer.bend).to.have.been.calledOnce;
      expect(linkRenderer.bend()(link)).to.equal(50);
      checkLink(link);
      linkRenderer.bend(20);
      expect(linkRenderer.bend).to.have.been.calledThrice;
    });

    it('should return a SVG path string for non-overlapping nodes', () => {
      const link = linkRenderer({
        source: {x: 10, y: 10, r: 10},
        target: {x: 30, y: 20, r: 5}
      });
      expect(link).to.contain('M');
      expect(link.length).to.be.within(100, 500);
    });
  });
});
