from pocketflow import Flow
from nodes import GetQuestionNode, AnswerNode

def create_qa_flow():
    """Create and return a question-answering flow."""
    # Create nodes
    get_question_node = GetQuestionNode()
    answer_node = AnswerNode()
    
    # Connect nodes in sequence
    get_question_node >> answer_node
    get_question_node - "complete"
    
    # Create flow starting with input node
    return Flow(start=get_question_node)

qa_flow = create_qa_flow()