export const colors = {
  dark: "#000000",
  grey: "#404040",
  lightgrey: "#606060",
  powder: "#f2bd6b",
  water: "#4040ff",
  fire: "#ff4040",
  seed: "#90c040",
  gunPowder: "#b08050",
  fan: "#8080ff",
  ice: "#d0d0ff",
  sBall: "#ff40a0",
  clone: "#907010",
  fireworks: "#ff9966",
  oil: "#803020",
  c4: "#ffffcc",
  stone: "#808080",
  magma: "#ff6633",
  virus: "#800080",
  nitro: "#447700",
  ant: "#c080c0",
  torch: "#ffa020",
  gas: "#cc9999",
  soapy: "#e0e0e0",
  thunder: "#ffff20",
  metal: "#404040",
  bomb: "#666600",
  laser: "#cc0000",
  acid: "#ccff00",
  vine: "#00bb00",
  salt: "#ffffff",
  glass: "#404040",
  bird: "#807050",
  mercury: "#aaaaaa",
  spark: "#ffcc33",
  fuse: "#443322",
  cloud: "#cccccc",
  pump: "#003333",
};

const loadImage = async (url: string, elem: HTMLImageElement) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    elem.onload = () => resolve(elem);
    elem.onerror = reject;
    elem.src = url;
  });

export const setupContext = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = "high";
  return ctx;
};

export const drawDanballPlayArea = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  const width = canvas.width;
  const height = canvas.height;

  const playAreaHeight = height / 1.5;

  ctx.fillStyle = colors.dark;
  ctx.fillRect(0, 0, width, playAreaHeight);

  ctx.fillStyle = colors.lightgrey;
  const borderWidth = 6;
  ctx.fillRect(0, 0, width, borderWidth);
  ctx.fillRect(0, 0, borderWidth, playAreaHeight);
  ctx.fillRect(width - borderWidth, 0, borderWidth, playAreaHeight);
  ctx.fillRect(0, playAreaHeight - borderWidth, width, borderWidth);

  return { playAreaHeight };
};

export const drawConjamLogo = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  logoSrc: string,
  playAreaHeight: number
) => {
  const width = canvas.width;
  const conjam = await loadImage(logoSrc, new Image());
  const imageHeight = playAreaHeight / 1.6;
  ctx.drawImage(
    conjam,
    0,
    playAreaHeight / 2 - imageHeight / 2.5,
    width,
    imageHeight
  );
};

export const setupDanballFont = async (
  ctx: CanvasRenderingContext2D,
  fontSrc: string
) => {
  const danballFont = await loadImage(fontSrc, new Image());

  const charWidth = 8;
  const charHeight = danballFont.height;
  const offscreen = new OffscreenCanvas(charWidth, charHeight);
  const offscreenCtx = offscreen.getContext("2d");

  const charToPosInImage = (char: string) => {
    const charCode = char.charCodeAt(0);
    const x = (charCode - 32) * charWidth;
    return { x, y: 0 };
  };

  const drawChar = (
    char: string,
    size: number,
    x: number,
    y: number,
    color: string
  ) => {
    const { x: charX, y: charY } = charToPosInImage(char);

    offscreenCtx.clearRect(0, 0, charWidth, charHeight);
    offscreenCtx.drawImage(
      danballFont,
      charX,
      charY,
      charWidth,
      charHeight,
      0,
      0,
      charWidth,
      charHeight
    );

    const imageData = offscreenCtx.getImageData(0, 0, charWidth, charHeight);
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 255) {
        imageData.data[i] = parseInt(color.slice(1, 3), 16);
        imageData.data[i + 1] = parseInt(color.slice(3, 5), 16);
        imageData.data[i + 2] = parseInt(color.slice(5, 7), 16);
      }
    }
    offscreenCtx.putImageData(imageData, 0, 0);

    ctx.drawImage(
      offscreen,
      0,
      0,
      charWidth,
      charHeight,
      x * size,
      y * size,
      charWidth * size,
      charHeight * size
    );
  };

  const drawString = (
    str: string,
    size: number,
    x: number,
    y: number,
    color: string
  ) => {
    for (let i = 0; i < str.length; i++) {
      drawChar(str[i], size, x + i * charWidth, y, color);
    }
  };

  const widthFromStringAndSize = (str: string, size: number) =>
    str.length * charWidth * size;

  return { drawString, widthFromStringAndSize };
};

/*
  let string: string;
  let stringWidth: number;
  let size: number;
  let x, y: number;

  string = "another COMPSCI BOI gamejam";
  size = 2.6;
  stringWidth = widthFromStringAndSize(string, size);
  x = width / size / 2 - stringWidth / size / 2;
  y = playAreaHeight / size + 6;
  drawString(string, size, x, y, colors.fire);

  string = "conway's game of life / falling sand / cellular automata like";
  size = 1.15;
  stringWidth = widthFromStringAndSize(string, size);
  x = width / size / 2 - stringWidth / size / 2;
  y = playAreaHeight / size + 50;
  drawString(string, size, x, y, colors.acid);

  string = "FROM NOW TILL APRIL 26th, FIGURE OUT YOUR TECH!";
  size = 1.49;
  stringWidth = widthFromStringAndSize(string, size);
  x = width / size / 2 - stringWidth / size / 2;
  y = playAreaHeight / size + 55;
  drawString(string, size, x, y, colors.sBall);

  string = "- making a basic demo now is encouraged -";
  size = 1.6;
  stringWidth = widthFromStringAndSize(string, size);
  x = width / size / 2 - stringWidth / size / 2;
  y = playAreaHeight / size + 70;
  drawString(string, size, x, y, colors.fireworks);

  string = "APRIL 26th -> MAY 5th, JAMMING TIME!";
  size = 1.95;
  stringWidth = widthFromStringAndSize(string, size);
  x = width / size / 2 - stringWidth / size / 2;
  y = playAreaHeight / size + 75;
  drawString(string, size, x, y, colors.vine);

  string = "may your sand fall and your cells live";
  size = 1.4;
  stringWidth = widthFromStringAndSize(string, size);
  x = width / size / 2 - stringWidth / size / 2;
  y = playAreaHeight / size + 132.5;
  drawString(string, size, x, y, colors.ice);
};
*/
