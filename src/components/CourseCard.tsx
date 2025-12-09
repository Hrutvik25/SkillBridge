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
}

export function CourseCard({
  title,
  slug,
  shortDescription,
  imageUrl,
  price,
  durationWeeks,
  tags,
}: CourseCardProps) {
  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
            <span className="text-primary-foreground/50 text-lg font-display">
              {title.charAt(0)}
            </span>
          </div>
        )}
        {price !== null && price > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
            ${price}
          </div>
        )}
        {price === 0 && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-bold">
            Free
          </div>
        )}
      </div>

      {/* Content */}
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

        {/* Meta */}
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
