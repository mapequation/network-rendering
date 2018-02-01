/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 
import SvgPath, * as primitives from '../../src/utils/SvgPath';

describe('SvgPath', () => {
  describe('svg path helpers', () => {
    it('should return correct primitive svg path strings', () => {
      expect(primitives.M(1,2)).to.equal('M 1 2');
      expect(primitives.m(1,2)).to.equal('m 1 2');
      expect(primitives.L(1,2)).to.equal('L 1 2');
      expect(primitives.l(1,2)).to.equal('l 1 2');
      expect(primitives.Q(1,2,3,4)).to.equal('Q 1 2, 3 4');
      expect(primitives.Z()).to.equal('Z');
    });
    it('should return correct commplex svg path strings', () => {
      expect(new SvgPath()
        .M(1,2)
        .L(3,4)
        .Q(5,6,7,8)
        .Z()
        .getString()
      ).to.equal('M 1 2 L 3 4 Q 5 6, 7 8 Z');
    });
    it('should return default absolute svg path', () => {
      expect(new SvgPath()
        .moveTo(1,2)
        .lineTo(3,4)
        .curveTo(5,6,7,8)
        .end()
        .getString()
      ).to.equal('M 1 2 L 3 4 Q 5 6, 7 8 Z');
    });
    it('should return correct absolute svg path', () => {
      expect(new SvgPath()
        .absolute()
        .moveTo(1,2)
        .lineTo(3,4)
        .curveTo(5,6,7,8)
        .end()
        .getString()
      ).to.equal('M 1 2 L 3 4 Q 5 6, 7 8 Z');
    });
    it('should return correct relative svg path', () => {
      expect(new SvgPath()
        .relative()
        .moveTo(1,2)
        .lineTo(3,4)
        .curveTo(5,6,7,8)
        .end()
        .getString()
      ).to.equal('m 1 2 l 3 4 q 5 6, 7 8 Z');
    });
    it('should return correct mix of absolute and relative svg path', () => {
      expect(new SvgPath()
        .moveTo(1,2)
        .relative()
        .lineTo(3,4)
        .lineTo(5,6)
        .absolute()
        .lineTo(7,8)
        .lineTo(9,10)
        .end()
        .getString()
      ).to.equal('M 1 2 l 3 4 l 5 6 L 7 8 L 9 10 Z');
    });
  });
});
