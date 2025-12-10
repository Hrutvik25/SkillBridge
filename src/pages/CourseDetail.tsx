// src/pages/CourseDetail.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Users, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MentorCard } from "@/components/MentorCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { coursesApi, enrollmentsApi, Course, Mentor } from "@/lib/api";

/**
 * CourseDetail (refactored)
 * - clearer loading / error states
 * - abort-safe fetch
 * - memoized handlers
 * - smaller subcomponents for readability
 * - improved accessibility and fallbacks
 */

const CourseHero: React.FC<{ course: Course; isEnrolled: boolean; enrolling: boolean; onEnroll: () => Promise<void>; }> = ({ course, isEnrolled, enrolling, onEnroll }) => {
  return (
    <section className="bg-gradient-hero py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
              {course.title}
            </h1>

            {course.short_description && (
              <p className="text-lg text-primary-foreground/80 mb-6">{course.short_description}</p>
            )}

            <div className="flex flex-wrap gap-6 text-primary-foreground/80 mb-8">
              {course.duration_weeks && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration_weeks} weeks</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>All Levels</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              {isEnrolled ? (
                <Button variant="hero" size="lg" disabled className="gap-2" aria-disabled>
                  <CheckCircle className="h-5 w-5" />
                  Enrolled
                </Button>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={onEnroll}
                  disabled={enrolling}
                  aria-busy={enrolling}
                >
                  {enrolling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      {course.price && Number(course.price) > 0 ? `Enroll for ₹${course.price}` : "Enroll for Free"}
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* About This Course section */}
            <div className="mt-8">
              <h2 className="text-2xl font-display font-bold text-primary-foreground mb-4">About This Course</h2>
              {course.full_description ? (
                <div className="prose prose-lg max-w-none text-primary-foreground/80" dangerouslySetInnerHTML={{ __html: course.full_description }} />
              ) : (
                <p className="text-primary-foreground/80">{course.short_description || "No description available."}</p>
              )}
            </div>

            {/* Course Details moved here below About This Course */}
            <div className="mt-8">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Course Details</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="font-medium text-foreground">{course.duration || "Not specified"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="font-medium text-foreground">{course.date || "Not specified"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Mode</dt>
                    <dd className="font-medium text-foreground">{course.mode && course.mode.length > 0 ? course.mode.join(", ") : "Not specified"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Price</dt>
                    <dd className="font-medium text-foreground">{course.price && Number(course.price) > 0 ? `₹${course.price}` : "Free"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="relative">
            {course.image_url ? (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full object-contain rounded-xl shadow-xl max-h-[500px]"
                loading="lazy"
              />
            ) : (
              <div className="w-full aspect-video bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                <span className="text-6xl font-display font-bold text-primary-foreground/30">{course.title?.charAt(0) ?? "C"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function CourseDetail(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!slug) {
      setError("Missing course identifier.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchCourse() {
      setLoading(true);
      setError(null);

      try {
        const data = await coursesApi.getBySlug(slug, { signal: controller.signal });
        setCourse(data.course);
        setMentors(data.mentors ?? []);
        setIsEnrolled(Boolean(data.isEnrolled));
      } catch (err: any) {
        if (err.name === 'AbortError') return; // fetch aborted
        console.error('Failed to fetch course:', err);
        setError('Unable to load course. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();

    return () => controller.abort();
  }, [slug]);

  const handleEnroll = useCallback(async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll in this course.",
        variant: "destructive",
      });
      return;
    }

    if (!course) return;

    setEnrolling(true);
    try {
      await enrollmentsApi.enroll(course._id);
      setIsEnrolled(true);
      toast({
        title: "Enrolled successfully!",
        description: `You're now enrolled in ${course.title}.`,
      });
    } catch (err) {
      console.error('Enrollment failed', err);
      toast({
        title: "Enrollment failed",
        description: "Unable to enroll. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  }, [user, course, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{error}</h1>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CourseHero course={course} isEnrolled={isEnrolled} enrolling={enrolling} onEnroll={handleEnroll} />

      {/* Mentors section remains at the bottom */}
      {mentors && mentors.length > 0 && (
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Course Mentors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor._id}
                  id={mentor._id}
                  name={mentor.name}
                  title={mentor.title}
                  bio={mentor.bio}
                  imageUrl={mentor.image_url}
                  skills={mentor.skills}
                  linkedin={mentor.linkedin}
                  twitter={mentor.twitter}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}