from  supabasedb.MeetingRequestsDao import MeetingRequestsDao
from supabasedb.MeetingRequests import MeetingRequests

dao = MeetingRequestsDao()
meetingRequest = MeetingRequests("Testing12")
#dao.create(meetingRequest)