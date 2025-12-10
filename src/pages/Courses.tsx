import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { coursesApi, Course } from "@/lib/api";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await coursesApi.getAll();
        setCourses(data);
        setFilteredCourses(data);

        // Extract unique tags
        const tags = new Set<string>();
        data.forEach((course) => {
          course.tags?.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
      setLoading(false);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          (course.course_name || course.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (course.description || course.short_description)?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((course) =>
        selectedTags.some((tag) => course.tags?.includes(tag))
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedTags, courses]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Discover courses designed to help you master new skills and advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-card border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {allTags.slice(0, 6).map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {(searchQuery || selectedTags.length > 0) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Course Grid (now a responsive wrap layout) */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-wrap gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-5 animate-pulse" style={{ minWidth: 280, maxWidth: 420 }}>
                  <div className="w-full h-40 bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-full mb-4" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
              </p>

              {/* layout uses flex-wrap so cards with different widths fit naturally */}
              <div className="flex flex-wrap gap-6">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CourseCard
                      id={course._id}
                      title={course.course_name || course.title}
                      slug={course.slug}
                      shortDescription={course.description || course.short_description}
                      imageUrl={course.image || course.image_url}
                      price={course.price ? Number(course.price) : null}
                      durationWeeks={course.duration_weeks}
                      tags={course.tags}
                      // optional: pass a desired max display width (px)
                      maxDisplayWidth={420}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Our Approach & Why Choose Us (unchanged) */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mt-12 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10 text-center">
              Our Learning Approach
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-7 border border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Free Counselling</h3>
                <p className="text-base text-muted-foreground">
                  Have a session with our expert mentors to design your personalized roadmap to success.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-7 border border-purple-200 dark:border-purple-800">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Explore Industries</h3>
                <p className="text-base text-muted-foreground">
                  Understand diverse industries and uncover potential career opportunities aligned with your goals.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-7 border border-green-200 dark:border-green-800">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Be Industry Ready</h3>
                <p className="text-base text-muted-foreground">
                  Learn from Industry & Domain experts with real-world experience and practical insights.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
            <h2 className="text-3xl font-display font-bold text-foreground mb-7">
              Why Choose SKILLBRIDGE?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">✓</span>
                <p className="text-base text-muted-foreground">Industry-experienced trainers and mentors</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">✓</span>
                <p className="text-base text-muted-foreground">Blend of technical, business training and soft skills</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">✓</span>
                <p className="text-base text-muted-foreground">Commitment to employability and career success</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">✓</span>
                <p className="text-base text-muted-foreground">Supportive learning environment and post-training guidance</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">✓</span>
                <p className="text-base text-muted-foreground">Customised programs as per individual aspiration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
