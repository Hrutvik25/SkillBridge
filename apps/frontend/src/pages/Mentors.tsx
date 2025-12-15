import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { MentorCard } from "@/components/MentorCard";
import { Input } from "@/components/ui/input";
import { mentorsApi, Mentor } from "@/lib/api";

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMentors() {
      try {
        const data = await mentorsApi.getAll();
        setMentors(data);
        setFilteredMentors(data);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      }
      setLoading(false);
    }
    fetchMentors();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = mentors.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.skills?.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredMentors(filtered);
    } else {
      setFilteredMentors(mentors);
    }
  }, [searchQuery, mentors]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
              Meet Our Mentors
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Learn from industry experts who are passionate about sharing their knowledge and helping you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 bg-card border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, title, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 animate-pulse flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                  <div className="w-full md:w-56 lg:w-64 h-48 bg-muted rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredMentors.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-6">
                {filteredMentors.map((mentor, index) => (
                  <div
                    key={mentor._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <MentorCard
                      id={mentor._id}
                      name={mentor.name}
                      title={mentor.title}
                      bio={mentor.bio}
                      imageUrl={mentor.image_url}
                      skills={mentor.skills}
                      linkedin={mentor.linkedin}
                      twitter={mentor.twitter}
                      availability={mentor.availability}
                      compact={false}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No mentors found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search."
                  : "Our expert mentors are joining soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
