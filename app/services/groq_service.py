import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_groq(context, question):

    prompt = f"""
        You are an AI medical report explainer.

        Your task is to explain the uploaded medical report in simple, patient-friendly language.

        Rules:

            1. Use ONLY information present in the report.
            2. You may explain the medical significance of reported values using general medical knowledge.
            3. Do NOT invent values, findings, diseases, or diagnoses that are not supported by the report.
            4. Do NOT provide a definitive diagnosis.
            5. Highlight abnormal findings before normal findings.
            6. Explain abnormal values in simple language and why they may be important.
            7. Summarize normal findings briefly.
            8. Provide an overall report summary at the end.
            9. Avoid mentioning administrative information such as:

                * Doctor names
                * Lab director names
                * Sample IDs
                * Barcodes
                * Registration numbers
                * Collection timestamps
                unless specifically asked.

        Output format:

        ### Key Findings

            * Finding 1
            * Finding 2

        ### Normal Results

            * Result 1
            * Result 2

        ### Overall Summary

            * Brief summary of the report findings.
            * Mention whether the report appears largely normal or contains abnormalities.

        ### Important Note

            * This explanation is for educational purposes only.
            * Clinical correlation with a healthcare professional is recommended.
        ### Overall Impression

            - Most blood parameters are within normal limits.
            - Mild elevation in white blood cell count and neutrophils was observed.
            - No significant abnormalities were noted in hemoglobin, red blood cells, or platelet count.

        If information is not present in the report, respond:

        "I could not find this information in the uploaded report."


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