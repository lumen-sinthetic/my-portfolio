/** biome-ignore-all lint/suspicious/noDoubleEquals: <>*/

const selfURL = process.env.NEXT_PUBLIC_SELF_URL;
if (!selfURL) {
  throw new Error("NEXT_PUBLIC_SELF_URL env not found");
}

export { selfURL };
