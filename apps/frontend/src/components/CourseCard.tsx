import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  imageUrl: string | null;
  price: number | null;
  durationWeeks: number | null;
  tags: string[] | null;
  /**
   * Optional max width for the displayed image (px).
   * Helps keep layout consistent across very large images.
   */
  maxDisplayWidth?: number;
}

export function CourseCard({
  title,
  slug,
  shortDescription,
  imageUrl,
  price,
  durationWeeks,
  tags,
  maxDisplayWidth = 420,
}: CourseCardProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [cardWidth, setCardWidth] = useState<number | "100%">("100%");

  function onImageLoad() {
    const img = imgRef.current;
    if (!img) return;

    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;

    // Determine effective display width:
    // Limit to maxDisplayWidth but also ensure it doesn't overflow viewport.
    const viewportW = typeof window !== "undefined" ? window.innerWidth : maxDisplayWidth;
    // keep some margin so card doesn't touch edges
    const maxAllowed = Math.min(maxDisplayWidth, Math.floor(viewportW - 64));

    // If naturalW is zero fallback to maxAllowed
    let displayW = naturalW || maxAllowed;
    if (displayW > maxAllowed) displayW = maxAllowed;

    // For very small images, ensure a minimum width so layout looks consistent
    const minWidth = 260;
    if (displayW < minWidth) displayW = Math.max(displayW, minWidth);

    setCardWidth(displayW);
  }

  // Inline style to set card width. On very small screens, let it be 100%.
  const wrapperStyle: React.CSSProperties = {
    width: typeof cardWidth === "number" ? `${cardWidth}px` : "100%",
    minWidth: 0,
  };

  return (
    <div
      className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={wrapperStyle}
    >
      {/* -------- IMAGE (card width = image width) -------- */}
      <div
        className="relative w-full overflow-hidden bg-muted flex items-center justify-center"
        // keep the image area flexible in height; image will keep aspect ratio
      >
        {imageUrl ? (
          <img
            ref={imgRef}
            src={imageUrl}
            alt={title}
            onLoad={onImageLoad}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            style={{ display: "block" }}
          />
        ) : (
          <div className="w-full py-10 flex items-center justify-center bg-gradient-hero">
            <span className="text-primary-foreground/50 text-2xl font-display">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Price Badge */}
        {price !== null && price > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
            ₹{price}
          </div>
        )}

        {/* Free Badge */}
        {price === 0 && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-bold">
            Free
          </div>
        )}
      </div>

      {/* ------------- CONTENT ------------- */}
      <div className="p-5">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        {shortDescription && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {shortDescription}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          {durationWeeks && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{durationWeeks} weeks</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>All levels</span>
          </div>
        </div>

        {/* CTA */}
        <Link to={`/courses/${slug}`}>
          <Button variant="outline" className="w-full group/btn">
            View Course
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
