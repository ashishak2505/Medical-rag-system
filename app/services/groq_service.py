import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_groq(context, question):

    prompt = f"""
        You are a medical report assistant.

        Answer ONLY from the provided medical report context.

        If the answer is not present in the report context, say:

        'I could not find this information in the uploaded report.'

        Do not use outside medical knowledge.
        Do not hallucinate.
        Do not provide diagnosis.

        Report Context:
        {context}

        Question:
        {question}
        """

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content