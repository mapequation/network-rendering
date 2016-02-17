import svgPath from './svgPath';

export function halfLink(d) {
  const {source, target, width = 10, bend = 20} = d;
  const oppositeWidth = d.oppositeWidth || width;
  const x0 = source.x;
  const y0 = source.y;
  const r0 = source.r;
  const x1 = target.x;
  const y1 = target.y;
  const r1 = target.r;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const l = Math.sqrt(dx * dx + dy * dy);
  const lBetween = l - r0 - r1;

  // Skip draw link of nodes overlap if not big bend
  if (lBetween <= 0 && Math.abs(bend) < 30) {
    return '';
  }

  // Get unit vector in direction and perpendicular
  const dir = {x: dx / l, y: dy / l};
  const right = {x: -dir.y, y: dir.x};

  // Size of arrowhead
  const w = width;
  const tipLength = Math.min(lBetween / 3, 10 * Math.pow(w, 1 / 3));
  const tipWidth = 2 * Math.pow(w, 1 / 2); // excluding the line width

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
  const xCP2 = xMidpoint + (signedBend + w + outerBendAddition) * right.x;
  const yCP2 = yMidpoint + (signedBend + w + outerBendAddition) * right.y;

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
  const x03 = x02 + w * right0.x;
  const y03 = y02 + w * right0.y;
  const x04 = x0 + w * right0.x;
  const y04 = y0 + w * right0.y;

  // points from target (where the arrow is) to control point
  const dx2 = xCP1 - x1;
  const dy2 = yCP1 - y1;
  const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const dir1 = {x: dx2 / l2, y: dy2 / l2};
  const x11 = x1 + r1 * dir1.x;
  const y11 = y1 + r1 * dir1.y;
  const x12 = x11 + tipLength * dir1.x;
  const y12 = y11 + tipLength * dir1.y;
  const left1 = {x: dir1.y, y: -dir1.x};
  const x13 = x12 + w * left1.x;
  const y13 = y12 + w * left1.y;
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

const networkRendering = {
  svgPath,
  halfLink,
};

export default networkRendering;
