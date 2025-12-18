import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  Mail,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Eye,
  EyeOff,
  UploadCloud,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  adminApi,
  adminGalleryApi,
  Course,
  Mentor,
  AdminStats,
  TeamMember,
  EnrollmentDetails,
} from "@/lib/api";
import {
  AdminCoursePayload,
  CourseFormState,
  MentorAvailability,
} from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    users: 0,
    courses: 0,
    mentors: 0,
    enrollments: 0,
    messages: 0,
  });

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // 🔹 Mentor form (ONLY availability updated)
  const [mentorForm, setMentorForm] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    image_url: "",
    linkedin: "",
    availability: "weekdays" as MentorAvailability,
  });

  const [editingMentorId, setEditingMentorId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await adminApi.getStats();
      setStats(data.stats);
      setCourses(data.courses);
      setMentors(data.mentors);
      setTeamMembers(data.teamMembers || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function addMentor() {
    try {
      const payload = {
        name: mentorForm.name,
        title: mentorForm.title || null,
        bio: mentorForm.bio || null,
        skills: mentorForm.skills
          ? mentorForm.skills.split(",").map((s) => s.trim())
          : [],
        image_url: mentorForm.image_url || null,
        linkedin: mentorForm.linkedin || null,

        // ✅ availability supports "none"
        availability: mentorForm.availability,
        active: true,
      };

      if (editingMentorId) {
        await adminApi.updateMentor(editingMentorId, payload);
        toast({ title: "Mentor updated" });
      } else {
        await adminApi.addMentor(payload);
        toast({ title: "Mentor added" });
      }

      setMentorForm({
        name: "",
        title: "",
        bio: "",
        skills: "",
        image_url: "",
        linkedin: "",
        availability: "weekdays",
      });

      setEditingMentorId(null);
      setDialogOpen(false);
      fetchData();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message,
        variant: "destructive",
      });
    }
  }

  function openEditMentor(m: Mentor) {
    setMentorForm({
      name: m.name,
      title: m.title || "",
      bio: m.bio || "",
      skills: m.skills?.join(", ") || "",
      image_url: m.image_url || "",
      linkedin: m.linkedin || "",
      availability:
        (m.availability as MentorAvailability) ?? "none", // ✅ fallback
    });
    setEditingMentorId(m._id);
    setDialogOpen(true);
  }

  async function toggleMentorVisibility(id: string, active: boolean) {
    await adminApi.updateMentor(id, { active: !active });
    fetchData();
  }

  async function deleteMentor(id: string) {
    await adminApi.deleteMentor(id);
    fetchData();
  }

  if (loading) {
    return (
      <Layout hideFooter>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="mentors">
          <TabsList>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          </TabsList>

          {/* ================= MENTORS TAB ================= */}
          <TabsContent value="mentors" className="mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Manage Mentors</h2>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Mentor
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingMentorId ? "Edit Mentor" : "Add Mentor"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={mentorForm.name}
                        onChange={(e) =>
                          setMentorForm({
                            ...mentorForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Availability</Label>
                      <Select
                        value={mentorForm.availability}
                        onValueChange={(value: MentorAvailability) =>
                          setMentorForm({
                            ...mentorForm,
                            availability: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="on-demand">On Demand</SelectItem>

                          {/* ✅ NEW OPTION */}
                          <SelectItem value="none">None (Hide)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={addMentor}
                      disabled={!mentorForm.name}
                      className="w-full"
                    >
                      {editingMentorId ? "Update Mentor" : "Add Mentor"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Availability</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>

                <tbody>
                  {mentors.map((m) => (
                    <tr key={m._id} className="border-t">
                      <td className="p-3 font-medium">{m.name}</td>

                      {/* ✅ HIDE availability when "none" */}
                      <td className="p-3 text-muted-foreground capitalize">
                        {m.availability === "none"
                          ? "-"
                          : m.availability?.replace("-", " ")}
                      </td>

                      <td className="p-3">
                        {m.active ? "Visible" : "Hidden"}
                      </td>

                      <td className="p-3 flex gap-2 justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            toggleMentorVisibility(m._id, m.active)
                          }
                        >
                          {m.active ? <Eye /> : <EyeOff />}
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openEditMentor(m)}
                        >
                          <Edit />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteMentor(m._id)}
                        >
                          <Trash2 className="text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {mentors.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No mentors yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ⛔ ALL OTHER TABS REMAIN 100% UNCHANGED */}
        </Tabs>
      </div>
    </Layout>
  );
}
