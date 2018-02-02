/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import networkRendering from '../../src/network-rendering';

function checkLinkPath(linkPath) {
  expect(linkPath).to.be.a('string');
  expect(linkPath.length).to.be.within(100, 500);
  expect(linkPath.charAt(0)).to.equal('M');
  expect(linkPath.charAt(linkPath.length - 1)).to.equal('Z');
  expect(linkPath).to.not.contain('NaN');
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
      const linkPath = linkRenderer({
        source: {x: 10, y: 10, size: 10},
        target: {x: 20, y: 20, size: 10}
      });
      expect(linkPath).to.equal('');
    });

    it('should return non-empty link for overlapping nodes if large bend', () => {
      linkRenderer.bend(50);
      const linkPath = linkRenderer({
        source: {x: 10, y: 10, size: 10},
        target: {x: 20, y: 20, size: 10}
      });
      expect(linkRenderer.bend).to.have.been.calledOnce;
      expect(linkRenderer.bend()('dummy link')).to.equal(50);
      checkLinkPath(linkPath);
      linkRenderer.bend(20);
      expect(linkRenderer.bend).to.have.been.calledThrice;
    });

    it('should return a SVG path string for non-overlapping nodes', () => {
      const linkPath = linkRenderer({
        source: {x: 10, y: 10, size: 10},
        target: {x: 30, y: 20, size: 5}
      });
      expect(linkPath).to.contain('M');
      expect(linkPath.length).to.be.within(100, 500);
    });
  });

  describe('undirectedLink', () => {
    var linkRenderer;

    beforeEach(() => {
      spy(networkRendering, 'undirectedLink');
      linkRenderer = networkRendering.undirectedLink();
      spy(linkRenderer, 'width');
      spy(linkRenderer, 'bend');
    });

    it('undirectedLink should have been called once', () => {
      expect(networkRendering.undirectedLink).to.have.been.calledOnce;
    });

    it('should return empty link for overlapping nodes', () => {
      const linkPath = linkRenderer({
        source: {x: 10, y: 10, size: 10},
        target: {x: 20, y: 20, size: 10}
      });
      expect(linkPath).to.equal('');
    });

    it('should return non-empty link for overlapping nodes if large bend', () => {
      linkRenderer.bend(50);
      const linkPath = linkRenderer({
        source: {x: 10, y: 10, size: 10},
        target: {x: 20, y: 20, size: 10}
      });
      expect(linkRenderer.bend).to.have.been.calledOnce;
      expect(linkRenderer.bend()('dummy link')).to.equal(50);
      checkLinkPath(linkPath);
      linkRenderer.bend(20);
      expect(linkRenderer.bend).to.have.been.calledThrice;
    });

    it('should return a SVG path string for non-overlapping nodes', () => {
      const linkPath = linkRenderer({
        source: {x: 10, y: 10, size: 10},
        target: {x: 30, y: 20, size: 5}
      });
      expect(linkPath).to.contain('M');
      expect(linkPath.length).to.be.within(100, 500);
    });
  });
});
