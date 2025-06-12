class MeetingRequests:
    def __init__(self,text:str):
        self.text = text

    def getText(self,):
        return self.text
    
    def setText(self,newText:str):
        self.text = newText