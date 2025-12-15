import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, BookOpen, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { enrollmentsApi, profilesApi, Enrollment, Profile as ProfileType } from "@/lib/api";

export default function Profile() {
  const { user, isAdmin } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const [profileData, enrollmentsData] = await Promise.all([
          profilesApi.getMe(),
          enrollmentsApi.getAll(),
        ]);

        setProfile(profileData);
        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
      setLoading(false);
    }
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || "Profile"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-primary-foreground" />
              )}
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground">
                {profile?.full_name || "Welcome"}
              </h1>
              <p className="text-primary-foreground/80">{profile?.email}</p>
              {isAdmin && (
                <Badge className="mt-2" variant="secondary">
                  Admin
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link to="/courses">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BookOpen className="h-4 w-4" />
                      Browse Courses
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="default" className="w-full justify-start gap-2">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                My Courses ({enrollments.length})
              </h2>

              {enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="bg-card rounded-xl border border-border overflow-hidden flex flex-col sm:flex-row"
                    >
                      {/* Image */}
                      <div className="sm:w-48 flex-shrink-0">
                        {enrollment.course.image_url ? (
                          <img
                            src={enrollment.course.image_url}
                            alt={enrollment.course.title}
                            className="w-full h-32 sm:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-32 sm:h-full bg-muted flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {enrollment.course.title}
                          </h3>
                          {enrollment.course.short_description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {enrollment.course.short_description}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Enrolled{" "}
                            {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Link to={`/courses/${enrollment.course.slug}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              Continue Learning
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/50 rounded-xl p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No courses yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start your learning journey by enrolling in a course.
                  </p>
                  <Link to="/courses">
                    <Button>
                      Browse Courses
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
