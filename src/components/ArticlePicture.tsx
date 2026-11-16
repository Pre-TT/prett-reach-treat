import { useState } from "react";

export type ArticlePictureProps = {
  /** Public image URL. Empty / null renders nothing. */
  src: string | null | undefined;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * Image pulled from a table's picture column.
 * Renders nothing when the value is empty or the image fails to load,
 * so an empty column never leaves a placeholder or a broken-image icon.
 */
export function ArticlePicture({
  src,
  alt,
  className = "aspect-video w-full object-cover",
  loading = "lazy",
}: ArticlePictureProps) {
  const url = (src ?? "").trim();
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  if (!url || failedUrl === url) return null;

  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      onError={() => setFailedUrl(url)}
      className={className}
    />
  );
}
