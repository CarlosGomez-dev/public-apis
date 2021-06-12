export const colorFromString = string => {
  let hash = 0;
  for (let i = string.length - 1; i > 0; i--) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }

  const elementColors = {
    backgroundColor: color,
  };

  if (colorBrightness(color) > 128) {
    elementColors.color = '#000000';
  }

  return elementColors;
};

const colorBrightness = color => {
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(6, 7), 16);
  const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
  return brightness;
};
