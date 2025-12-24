import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Mail, 
  Calendar, 
  Clock, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mentorScheduleApi, mentorsApi, Mentor, MentorSchedule } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function MentorScheduleDashboard() {
  const [schedules, setSchedules] = useState<MentorSchedule[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialog states
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<MentorSchedule | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    courseName: '',
    mentorId: '',
    courseLevel: 'Beginner',
    mentorAvailability: 'Available',
    confirmationStatus: 'Pending',
    courseContentReady: 'No',
    lectureDate: '',
    lectureTime: '',
    mode: 'Online',
    meetingLink: '',
    location: '',
    mentorEmail: '',
    mentorMobile: '',
    sessionStatus: 'Scheduled',
    emailStatus: 'Not Sent'
  });

  const { toast } = useToast();
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadSchedulesAndMentors();
    
    // Set up polling to check for updates (every 30 seconds)
    pollingInterval.current = setInterval(async () => {
      try {
        const updatedSchedules = await mentorScheduleApi.getAll();
        setSchedules(updatedSchedules);
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 30000); // 30 seconds

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const loadSchedulesAndMentors = async () => {
    try {
      setLoading(true);
      const [schedulesData, mentorsData] = await Promise.all([
        mentorScheduleApi.getAll(),
        mentorsApi.getAll()
      ]);
      setSchedules(schedulesData);
      setMentors(mentorsData);
    } catch (err) {
      setError('Failed to load schedules and mentors');
      toast({
        title: 'Error',
        description: 'Failed to load schedules and mentors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchedule = () => {
    setFormData({
      courseName: '',
      mentorId: '',
      courseLevel: 'Beginner',
      mentorAvailability: 'Available',
      confirmationStatus: 'Pending',
      courseContentReady: 'No',
      lectureDate: '',
      lectureTime: '',
      mode: 'Online',
      meetingLink: '',
      location: '',
      mentorEmail: '',
      mentorMobile: '',
      sessionStatus: 'Scheduled',
      emailStatus: 'Not Sent'
    });
    setIsEditing(false);
    setShowAddEditDialog(true);
  };

  const handleEditSchedule = (schedule: MentorSchedule) => {
    setCurrentSchedule(schedule);
    setFormData({
      courseName: schedule.courseName,
      mentorId: schedule.mentorId,
      courseLevel: schedule.courseLevel,
      mentorAvailability: schedule.mentorAvailability,
      confirmationStatus: schedule.confirmationStatus,
      courseContentReady: schedule.courseContentReady,
      lectureDate: schedule.lectureDate.toString(),
      lectureTime: schedule.lectureTime,
      mode: schedule.mode,
      meetingLink: schedule.meetingLink || '',
      location: schedule.location || '',
      mentorEmail: schedule.mentorEmail,
      mentorMobile: schedule.mentorMobile,
      sessionStatus: schedule.sessionStatus,
      emailStatus: schedule.emailStatus
    });
    setIsEditing(true);
    setShowAddEditDialog(true);
  };

  const handleViewSchedule = (schedule: MentorSchedule) => {
    setCurrentSchedule(schedule);
    setShowViewDialog(true);
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) {
      return;
    }

    try {
      await mentorScheduleApi.delete(id);
      setSchedules(schedules.filter(schedule => schedule._id !== id));
      toast({
        title: 'Success',
        description: 'Schedule deleted successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete schedule',
        variant: 'destructive',
      });
    }
  };

  const handleSendEmail = async (id: string) => {
    try {
      const result = await mentorScheduleApi.sendEmail(id);
      // Update the schedule in the list to reflect the new email status
      const updatedSchedules = schedules.map(schedule => 
        schedule._id === id ? { ...schedule, emailStatus: 'Sent' } : schedule
      );
      setSchedules(updatedSchedules);
      toast({
        title: 'Success',
        description: 'Email sent successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to send email',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentSchedule) {
        const updatedSchedule = await mentorScheduleApi.update(currentSchedule._id!, {
          ...formData,
          lectureDate: new Date(formData.lectureDate).toISOString()
        });
        setSchedules(schedules.map(s => s._id === currentSchedule._id ? updatedSchedule : s));
        toast({
          title: 'Success',
          description: 'Schedule updated successfully',
        });
      } else {
        const newSchedule = await mentorScheduleApi.create({
          ...formData,
          lectureDate: new Date(formData.lectureDate).toISOString()
        });
        setSchedules([...schedules, newSchedule]);
        toast({
          title: 'Success',
          description: 'Schedule created successfully',
        });
      }
      setShowAddEditDialog(false);
    } catch (err) {
      toast({
        title: 'Error',
        description: isEditing ? 'Failed to update schedule' : 'Failed to create schedule',
        variant: 'destructive',
      });
    }
  };

  const getMentorName = (mentorId: string) => {
    const mentor = mentors.find(m => m._id === mentorId);
    return mentor ? mentor.name : 'Unknown';
  };

  const getMentorImage = (mentorId: string) => {
    const mentor = mentors.find(m => m._id === mentorId);
    return mentor ? mentor.image_url : null;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mentor Schedules</h1>
            <Button onClick={handleAddSchedule}>
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading schedules...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mentor Schedules</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={loadSchedulesAndMentors}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button onClick={handleAddSchedule}>
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Confirmation</TableHead>
                  <TableHead>Session Status</TableHead>
                  <TableHead>Email Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No schedules found
                    </TableCell>
                  </TableRow>
                ) : (
                  schedules.map((schedule) => (
                    <TableRow key={schedule._id}>
                      <TableCell className="font-medium">{schedule.courseName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {schedule.mentor?.image_url && (
                            <img 
                              src={schedule.mentor.image_url} 
                              alt={schedule.mentor.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span>{schedule.mentor?.name || getMentorName(schedule.mentorId)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{schedule.courseLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(schedule.lectureDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>{schedule.lectureTime}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{schedule.mode}</Badge>
                      </TableCell>
                      <TableCell>
                        {schedule.confirmationStatus === 'Pending' && (
                          <Badge variant="outline" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {schedule.confirmationStatus}
                          </Badge>
                        )}
                        {schedule.confirmationStatus === 'Confirmed' && (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {schedule.confirmationStatus}
                          </Badge>
                        )}
                        {schedule.confirmationStatus === 'Rejected' && (
                          <Badge variant="destructive" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            {schedule.confirmationStatus}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            schedule.sessionStatus === 'Scheduled' ? 'secondary' :
                            schedule.sessionStatus === 'Completed' ? 'default' :
                            schedule.sessionStatus === 'Cancelled' ? 'destructive' :
                            'outline'
                          }
                        >
                          {schedule.sessionStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            schedule.emailStatus === 'Sent' ? 'default' :
                            schedule.emailStatus === 'Failed' ? 'destructive' :
                            'outline'
                          }
                        >
                          {schedule.emailStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewSchedule(schedule)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSchedule(schedule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendEmail(schedule._id!)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSchedule(schedule._id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Schedule Dialog */}
        <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Edit Schedule' : 'Add New Schedule'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentorId">Mentor</Label>
                  <Select 
                    value={formData.mentorId} 
                    onValueChange={(value) => {
                      setFormData({ ...formData, mentorId: value });
                      // Auto-populate mentor email and mobile if available
                      const mentor = mentors.find(m => m._id === value);
                      if (mentor) {
                        setFormData(prev => ({
                          ...prev,
                          mentorEmail: mentor.email || prev.mentorEmail,
                          mentorMobile: mentor.mobile || prev.mentorMobile
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mentors.map((mentor) => (
                        <SelectItem key={mentor._id} value={mentor._id}>
                          {mentor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="courseLevel">Course Level</Label>
                  <Select 
                    value={formData.courseLevel} 
                    onValueChange={(value) => setFormData({ ...formData, courseLevel: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Project Based">Project Based</SelectItem>
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentorAvailability">Mentor Availability</Label>
                  <Select 
                    value={formData.mentorAvailability} 
                    onValueChange={(value) => setFormData({ ...formData, mentorAvailability: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Not Available">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmationStatus">Confirmation Status</Label>
                  <Select 
                    value={formData.confirmationStatus} 
                    onValueChange={(value) => setFormData({ ...formData, confirmationStatus: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="courseContentReady">Course Content Ready</Label>
                  <Select 
                    value={formData.courseContentReady} 
                    onValueChange={(value) => setFormData({ ...formData, courseContentReady: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lectureDate">Lecture Date</Label>
                  <Input
                    id="lectureDate"
                    type="date"
                    value={formData.lectureDate}
                    onChange={(e) => setFormData({ ...formData, lectureDate: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lectureTime">Lecture Time</Label>
                  <Input
                    id="lectureTime"
                    type="time"
                    value={formData.lectureTime}
                    onChange={(e) => setFormData({ ...formData, lectureTime: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select 
                    value={formData.mode} 
                    onValueChange={(value) => setFormData({ ...formData, mode: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.mode === 'Online' && (
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                    />
                  </div>
                )}
                
                {formData.mode === 'Offline' && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="mentorEmail">Mentor Email</Label>
                  <Input
                    id="mentorEmail"
                    type="email"
                    value={formData.mentorEmail}
                    onChange={(e) => setFormData({ ...formData, mentorEmail: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentorMobile">Mentor Mobile</Label>
                  <Input
                    id="mentorMobile"
                    value={formData.mentorMobile}
                    onChange={(e) => setFormData({ ...formData, mentorMobile: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionStatus">Session Status</Label>
                  <Select 
                    value={formData.sessionStatus} 
                    onValueChange={(value) => setFormData({ ...formData, sessionStatus: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailStatus">Email Status</Label>
                  <Select 
                    value={formData.emailStatus} 
                    onValueChange={(value) => setFormData({ ...formData, emailStatus: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Sent">Not Sent</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="submit">
                  {isEditing ? 'Update Schedule' : 'Create Schedule'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Schedule Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule Details</DialogTitle>
            </DialogHeader>
            {currentSchedule && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Course Name</h3>
                    <p className="text-lg">{currentSchedule.courseName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Mentor</h3>
                    <div className="flex items-center gap-2">
                      {currentSchedule.mentor?.image_url && (
                        <img 
                          src={currentSchedule.mentor.image_url} 
                          alt={currentSchedule.mentor.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <p className="text-lg">{currentSchedule.mentor?.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Course Level</h3>
                    <p className="text-lg">{currentSchedule.courseLevel}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Mentor Availability</h3>
                    <p className="text-lg">{currentSchedule.mentorAvailability}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Confirmation Status</h3>
                    <p className="text-lg">{currentSchedule.confirmationStatus}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Course Content Ready</h3>
                    <p className="text-lg">{currentSchedule.courseContentReady}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Lecture Date</h3>
                    <p className="text-lg">
                      {format(new Date(currentSchedule.lectureDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Lecture Time</h3>
                    <p className="text-lg">{currentSchedule.lectureTime}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Mode</h3>
                    <p className="text-lg">{currentSchedule.mode}</p>
                  </div>
                  
                  {currentSchedule.mode === 'Online' && currentSchedule.meetingLink && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Meeting Link</h3>
                      <a 
                        href={currentSchedule.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {currentSchedule.meetingLink}
                      </a>
                    </div>
                  )}
                  
                  {currentSchedule.mode === 'Offline' && currentSchedule.location && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p className="text-lg">{currentSchedule.location}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Mentor Email</h3>
                    <a 
                      href={`mailto:${currentSchedule.mentorEmail}`} 
                      className="text-primary hover:underline"
                    >
                      {currentSchedule.mentorEmail}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Mentor Mobile</h3>
                    <a 
                      href={`tel:${currentSchedule.mentorMobile}`} 
                      className="text-primary hover:underline"
                    >
                      {currentSchedule.mentorMobile}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Session Status</h3>
                    <p className="text-lg">{currentSchedule.sessionStatus}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email Status</h3>
                    <p className="text-lg">{currentSchedule.emailStatus}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                    <p className="text-lg">
                      {format(new Date(currentSchedule.createdAt!), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Updated At</h3>
                    <p className="text-lg">
                      {format(new Date(currentSchedule.updatedAt!), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}