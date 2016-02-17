
export const M = (x, y) => `M ${x} ${y}`;
export const m = (x, y) => `m ${x} ${y}`;
export const L = (x, y) => `L ${x} ${y}`;
export const l = (x, y) => `l ${x} ${y}`;
export const Q = (x1, y1, x, y) => `Q ${x1} ${y1}, ${x} ${y}`;
export const Z = () => `Z`;

export const combine = (...primitives) => primitives.join(' ');

// Alias
export const moveTo = M;
export const lineTo = L;
export const curveTo = Q;
export const end = Z;
