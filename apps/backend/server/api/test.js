export default function handler(request, response) {
  const { name = 'Developer' } = request.query;
  
  response.status(200).json({ 
    message: `Hello ${name}!`,
    timestamp: new Date().toISOString(),
    service: 'SkillBridge Backend API Test Endpoint',
    status: 'operational',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      courses: '/api/courses',
      mentors: '/api/mentors'
    }
  });
}