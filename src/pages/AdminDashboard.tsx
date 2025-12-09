import { useEffect, useState } from "react";
import { Users, BookOpen, GraduationCap, Mail, Plus, Trash2, Edit, Loader2, Eye, EyeOff } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { adminApi, Course, Mentor, AdminStats } from "@/lib/api";
import { AdminCoursePayload, CourseFormState } from "@/lib/types";

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
  const [editingMentorId, setEditingMentorId] = useState<string | null>(null);
  
  const [courseForm, setCourseForm] = useState<CourseFormState & { image?: string }>({
    course_name: "",
    date: "",
    duration: "",
    description: "",
    price: "",
    mode: [],
    image: "",
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

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
      if (editingMentorId) {
        await adminApi.updateMentor(editingMentorId, {
          name: mentorForm.name,
          title: mentorForm.title || null,
          bio: mentorForm.bio || null,
          skills: mentorForm.skills ? mentorForm.skills.split(",").map(s => s.trim()) : [],
          active: true,
        });
        toast({ title: "Mentor updated" });
        setEditingMentorId(null);
      } else {
        await adminApi.addMentor({
          name: mentorForm.name,
          title: mentorForm.title || null,
          bio: mentorForm.bio || null,
          skills: mentorForm.skills ? mentorForm.skills.split(",").map(s => s.trim()) : [],
          active: true,
        });
        toast({ title: "Mentor added" });
      }
      setMentorForm({ name: "", title: "", bio: "", skills: "" });
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  function openEditMentor(mentor: Mentor) {
    setMentorForm({
      name: mentor.name,
      title: mentor.title || "",
      bio: mentor.bio || "",
      skills: mentor.skills?.join(", ") || "",
    });
    setEditingMentorId(mentor._id);
    setDialogOpen(true);
  }

  function closeDialogs() {
    setDialogOpen(false);
    setCourseDialogOpen(false);
    setMentorForm({ name: "", title: "", bio: "", skills: "" });
    setCourseForm({ course_name: "", date: "", duration: "", description: "", price: "", mode: [], image: "" });
    setEditingMentorId(null);
    setEditingCourseId(null);
  }

  function validateCourse(): boolean {
    if (courseForm.course_name.trim().length < 3) {
      toast({ title: "Validation Error", description: "Course name must be at least 3 characters", variant: "destructive" });
      return false;
    }
    if (!courseForm.date.trim()) {
      toast({ title: "Validation Error", description: "Date is required", variant: "destructive" });
      return false;
    }
    if (!courseForm.duration.trim()) {
      toast({ title: "Validation Error", description: "Duration is required", variant: "destructive" });
      return false;
    }
    if (courseForm.mode.length === 0) {
      toast({ title: "Validation Error", description: "Select at least one mode (online/offline)", variant: "destructive" });
      return false;
    }
    if (courseForm.price && Number(courseForm.price) < 0) {
      toast({ title: "Validation Error", description: "Price must be a positive number", variant: "destructive" });
      return false;
    }
    return true;
  }

  function toggleMode(m: "online" | "offline") {
    setCourseForm(prev => ({
      ...prev,
      mode: prev.mode.includes(m) ? prev.mode.filter(x => x !== m) : [...prev.mode, m]
    }));
  }

  async function addCourse() {
    if (!validateCourse()) return;

    try {
      const payload: AdminCoursePayload = {
        course_name: courseForm.course_name.trim(),
        image: courseForm.image?.trim(),
        date: courseForm.date.trim(),
        duration: courseForm.duration.trim(),
        description: courseForm.description?.trim() || undefined,
        price: courseForm.price === "" ? null : Number(courseForm.price),
        mode: courseForm.mode,
      };

      if (editingCourseId) {
        await adminApi.updateCourse(editingCourseId, {
          course_name: payload.course_name,
          image_url: payload.image,
          image: payload.image,
          date: payload.date,
          duration: payload.duration,
          description: payload.description,
          price: payload.price,
          mode: payload.mode,
          slug: payload.course_name.toLowerCase().replace(/\s+/g, "-"),
          published: true,
        });
        toast({ title: "Course updated successfully" });
        setEditingCourseId(null);
      } else {
        await adminApi.addCourse({
          course_name: payload.course_name,
          image_url: payload.image,
          image: payload.image,
          date: payload.date,
          duration: payload.duration,
          description: payload.description,
          price: payload.price,
          mode: payload.mode,
          slug: payload.course_name.toLowerCase().replace(/\s+/g, "-"),
          published: true,
        });
        toast({ title: "Course added successfully" });
      }
      
      // Reset form
      setCourseForm({ course_name: "", date: "", duration: "", description: "", price: "", mode: [], image: "" });
      setCourseDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Failed to save course", description: error?.message || String(error), variant: "destructive" });
    }
  }

  function openEditCourse(course: Course) {
    setCourseForm({
      course_name: course.course_name || course.title || "",
      date: course.date || "",
      duration: course.duration || "",
      description: course.description || "",
      price: course.price ? String(course.price) : "",
      mode: (course.mode || []) as ("online" | "offline")[],
      image: course.image || course.image_url || "",
    });
    setEditingCourseId(course._id || "");
    setCourseDialogOpen(true);
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

  async function toggleMentorVisibility(id: string, currentActive: boolean) {
    try {
      await adminApi.updateMentor(id, { active: !currentActive });
      toast({ title: !currentActive ? "Mentor is now visible" : "Mentor is now hidden" });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update mentor visibility", variant: "destructive" });
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

  const canSaveCourse = Boolean(
    courseForm.course_name.trim().length >= 3 &&
    courseForm.date.trim() &&
    courseForm.duration.trim() &&
    courseForm.mode.length > 0 &&
    (courseForm.price === "" || Number(courseForm.price) >= 0)
  );

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
              <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialogs(); setDialogOpen(open); }}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Mentor</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{editingMentorId ? "Edit Mentor" : "Add Mentor"}</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Name *</Label><Input value={mentorForm.name} onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })} /></div>
                    <div><Label>Title</Label><Input value={mentorForm.title} onChange={(e) => setMentorForm({ ...mentorForm, title: e.target.value })} /></div>
                    <div><Label>Bio</Label><Textarea value={mentorForm.bio} onChange={(e) => setMentorForm({ ...mentorForm, bio: e.target.value })} /></div>
                    <div><Label>Skills (comma-separated)</Label><Input value={mentorForm.skills} onChange={(e) => setMentorForm({ ...mentorForm, skills: e.target.value })} /></div>
                    <Button onClick={addMentor} disabled={!mentorForm.name} className="w-full">{editingMentorId ? "Update Mentor" : "Add Mentor"}</Button>
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
                      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${m.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{m.active ? "Visible" : "Hidden"}</span></td>
                      <td className="p-3 flex gap-2 justify-end"><Button variant="ghost" size="icon" onClick={() => toggleMentorVisibility(m._id, m.active)} title={m.active ? "Hide mentor" : "Show mentor"}>{m.active ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}</Button><Button variant="ghost" size="icon" onClick={() => openEditMentor(m)}><Edit className="h-4 w-4 text-primary" /></Button><Button variant="ghost" size="icon" onClick={() => deleteMentor(m._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
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
              <Dialog open={courseDialogOpen} onOpenChange={(open) => { if (!open) closeDialogs(); setCourseDialogOpen(open); }}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Course</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>{editingCourseId ? "Edit Course" : "Add Course"}</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    {/* Course Name */}
                    <div>
                      <Label htmlFor="course_name">Course Name *</Label>
                      <Input
                        id="course_name"
                        value={courseForm.course_name}
                        onChange={(e) => setCourseForm({ ...courseForm, course_name: e.target.value })}
                        placeholder="e.g., 1 Month Program (Students)"
                        minLength={3}
                      />
                      {courseForm.course_name && courseForm.course_name.length < 3 && (
                        <p className="text-xs text-destructive mt-1">Must be at least 3 characters</p>
                      )}
                    </div>

                    {/* Image URL/Path */}
                    <div>
                      <Label htmlFor="image">Image URL or Path (Optional)</Label>
                      <Input
                        id="image"
                        value={courseForm.image || ""}
                        onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                        placeholder="e.g., /images/course-1.jpg or https://example.com/image.jpg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use paths like /images/1.jpeg for local images or full URLs for external images
                      </p>
                    </div>

                    {/* Date */}
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        value={courseForm.date}
                        onChange={(e) => setCourseForm({ ...courseForm, date: e.target.value })}
                        placeholder="e.g., January 2026 or Flexible"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <Label htmlFor="duration">Duration *</Label>
                      <Input
                        id="duration"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        placeholder="e.g., 1 Month / 12 Sessions"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        placeholder="Course description..."
                        rows={3}
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <Label htmlFor="price">Price (Optional)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={courseForm.price}
                        onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    {/* Mode */}
                    <div>
                      <Label>Mode *</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="online"
                            checked={courseForm.mode.includes("online")}
                            onCheckedChange={() => toggleMode("online")}
                          />
                          <Label htmlFor="online" className="font-normal cursor-pointer">Online</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="offline"
                            checked={courseForm.mode.includes("offline")}
                            onCheckedChange={() => toggleMode("offline")}
                          />
                          <Label htmlFor="offline" className="font-normal cursor-pointer">Offline</Label>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={addCourse}
                      disabled={!canSaveCourse}
                      className="w-full"
                    >
                      {editingCourseId ? "Update Course" : "Add Course"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-3">Title</th><th className="text-left p-3">Date</th><th className="text-left p-3">Mode</th><th className="text-left p-3">Price</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {courses.map((c: any) => (
                    <tr key={c._id} className="border-t border-border">
                      <td className="p-3 font-medium">{c.course_name || c.title}</td>
                      <td className="p-3 text-muted-foreground">{c.date || "-"}</td>
                      <td className="p-3 text-muted-foreground">{c.mode?.join(", ") || "-"}</td>
                      <td className="p-3 text-muted-foreground">{c.price ? `$${c.price}` : "Free"}</td>
                      <td className="p-3 flex gap-2 justify-end"><Button variant="ghost" size="icon" onClick={() => openEditCourse(c)}><Edit className="h-4 w-4 text-primary" /></Button><Button variant="ghost" size="icon" onClick={() => deleteCourse(c._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
                    </tr>
                  ))}
                  {courses.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No courses yet</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
