#hackathon2.py
print("Starting hackathon2.py...")

from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import openai
import os

app = Flask(__name__)
CORS(app)  # allow cross-origin requests for frontend JS

# ---------- CONFIGURATION ----------
SUPABASE_URL = "https://qrckcaithtgzftdcupoz.supabase.co"
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyY2tjYWl0aHRnemZ0ZGN1cG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MzczMzgsImV4cCI6MjA3MjIxMzMzOH0.1axjJwj6a0nPW9py6TxM0wct_MTQ807mTno3CKm5wWQ'
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

openai.api_key = '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' # replace with your OpenAI key

# ---------- ROUTES ----------

# Fetch all recipes
@app.route("/recipes")
def get_recipes():
    search = request.args.get("search", "").lower()

    # Fetch all recipes
    response = supabase.table("recipes").select("*").execute()

    # Use response.data for the actual data
    recipes = getattr(response, "data", None)
    error = getattr(response, "error", None)

    if error:
        return jsonify({"error": str(error)}), 500

    if recipes is None:
        return jsonify([])  # empty list if no data

    # Apply search filter if provided
    if search:
        recipes = [r for r in recipes if search in r.get("recipe_name", "").lower()]

    return jsonify(recipes)


# AI recipe suggestions
@app.route("/ai_suggestions", methods=["POST"])
def ai_suggestions():
    data = request.get_json()
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"Suggest recipes based on: {prompt}"}
            ],
            temperature=0.7,
            max_tokens=150
        )

        # Extract the suggestion from the response
        suggestion = response.choices[0].message.content.strip()
        return jsonify({"suggestion": suggestion})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# ---------- RUN SERVER ----------
# ---------- RUN SERVER ----------
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
if __name__ == "__main__":
    print("Running Flask server...")
    app.run(debug=True, port=5000)

