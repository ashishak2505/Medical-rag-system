import pytesseract

from PIL import Image

from pdf2image import convert_from_path


def extract_text_from_image(image_path):

    image = Image.open(image_path)

    text = pytesseract.image_to_string(image)

    return text


def extract_text_from_scanned_pdf(pdf_path):

    pages = convert_from_path(pdf_path)

    extracted_text = ""

    for index, page in enumerate(pages):

        print(f"\nProcessing Page {index + 1}")

        text = pytesseract.image_to_string(page)

        print(text)

        extracted_text += text

    return extracted_text