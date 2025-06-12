import os
from supabase import create_client, Client
from supabase.client import ClientOptions
import dotenv
from supabasedb.MeetingRequests import MeetingRequests

class MeetingRequestsDao:
    def __init__(self): 
        dotenv.load_dotenv()
        self.url: str = os.environ.get("SUPABASE_URL")
        self.key: str = os.environ.get("SUPABASE_KEY")
        self.supabase_client: Client = create_client(
            self.url,
            self.key,
            options=ClientOptions(
                postgrest_client_timeout=10,
                storage_client_timeout=10,
                schema="public",
            )
        )

        sign_in_response = self.supabase_client.auth.sign_in_with_password({
            "email":os.environ.get("SUPABASE_ROLE_EMAIL"),
            "password":os.environ.get("SUPABASE_ROLE_PASSWORD")
        })

        print("Sign in status: \n",sign_in_response)

        self.table_name = "MeetingRequests"
        
    def read_all(self):
        response = (
            self.supabase_client.table(self.table_name)
            .select("*")
            .execute()
        )

        return response
    
    def create(self,entity:MeetingRequests):
        try:
            response = (
                self.supabase_client.table(self.table_name)
                .insert({"text":entity.getText()})
                .execute()
            )
            print("DEBUG: Operation successful")
        except Exception as e:
            print("DEBUG: Operation failed")
            raise(e)

    def test_email_func(self):
        response = self.supabase_client.functions.invoke(
            "email-endpoint",
            invoke_options={"body": {"name": "Functions"}}
        )
        print(response)
    
