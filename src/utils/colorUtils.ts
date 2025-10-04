/**
 * Utility functions for color manipulation and detection
 */

/**
 * Determines if a hex color is light or dark based on relative luminance
 * @param hexColor - Hex color string (with or without #)
 * @returns true if the color is light, false if dark
 */
export const isLightColor = (hexColor: string): boolean => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance using standard formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if light (luminance > 0.5)
  return luminance > 0.5;
};

/**
 * Returns appropriate text color class based on background color
 * @param backgroundColor - Hex color string (with or without #)
 * @returns Tailwind CSS text color class
 */
export const getTextColor = (backgroundColor: string): string => {
  return isLightColor(backgroundColor) ? 'text-slate-900' : 'text-white';
};

/**
 * Converts RGB values to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Converts RGB values to RGBA string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 */
export const rgbToRgba = (r: number, g: number, b: number, alpha: number = 1): string => {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Generates a contrasting color (light or dark) based on background
 * @param backgroundColor - Hex color string (with or without #)
 * @param lightColor - Color to use for light backgrounds (default: slate-900)
 * @param darkColor - Color to use for dark backgrounds (default: white)
 * @returns Tailwind CSS color class
 */
export const getContrastingColor = (
  backgroundColor: string, 
  lightColor: string = 'text-slate-900', 
  darkColor: string = 'text-white'
): string => {
  return isLightColor(backgroundColor) ? lightColor : darkColor;
};
