import { Link } from "react-router-dom";
import { Linkedin, Twitter, Info } from "lucide-react";

interface MentorCardProps {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  imageUrl: string | null;
  skills: string[] | null;
  linkedin: string | null;
  twitter: string | null;
  availability?: string | null;
  compact?: boolean;
}

export function MentorCard({
  id,
  name,
  title,
  bio,
  imageUrl,
  skills,
  linkedin,
  twitter,
  availability,
  compact = false,
}: MentorCardProps) {
  // Compact version for home page grid
  if (compact) {
    return (
      <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl p-1 shadow-lg m-4 flex justify-center flex-shrink-0">
          <div className="bg-card rounded-xl p-4 text-center min-w-[160px]">
            {/* LinkedIn Icon */}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 p-1.5 bg-[#0077B5] rounded-md text-white hover:bg-[#005885] transition-colors z-10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            
            {/* Circular Image */}
            <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-3 rounded-full overflow-hidden border-4 border-cyan-400 bg-muted">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                  <span className="text-primary-foreground text-3xl font-display font-bold">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Name & Title in dark box */}
            <div className="bg-foreground rounded-lg py-2 px-3 -mx-1 -mb-1">
              <h4 className="text-background font-semibold text-sm truncate">
                {name}
              </h4>
              {title && (
                <p className="text-muted text-xs mt-0.5 truncate">
                  {title}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
      {/* Left Content */}
      <div className="flex-1 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary flex-shrink-0" />
          <Link to={`/mentors/${id}`}>
            <h3 className="text-xl font-semibold text-primary hover:underline transition-colors">
              {name}
            </h3>
          </Link>
        </div>
        {availability && (
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Available: {availability.replace("-", " ")}</p>
        )}

        {bio && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 md:line-clamp-none">
            {bio}
          </p>
        )}
      </div>

      {/* Right Side - Image Card */}
      <div className="w-full md:w-56 lg:w-64 p-4 md:p-6 flex justify-center md:justify-end flex-shrink-0">
        <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl p-1 shadow-lg w-fit">
          <div className="bg-card rounded-xl p-4 text-center min-w-[160px]">
            {/* LinkedIn Icon */}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 p-1.5 bg-[#0077B5] rounded-md text-white hover:bg-[#005885] transition-colors z-10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            
            {/* Circular Image */}
            <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-3 rounded-full overflow-hidden border-4 border-cyan-400 bg-muted">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                  <span className="text-primary-foreground text-3xl font-display font-bold">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Name & Title in dark box */}
            <div className="bg-foreground rounded-lg py-2 px-3 -mx-1 -mb-1">
              <h4 className="text-background font-semibold text-sm truncate">
                {name}
              </h4>
              {title && (
                <p className="text-muted text-xs mt-0.5 truncate">
                  {title}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
