import wrap from './wrap';

/**
 * Annotate a table expression to compute rolling aggregate or window
 * functions within a sliding window frame. For example, to specify a
 * rolling 7-day average centered on the current day, use rolling with
 * a frame value of [-3, 3].
 * @param {string|Function|Object} expr The table expression to annotate.
 * @param {[number?, number?]} [frame=[-Infinity, 0]] The sliding window frame
 *  offsets. Each entry indicates an offset from the current value. If an
 *  entry is non-finite, the frame will be unbounded in that direction,
 *  including all preceding or following values. If unspecified, the frame
 *  will include the current values and all preceding values.
 * @param {boolean} [ignorePeers=false] Indicates if the sliding window frame
 *  should ignore peer (tied) values. If false (the default), the window frame
 *  expands to include all peers. If true, the window frame is defined by the
 *  frame offsets only. This parameter only affects operations that depend on
 *  the window frame: aggregate functions and the first_value, last_value,
 *  and nth_value window functions.
 * @return A new wrapped expression annotated with rolling window parameters.
 * @example rolling(d => mean(d.colA), [-3, 3])
 */
export default function(expr, frame, ignorePeers) {
  return wrap(expr, {
    window: {
      frame: frame || [-Infinity, 0],
      peers: !ignorePeers
    }
  });
}