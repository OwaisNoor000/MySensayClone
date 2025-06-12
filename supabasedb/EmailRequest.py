from pydantic import BaseModel


class EmailRequest(BaseModel):
    emailContents: str
