# server.py

from flask import Flask, request, jsonify
import qrcode
from qrcode import constants  # Import the 'constants' module explicitly
import json

app = Flask(__name__)

@app.route("/generate_qr_code", methods=["POST"])
def generate_qr_code():
    try:
        json_data = request.json
        if not json_data:
            return jsonify({"error": "Invalid JSON data"}), 400

        qr = qrcode.QRCode(
            version=1,
            error_correction=constants.ERROR_CORRECT_L,  # Use the imported 'constants'
            box_size=10,
            border=4,
        )
        qr.add_data(json.dumps(json_data))
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        image_filename = "qrcodes/qr_code.png"  # Replace this with the actual image path and filename

        img.save(image_filename)

        return jsonify({"image_url": image_filename}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()
