import pako from "pako";

export async function loadTgs(path) {
  const res = await fetch(path);
  const arrayBuffer = await res.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Decompress GZIP
  const jsonStr = new TextDecoder("utf-8").decode(pako.inflate(uint8Array));

  return JSON.parse(jsonStr);
}