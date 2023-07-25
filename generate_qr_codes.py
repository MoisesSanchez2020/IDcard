import qrcode
import json

def generate_qr_code(json_data, output_filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L, # type: ignore
        box_size=10,
        border=4,
    )
    qr.add_data(json.dumps(json_data))
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(output_filename)

if __name__ == "__main__":
    # Replace 'your_json_data_here' with your actual JSON data
    json_data = {
        "results": [
            {
                "id": "1a3f4c",
                "name": "John",
                "last_name": "Lennon",
                "address": "123 Main Street, Anytown, USA",
                "country": "USA",
                "phone_number": "123-456-7890",
                "picture": "https://www.gannett-cdn.com/media/USATODAY/None/2014/10/09/635484412619522719-D06-John-Lennon-older-07.jpg?width=390&format=pjpg&auto=webp&quality=70",
                "date_of_birth": "1964/01/01",
                "driver_license": "A123456789",
                "social_media": "john_doe"
            }
        ]
    }

    output_filename = "qr_code.png"
    generate_qr_code(json_data, output_filename)
    print(f"QR code generated and saved as '{output_filename}'.")
