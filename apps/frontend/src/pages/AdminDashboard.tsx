import { useEffect, useState } from "react";
import { Users, BookOpen, GraduationCap, Mail, Plus, Trash2, Edit, Loader2, Eye, EyeOff, Image, UploadCloud } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { adminApi, adminGalleryApi, Course, Mentor, AdminStats, TeamMember, EnrollmentDetails } from "@/lib/api";
import { AdminCoursePayload, CourseFormState, MentorAvailability } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({ users: 0, courses: 0, mentors: 0, enrollments: 0, messages: 0 });
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const { toast } = useToast();

  // Form states
  const [mentorForm, setMentorForm] = useState({ name: "", title: "", bio: "", skills: "", image_url: "", linkedin: "", availability: "weekdays" as MentorAvailability });
  const [editingMentorId, setEditingMentorId] = useState<string | null>(null);
  
  const [courseForm, setCourseForm] = useState<CourseFormState & { image?: string; published?: boolean }>({
    course_name: "",
    date: "",
    duration: "",
    description: "",
    price: "",
    mode: [],
    image: "",
    published: true,
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [teamForm, setTeamForm] = useState({ name: "", title: "", bio: "", skills: "", image_url: "", linkedin: "" });
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    fetchGalleryAdmin();
  }, []);

  async function fetchData() {
    try {
      const data = await adminApi.getStats();
      setStats(data.stats);
      setCourses(data.courses);
      setMentors(data.mentors);
      setTeamMembers(data.teamMembers || []);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
    setLoading(false);
  }

  async function fetchEnrollments() {
    try {
      setEnrollmentsLoading(true);
      const data = await adminApi.getEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
      toast({ title: "Error", description: "Failed to fetch enrollments", variant: "destructive" });
    } finally {
      setEnrollmentsLoading(false);
    }
  }

  async function fetchGalleryAdmin() {
    try {
      setGalleryLoading(true);
      const data = await adminGalleryApi.getAll();
      setGalleryImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      toast({ title: 'Error', description: 'Failed to fetch gallery images', variant: 'destructive' });
    } finally {
      setGalleryLoading(false);
    }
  }

  async function addMentor() {
    try {
      if (editingMentorId) {
        await adminApi.updateMentor(editingMentorId, {
          name: mentorForm.name,
          title: mentorForm.title || null,
          bio: mentorForm.bio || null,
          skills: mentorForm.skills ? mentorForm.skills.split(",").map(s => s.trim()) : [],
          image_url: mentorForm.image_url || null,
          linkedin: mentorForm.linkedin || null,
          availability: mentorForm.availability,
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
          image_url: mentorForm.image_url || null,
          linkedin: mentorForm.linkedin || null,
          availability: mentorForm.availability,
          active: true,
        });
        toast({ title: "Mentor added" });
      }
      setMentorForm({ name: "", title: "", bio: "", skills: "", image_url: "", linkedin: "", availability: "weekdays" });
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
      image_url: mentor.image_url || "",
      linkedin: mentor.linkedin || "",
      availability: (mentor.availability as MentorAvailability) || "weekdays",
    });
    setEditingMentorId(mentor._id);
    setDialogOpen(true);
  }

  function closeDialogs() {
    setDialogOpen(false);
    setCourseDialogOpen(false);
    setTeamDialogOpen(false);
    setMentorForm({ name: "", title: "", bio: "", skills: "", image_url: "", linkedin: "", availability: "weekdays" });
    setCourseForm({ course_name: "", date: "", duration: "", description: "", price: "", mode: [], image: "", published: true });
    setTeamForm({ name: "", title: "", bio: "", skills: "", image_url: "", linkedin: "" });
    setEditingMentorId(null);
    setEditingCourseId(null);
    setEditingTeamId(null);
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
          published: courseForm.published ?? true,
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
          published: courseForm.published ?? true,
        });
        toast({ title: "Course added successfully" });
      }
      
      // Reset form
      setCourseForm({ course_name: "", date: "", duration: "", description: "", price: "", mode: [], image: "", published: true });
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
      published: course.published ?? true,
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
      // Find the mentor in the current list to preserve all data
      const mentor = mentors.find(m => m._id === id);
      if (mentor) {
        // Send all mentor data to preserve image_url and linkedin fields
        await adminApi.updateMentor(id, { 
          ...mentor,
          active: !currentActive 
        });
      } else {
        // Fallback to just updating active status
        await adminApi.updateMentor(id, { active: !currentActive });
      }
      toast({ title: !currentActive ? "Mentor is now visible" : "Mentor is now hidden" });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update mentor visibility", variant: "destructive" });
    }
  }

  async function addTeamMember() {
    try {
      const payload = {
        name: teamForm.name,
        title: teamForm.title || null,
        bio: teamForm.bio || null,
        skills: teamForm.skills ? teamForm.skills.split(",").map(s => s.trim()) : [],
        image_url: teamForm.image_url || null,
        linkedin: teamForm.linkedin || null,
        active: true,
      };

      if (editingTeamId) {
        await adminApi.updateTeamMember(editingTeamId, payload);
        toast({ title: "Team member updated" });
        setEditingTeamId(null);
      } else {
        await adminApi.addTeamMember(payload);
        toast({ title: "Team member added" });
      }

      setTeamForm({ name: "", title: "", bio: "", skills: "", image_url: "", linkedin: "" });
      setTeamDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  function openEditTeam(member: TeamMember) {
    setTeamForm({
      name: member.name,
      title: member.title || "",
      bio: member.bio || "",
      skills: member.skills?.join(", ") || "",
      image_url: member.image_url || "",
      linkedin: member.linkedin || "",
    });
    setEditingTeamId(member._id || null);
    setTeamDialogOpen(true);
  }

  async function toggleTeamVisibility(id: string, active: boolean) {
    try {
      // Find the team member in the current list to preserve all data
      const member = teamMembers.find(m => m._id === id);
      if (member) {
        // Send all team member data to preserve image_url and linkedin fields
        await adminApi.updateTeamMember(id, { 
          ...member,
          active: !active 
        });
      } else {
        // Fallback to just updating active status
        await adminApi.updateTeamMember(id, { active: !active });
      }
      toast({ title: !active ? "Member is now visible" : "Member hidden" });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update member visibility", variant: "destructive" });
    }
  }

  async function deleteTeamMember(id: string) {
    try {
      await adminApi.deleteTeamMember(id);
      toast({ title: "Team member deleted" });
      fetchData();
    } catch (error) {
      console.error('Failed to delete team member:', error);
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

  async function toggleCourseVisibility(id: string, published: boolean) {
    try {
      // Find the course in the current list to preserve all data
      const course = courses.find(c => c._id === id);
      if (course) {
        // Send all course data to preserve fields
        await adminApi.updateCourse(id, { 
          ...course,
          published: !published 
        });
      } else {
        // Fallback to just updating published status
        await adminApi.updateCourse(id, { published: !published });
      }
      toast({ title: !published ? "Course is now visible" : "Course hidden" });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update course visibility", variant: "destructive" });
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
    { label: "Team", value: stats.team ?? teamMembers.length, icon: Users },
    { label: "Enrollments", value: stats.enrollments, icon: Users },
    { label: "Messages", value: stats.messages, icon: Mail },
  ];

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
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
        <Tabs defaultValue="mentors" onValueChange={(value) => {
          if (value === "enrollments" && enrollments.length === 0) {
            fetchEnrollments();
          }
        }}>
          <TabsList>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
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
                    <div><Label>Image URL</Label><Input placeholder="/images/1.jpeg or https://..." value={mentorForm.image_url} onChange={(e) => setMentorForm({ ...mentorForm, image_url: e.target.value })} /></div>
                    <div><Label>LinkedIn URL</Label><Input placeholder="https://linkedin.com/in/..." value={mentorForm.linkedin} onChange={(e) => setMentorForm({ ...mentorForm, linkedin: e.target.value })} /></div>
                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <Select value={mentorForm.availability} onValueChange={(value: MentorAvailability) => setMentorForm({ ...mentorForm, availability: value })}>
                        <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="on-demand">On Demand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={addMentor} disabled={!mentorForm.name} className="w-full">{editingMentorId ? "Update Mentor" : "Add Mentor"}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Title</th><th className="text-left p-3">Availability</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {mentors.map((m) => (
                    <tr key={m._id} className="border-t border-border">
                      <td className="p-3 font-medium">{m.name}</td>
                      <td className="p-3 text-muted-foreground">{m.title || "-"}</td>
                      <td className="p-3 text-muted-foreground capitalize">{m.availability?.replace("-", " ") || "weekdays"}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${m.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{m.active ? "Visible" : "Hidden"}</span></td>
                      <td className="p-3 flex gap-2 justify-end"><Button variant="ghost" size="icon" onClick={() => toggleMentorVisibility(m._id, m.active)} title={m.active ? "Hide mentor" : "Show mentor"}>{m.active ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}</Button><Button variant="ghost" size="icon" onClick={() => openEditMentor(m)}><Edit className="h-4 w-4 text-primary" /></Button><Button variant="ghost" size="icon" onClick={() => deleteMentor(m._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
                    </tr>
                  ))}
                  {mentors.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No mentors yet</td></tr>}
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

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="published"
                        checked={courseForm.published ?? true}
                        onCheckedChange={() => setCourseForm(prev => ({ ...prev, published: !prev.published }))}
                      />
                      <Label htmlFor="published" className="font-normal cursor-pointer">Visible on site</Label>
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
                <thead className="bg-muted"><tr><th className="text-left p-3">Title</th><th className="text-left p-3">Date</th><th className="text-left p-3">Mode</th><th className="text-left p-3">Price</th><th className="text-left p-3">Visibility</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {courses.map((c: any) => (
                    <tr key={c._id} className="border-t border-border">
                      <td className="p-3 font-medium">{c.course_name || c.title}</td>
                      <td className="p-3 text-muted-foreground">{c.date || "-"}</td>
                      <td className="p-3 text-muted-foreground">{c.mode?.join(", ") || "-"}</td>
                      <td className="p-3 text-muted-foreground">{c.price ? `₹${c.price}` : "Free"}</td>
                      <td className="p-3 text-muted-foreground">
                        <span className={`px-2 py-1 rounded text-xs ${c.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                          {c.published ? "Visible" : "Hidden"}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => toggleCourseVisibility(c._id, c.published ?? true)} title={c.published ? "Hide course" : "Show course"}>
                          {c.published ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditCourse(c)}><Edit className="h-4 w-4 text-primary" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteCourse(c._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No courses yet</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Team</h2>
              <Dialog open={teamDialogOpen} onOpenChange={(open) => { if (!open) closeDialogs(); setTeamDialogOpen(open); }}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Member</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{editingTeamId ? "Edit Member" : "Add Member"}</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Name *</Label><Input value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} /></div>
                    <div><Label>Title</Label><Input value={teamForm.title} onChange={(e) => setTeamForm({ ...teamForm, title: e.target.value })} /></div>
                    <div><Label>Bio</Label><Textarea value={teamForm.bio} onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })} /></div>
                    <div><Label>Skills (comma-separated)</Label><Input value={teamForm.skills} onChange={(e) => setTeamForm({ ...teamForm, skills: e.target.value })} /></div>
                    <div><Label>Image URL</Label><Input placeholder="/images/1.jpeg or https://..." value={teamForm.image_url} onChange={(e) => setTeamForm({ ...teamForm, image_url: e.target.value })} /></div>
                    <div><Label>LinkedIn URL</Label><Input placeholder="https://linkedin.com/in/..." value={teamForm.linkedin} onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })} /></div>
                    <Button onClick={addTeamMember} disabled={!teamForm.name} className="w-full">{editingTeamId ? "Update Member" : "Add Member"}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Title</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="border-t border-border">
                      <td className="p-3 font-medium">{member.name}</td>
                      <td className="p-3 text-muted-foreground">{member.title || "-"}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${member.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{member.active ? "Visible" : "Hidden"}</span></td>
                      <td className="p-3 flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => toggleTeamVisibility(member._id || "", member.active)} title={member.active ? "Hide member" : "Show member"}>{member.active ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}</Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditTeam(member)}><Edit className="h-4 w-4 text-primary" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTeamMember(member._id || "")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </td>
                    </tr>
                  ))}
                  {teamMembers.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No team members yet</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Gallery</h2>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <UploadCloud className="h-4 w-4" />
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await adminApi.uploadImage(file);
                      await adminGalleryApi.create({ image_url: url, title: newImageTitle });
                      setNewImageTitle('');
                      setNewImageUrl('');
                      toast({ title: 'Image uploaded' });
                      fetchGalleryAdmin();
                    } catch (err: any) {
                      toast({ title: 'Upload failed', description: err?.message || String(err), variant: 'destructive' });
                    }
                  }} className="hidden" />
                  <Button size="sm">Upload File</Button>
                </label>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Image URL (https://...)" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
                <Input placeholder="Title (optional)" value={newImageTitle} onChange={(e) => setNewImageTitle(e.target.value)} />
                <Button onClick={async () => {
                  if (!newImageUrl) { toast({ title: 'Provide an URL' }); return; }
                  try {
                    await adminGalleryApi.create({ image_url: newImageUrl, title: newImageTitle });
                    setNewImageUrl(''); setNewImageTitle('');
                    toast({ title: 'Image added' });
                    fetchGalleryAdmin();
                  } catch (err: any) {
                    toast({ title: 'Failed', description: err?.message || String(err), variant: 'destructive' });
                  }
                }}>Add by URL</Button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              {galleryLoading ? (
                <div className="py-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map(img => (
                    <div key={img._id} className="border rounded p-2 bg-background">
                      <img src={img.image_url} alt={img.title || 'Gallery image'} className="w-full h-36 object-cover rounded" />
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">{img.title || 'Untitled'}</div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={async () => {
                            await adminGalleryApi.update(img._id, { hidden: !img.hidden });
                            toast({ title: img.hidden ? 'Shown' : 'Hidden' });
                            fetchGalleryAdmin();
                          }}>{img.hidden ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-primary" />}</Button>
                          <Button variant="ghost" size="icon" onClick={async () => { if (!confirm('Delete image?')) return; await adminGalleryApi.remove(img._id); toast({ title: 'Deleted' }); fetchGalleryAdmin(); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {galleryImages.length === 0 && <div className="p-8 text-center text-muted-foreground col-span-full">No images yet</div>}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="enrollments" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Student Enrollments</h2>
              <Button size="sm" onClick={fetchEnrollments} disabled={enrollmentsLoading}>
                {enrollmentsLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Refresh"
                )}
              </Button>
            </div>
            
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3">Student</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Course</th>
                    <th className="text-left p-3">Enrollment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="border-t border-border">
                      <td className="p-3 font-medium">
                        {enrollment.user.full_name || "Unnamed Student"}
                      </td>
                      <td className="p-3 text-muted-foreground">{enrollment.user.email}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {enrollment.course.course_name}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {enrollments.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-muted-foreground">
                        {enrollmentsLoading ? "Loading enrollments..." : "No enrollments found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
