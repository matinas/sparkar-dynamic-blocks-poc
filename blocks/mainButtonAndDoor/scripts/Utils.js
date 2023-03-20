const R = require('Reactive');

/**
 * Converts a scalar signal specified in radians to a scalar signal in degrees
 * @param {ScalarSignal} signalInRadians scalar signal in radians
 */
export function RadToDeg(signalInRadians)
{
  return R.div(R.mul(signalInRadians, Math.PI), 180);
}