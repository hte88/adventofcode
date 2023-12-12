export function isNumber(x: string) {
  return /\d/.test(x);
}

export function extractSymboles(fileContent: string, excludes: string[]) {
  const regex = new RegExp(`[\\d${excludes.join('')}\\n]`, 'g');
  const symboles = fileContent?.replace(regex, '');
  return [...new Set(symboles)];
}

export function createMapFile(arrayToMap: string[]) {
  const mapFile = new Map();
  arrayToMap?.forEach((row, rowIndex) => {
    Array.from(row).forEach((str, colIndex) => {
      mapFile.set(`${rowIndex},${colIndex}`, str);
    });
  });
  return mapFile;
}
