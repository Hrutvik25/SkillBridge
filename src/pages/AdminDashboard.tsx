import { useEffect, useState } from "react";
import { Users, BookOpen, GraduationCap, Mail, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { adminApi, Course, Mentor, AdminStats } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({ users: 0, courses: 0, mentors: 0, enrollments: 0, messages: 0 });
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states
  const [mentorForm, setMentorForm] = useState({ name: "", title: "", bio: "", skills: "" });
  const [courseForm, setCourseForm] = useState({ title: "", slug: "", short_description: "", price: "0" });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await adminApi.getStats();
      setStats(data.stats);
      setCourses(data.courses);
      setMentors(data.mentors);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
    setLoading(false);
  }

  async function addMentor() {
    try {
      await adminApi.addMentor({
        name: mentorForm.name,
        title: mentorForm.title || null,
        bio: mentorForm.bio || null,
        skills: mentorForm.skills ? mentorForm.skills.split(",").map(s => s.trim()) : [],
        active: true,
      });
      toast({ title: "Mentor added" });
      setMentorForm({ name: "", title: "", bio: "", skills: "" });
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  async function addCourse() {
    try {
      await adminApi.addCourse({
        title: courseForm.title,
        slug: courseForm.slug || courseForm.title.toLowerCase().replace(/\s+/g, "-"),
        short_description: courseForm.short_description || null,
        price: parseFloat(courseForm.price) || 0,
        published: true,
      });
      toast({ title: "Course added" });
      setCourseForm({ title: "", slug: "", short_description: "", price: "0" });
      setCourseDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  async function deleteMentor(id: string) {
    try {
      await adminApi.deleteMentor(id);
      toast({ title: "Mentor deleted" });
      fetchData();
    } catch (error) {
      console.error('Failed to delete mentor:', error);
    }
  }

  async function deleteCourse(id: string) {
    try {
      await adminApi.deleteCourse(id);
      toast({ title: "Course deleted" });
      fetchData();
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  }

  if (loading) {
    return (
      <Layout hideFooter>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const statCards = [
    { label: "Total Users", value: stats.users, icon: Users },
    { label: "Courses", value: stats.courses, icon: BookOpen },
    { label: "Mentors", value: stats.mentors, icon: GraduationCap },
    { label: "Enrollments", value: stats.enrollments, icon: Users },
    { label: "Messages", value: stats.messages, icon: Mail },
  ];

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <stat.icon className="h-4 w-4" />
                <span className="text-xs">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="mentors">
          <TabsList>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Mentors</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Mentor</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Mentor</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Name *</Label><Input value={mentorForm.name} onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })} /></div>
                    <div><Label>Title</Label><Input value={mentorForm.title} onChange={(e) => setMentorForm({ ...mentorForm, title: e.target.value })} /></div>
                    <div><Label>Bio</Label><Textarea value={mentorForm.bio} onChange={(e) => setMentorForm({ ...mentorForm, bio: e.target.value })} /></div>
                    <div><Label>Skills (comma-separated)</Label><Input value={mentorForm.skills} onChange={(e) => setMentorForm({ ...mentorForm, skills: e.target.value })} /></div>
                    <Button onClick={addMentor} disabled={!mentorForm.name} className="w-full">Add Mentor</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Title</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {mentors.map((m) => (
                    <tr key={m._id} className="border-t border-border">
                      <td className="p-3 font-medium">{m.name}</td>
                      <td className="p-3 text-muted-foreground">{m.title || "-"}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${m.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{m.active ? "Active" : "Inactive"}</span></td>
                      <td className="p-3"><Button variant="ghost" size="icon" onClick={() => deleteMentor(m._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
                    </tr>
                  ))}
                  {mentors.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No mentors yet</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Courses</h2>
              <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Course</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Course</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Title *</Label><Input value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} /></div>
                    <div><Label>Slug</Label><Input value={courseForm.slug} onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })} placeholder="auto-generated" /></div>
                    <div><Label>Description</Label><Textarea value={courseForm.short_description} onChange={(e) => setCourseForm({ ...courseForm, short_description: e.target.value })} /></div>
                    <div><Label>Price ($)</Label><Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} /></div>
                    <Button onClick={addCourse} disabled={!courseForm.title} className="w-full">Add Course</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-3">Title</th><th className="text-left p-3">Price</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c._id} className="border-t border-border">
                      <td className="p-3 font-medium">{c.title}</td>
                      <td className="p-3 text-muted-foreground">{c.price ? `$${c.price}` : "Free"}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${c.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{c.published ? "Published" : "Draft"}</span></td>
                      <td className="p-3"><Button variant="ghost" size="icon" onClick={() => deleteCourse(c._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
                    </tr>
                  ))}
                  {courses.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No courses yet</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
