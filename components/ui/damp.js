export function startDamp(update) {
  const values = new Map();
  let frame = 0;
  let alive = true;

  const tick = () => {
    if (!alive) return;
    update((key, target, amount = 0.16) => {
      const current = values.has(key) ? values.get(key) : target;
      const next = Math.abs(target - current) < 0.0015 ? target : current + (target - current) * amount;
      values.set(key, next);
      return next;
    });
    frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);
  return () => {
    alive = false;
    cancelAnimationFrame(frame);
  };
}
