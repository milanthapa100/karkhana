import Image from "next/image";

const RATIO = 2172 / 724;

export function Logo({ height = 32 }: { height?: number }) {
  return (
    <Image
      src="/dpk_logo.png"
      alt="DPK logo"
      width={Math.round(height * RATIO)}
      height={height}
      priority
      className="h-auto w-auto"
      style={{ height }}
      unoptimized
    />
  );
}
