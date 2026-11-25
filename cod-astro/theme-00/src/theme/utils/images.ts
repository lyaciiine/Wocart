/**
 * The theme's ONE image binding: the SDK's helpers, at the sizes this theme
 * shows, taking the store's media delivery (`Astro.locals.store.config.media`).
 *
 * - **Server-only callers.** Pages and components pass the request's config;
 *   browser scripts never import this module.
 * - **A photo that cannot be resized keeps its URL** (a `direct` delivery,
 *   local development): callers never branch on it.
 * - **One binding point.** A size missing here is added here, not rebuilt in
 *   a component.
 */
import { mediaImageUrl, pictureOf, type MediaDelivery, type PickedImage, type Picture } from "@wocart/storefront";

const THUMBNAIL = { width: 80, height: 80, fit: "cover", format: "auto", quality: 80 } as const;

/** A photo at its original URL, without resizing, format conversion or quality transformation. */
export const imageSource = (src: string, _media: MediaDelivery, _width: number): string =>
  src;

/** No responsive variants: the landing page uses the original uploaded image URL. */
export const imageSrcset = (_src: string, _media: MediaDelivery, _widths: readonly number[]): string | undefined =>
  undefined;

/** A product's cart thumbnail. */
export const thumbnailImage = (src: string, media: MediaDelivery): string => mediaImageUrl(src, THUMBNAIL, media) ?? src;

/**
 * An image the merchant chose in the editor, ready to show: an `image` field
 * stores the image's Media Key, never a URL; this gives its URL, alt text and
 * `object-position` from its focal point.
 */
export const pickedPicture = (image: PickedImage | null | undefined, media: MediaDelivery): Picture | null => pictureOf(image, media);
