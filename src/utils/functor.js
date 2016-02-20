export default function functor(v) {
  return typeof v === 'function' ? v : () => v;
}
