import svgPath from './utils/svgPath';
import functor from './utils/functor';

export function halfLink() {

  var _x0 = (d) => d.source.x;
  var _y0 = (d) => d.source.y;
  var _r0 = (d) => d.source.r;
  var _x1 = (d) => d.target.x;
  var _y1 = (d) => d.target.y;
  var _r1 = (d) => d.target.r;
  var _width = (d) => d.width || 10;
  var _bend = (d) => d.bend || 30; // Use average if opposite bend differ
  var _oppositeLink = (d) => null;

  renderHalfLink.x0 = function(_) { if (!arguments.length) { return _x0; } _x0 = functor(_); return renderHalfLink; };
  renderHalfLink.y0 = function(_) { if (!arguments.length) { return _y0; } _y0 = functor(_); return renderHalfLink; };
  renderHalfLink.r0 = function(_) { if (!arguments.length) { return _r0; } _r0 = functor(_); return renderHalfLink; };
  renderHalfLink.x1 = function(_) { if (!arguments.length) { return _x1; } _x1 = functor(_); return renderHalfLink; };
  renderHalfLink.y1 = function(_) { if (!arguments.length) { return _y1; } _y1 = functor(_); return renderHalfLink; };
  renderHalfLink.r1 = function(_) { if (!arguments.length) { return _r1; } _r1 = functor(_); return renderHalfLink; };
  renderHalfLink.width = function(_) { if (!arguments.length) { return _width; } _width = functor(_); return renderHalfLink; };
  renderHalfLink.bend = function(_) { if (!arguments.length) { return _bend; } _bend = functor(_); return renderHalfLink; };
  renderHalfLink.oppositeLink = function(_) { if (!arguments.length) { return _oppositeLink; } _oppositeLink = functor(_); return renderHalfLink; };

  function renderHalfLink(d) {
    const x0 = _x0(d);
    const y0 = _y0(d);
    const r0 = _r0(d);
    const x1 = _x1(d);
    const y1 = _y1(d);
    const r1 = _r1(d);
    const width = _width(d);
    const oppositeLink = _oppositeLink(d);
    const bend = oppositeLink ? (_bend(oppositeLink) + _bend(d)) / 2 : _bend(d);
    const oppositeWidth = oppositeLink ? _width(oppositeLink) : width;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const l = Math.sqrt(dx * dx + dy * dy);
    const lBetween = l - r0 - r1;

    // Skip draw link of nodes overlap if not big bend
    if (lBetween <= 0 && Math.abs(bend) < 50) {
      return '';
    }

    // Get unit vector in direction and perpendicular
    const dir = {x: dx / l, y: dy / l};
    const right = {x: -dir.y, y: dir.x};

    // Size of arrowhead
    const tipLength = Math.min(lBetween / 3, 10 * Math.pow(width, 1 / 3));
    const tipWidth = 2 * Math.pow(width, 1 / 2); // excluding the line width

    // Size of opposite arrowhead
    const oppositeTipLength = Math.min(lBetween / 3, 10 * Math.pow(oppositeWidth, 1 / 3));

    // Curvature
    const positiveCurvature = dir.x > 0 || (dir.x == 0 && dir.y < 0);
    const curvatureSign = positiveCurvature ? 1 : -1;
    const outerBendAddition = Math.pow(bend / 10, 0.4);
    const signedBend = bend * curvatureSign;

    // Calculate the end points for the middle bezier curve. Rotate them towards the control point later.
    const x02tmp = x0 + (r0 + oppositeTipLength) * dir.x;
    const y02tmp = y0 + (r0 + oppositeTipLength) * dir.y;
    const x12tmp = x1 - (r1 + tipLength) * dir.x;
    const y12tmp = y1 - (r1 + tipLength) * dir.y;

    const xMidpoint = 0.5 * (x02tmp + x12tmp);
    const yMidpoint = 0.5 * (y02tmp + y12tmp);
    const xCP1 = xMidpoint + signedBend * right.x;
    const yCP1 = yMidpoint + signedBend * right.y;
    const xCP2 = xMidpoint + (signedBend + width + outerBendAddition) * right.x;
    const yCP2 = yMidpoint + (signedBend + width + outerBendAddition) * right.y;

    // points from source to control point
    const dx1 = xCP1 - x0;
    const dy1 = yCP1 - y0;
    const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const dir0 = {x: dx1 / l1, y: dy1 / l1};
    const right0 = {x: -dir0.y, y: dir0.x};
    const x01 = x0 + r0 * dir0.x;
    const y01 = y0 + r0 * dir0.y;
    const x02 = x01 + oppositeTipLength * dir0.x;
    const y02 = y01 + oppositeTipLength * dir0.y;
    const x03 = x02 + width * right0.x;
    const y03 = y02 + width * right0.y;
    const x04 = x0 + width * right0.x;
    const y04 = y0 + width * right0.y;

    // points from target to control point
    const dx2 = xCP1 - x1;
    const dy2 = yCP1 - y1;
    const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const dir1 = {x: dx2 / l2, y: dy2 / l2};
    const x11 = x1 + r1 * dir1.x;
    const y11 = y1 + r1 * dir1.y;
    const x12 = x11 + tipLength * dir1.x;
    const y12 = y11 + tipLength * dir1.y;
    const left1 = {x: dir1.y, y: -dir1.x};
    const x13 = x12 + width * left1.x;
    const y13 = y12 + width * left1.y;
    const x14 = x13 + tipWidth * left1.x;
    const y14 = y13 + tipWidth * left1.y;

    return svgPath.combine(
      svgPath.moveTo(x02, y02),
      svgPath.lineTo(x0, y0),
      svgPath.lineTo(x04, y04),
      svgPath.lineTo(x03, y03),
      svgPath.curveTo(xCP2, yCP2, x13, y13),
      svgPath.lineTo(x14, y14),
      svgPath.lineTo(x11, y11),
      svgPath.lineTo(x12, y12),
      svgPath.curveTo(xCP1, yCP1, x02, y02),
      svgPath.end()
    );
  }

  return renderHalfLink;
}

const networkRendering = {
  svgPath,
  halfLink,
};

export default networkRendering;
