import Image from "next/image";

const RATIO = 2172 / 724;

export function LogoMark({ collapsed }: { collapsed?: boolean }) {
  if (!collapsed) {
    return (
      <Image
        src="/dpk_logo.png"
        alt="DPK logo"
        width={Math.round(24 * RATIO)}
        height={24}
        priority
        className="h-auto w-auto"
        style={{ height: 24 }}
        unoptimized
      />
    );
  }

  return (
    <Image
      src="/dpk.png"
      alt="DPK logo"
      width={32}
      height={32}
      priority
      className="h-8 w-8 object-contain"
      unoptimized
    />
  );
}