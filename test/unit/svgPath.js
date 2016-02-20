import svgPath from '../../src/utils/svgPath';

describe('svgPath', () => {
  describe('svg path helpers', () => {
    it('should return correct primitive svg path strings', () => {
      expect(svgPath.M(1,2)).to.equal('M 1 2');
      expect(svgPath.moveTo(1,2)).to.equal('M 1 2');
      expect(svgPath.m(1,2)).to.equal('m 1 2');
      expect(svgPath.L(1,2)).to.equal('L 1 2');
      expect(svgPath.lineTo(1,2)).to.equal('L 1 2');
      expect(svgPath.l(1,2)).to.equal('l 1 2');
      expect(svgPath.Q(1,2,3,4)).to.equal('Q 1 2, 3 4');
      expect(svgPath.curveTo(1,2,3,4)).to.equal('Q 1 2, 3 4');
      expect(svgPath.Z()).to.equal('Z');
    });
    it('should return correct commplex svg path strings', () => {
      expect(svgPath.combine(
        svgPath.M(1,2),
        svgPath.L(3,4),
        svgPath.Q(5,6,7,8),
        svgPath.Z()
      )).to.equal('M 1 2 L 3 4 Q 5 6, 7 8 Z');
    });
  });
});
