/**
 * Detects if device is mobile, tablet, tablet.
 * @function
 * @return {string} Returns a string of the device category.
 */
export default function getDevice() {
  let device = null;

  if (window.matchMedia('(max-width: 767px)').matches) {
    device = 'mobile';
  } else if (window.matchMedia('(max-width: 1279px)').matches) {
    device = 'tablet';
  } else {
    device = 'desktop';
  }

  return device;
}
