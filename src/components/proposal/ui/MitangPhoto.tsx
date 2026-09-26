import Image from "next/image";

/**
 * The single MITANG photograph (26/09). Source: official public site,
 * mitang.com.br/survey-positioning, vessel deck during survey operation.
 * Original colour in `public/media/mitang-survey-deck-cor.jpg` (2420×1815);
 * the monochrome → colour shift is a scrubbed CSS filter (`.rp-photo`).
 * next/image serves AVIF/WebP at the rendered size.
 */
export const MITANG_PHOTO = {
  src: "/media/mitang-survey-deck-cor.jpg",
  alt: "Convés de embarcação durante operação de survey da MITANG",
  credit: "Imagem: MITANG · mitang.com.br",
};

type Props = {
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Fills its (positioned, sized) parent — the parent owns crop and ratio. */
export function MitangPhoto({ sizes, className = "", priority = false }: Props) {
  return (
    <Image
      src={MITANG_PHOTO.src}
      alt={MITANG_PHOTO.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
