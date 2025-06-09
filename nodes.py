from pocketflow import Node
from utils.call_llm import call_llm

class GetQuestionNode(Node):
    def prep(self, shared):
        # Get question directly from shared input
        return shared.get("question", "")
        
    def exec(self, prompt):
        if not prompt:
            return "EOF"
        return prompt
    
    def post(self, shared, prep_res, exec_res):
        # Store the user's question
        shared["question"] = exec_res
        if exec_res == "EOF":
            return "complete"
        return "default"  # Go to the next node

class AnswerNode(Node):
    def prep(self, shared):
        # Read question from shared
        return shared["question"]
    
    def exec(self, question):
        # Call LLM to get the answer
        return call_llm(question)
    
    def post(self, shared, prep_res, exec_res):
        # Store the answer in shared
        shared["answer"] = exec_res