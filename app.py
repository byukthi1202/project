from flask import Flask, request, jsonify
from flask_cors import CORS
import language_tool_python

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Initialize grammar tool
tool = language_tool_python.LanguageTool('en-US')

@app.route("/check-grammar", methods=["POST"])
def check_grammar():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "Text is empty"}), 400

    matches = tool.check(text)
    corrected_text = language_tool_python.utils.correct(text, matches)

    errors = []
    for match in matches:
        errors.append({
            "message": match.message,
            "incorrect": text[match.offset: match.offset + match.errorLength],
            "suggestions": match.replacements
        })

    return jsonify({
        "original_text": text,
        "corrected_text": corrected_text,
        "errors": errors
    })


if __name__ == "__main__":
    app.run(debug=True)
