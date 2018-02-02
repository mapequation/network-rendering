/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const M = (x, y) => `M ${x} ${y}`;
export const m = (x, y) => `m ${x} ${y}`;
export const L = (x, y) => `L ${x} ${y}`;
export const l = (x, y) => `l ${x} ${y}`;
export const Q = (x1, y1, x, y) => `Q ${x1} ${y1}, ${x} ${y}`;
export const q = (x1, y1, x, y) => `q ${x1} ${y1}, ${x} ${y}`;
export const Z = () => `Z`;

export default class SvgPath {
  constructor() {
    this._path = [];
    this._relative = false;
  }

  getString() { return this._path.join(' '); }

  relative() { this._relative = true; return this; }
  absolute() { this._relative = false; return this; }

  m(x, y) { this._path.push(m(x,y)); return this; }
  M(x, y) { this._path.push(M(x,y)); return this; }
  moveTo(x, y) { this._path.push(this._relative ? m(x, y) : M(x, y)); return this; }

  l(x, y) { this._path.push(l(x, y)); return this; }
  L(x, y) { this._path.push(L(x, y)); return this; }
  lineTo(x, y) { this._path.push(this._relative ? l(x, y) : L(x, y)); return this; }

  q(x1, y1, x, y) { this._path.push(q(x1, y1, x, y)); return this; }
  Q(x1, y1, x, y) { this._path.push(Q(x1, y1, x, y)); return this; }
  curveTo(x1, y1, x, y) { this._path.push(this._relative ? q(x1, y1, x, y) : Q(x1, y1, x, y)); return this; }

  Z() { this._path.push(Z()); return this; }
  end() { this._path.push(Z()); return this; }
}
