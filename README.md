Mama's Kitchen Recipes 🍳
A modern, responsive web application for discovering and sharing delicious recipes, featuring AI-powered suggestions and secure payment integration.

🌟 Features
Recipe Database: Browse a curated collection of recipes with detailed ingredients and instructions

Search Functionality: Find recipes by name or ingredients

AI Recipe Suggestions: Get personalized recipe recommendations using OpenAI's GPT-3.5

User Authentication: Secure signup/login system powered by Supabase

Premium Subscription: One-week free trial with payment integration via IntaSend

Responsive Design: Works beautifully on desktop, tablet, and mobile devices

Modern UI: Clean, food-themed interface with intuitive navigation

🛠️ Tech Stack
Frontend
HTML5, CSS3, JavaScript (ES6+)

Font Awesome Icons

IntaSend Payment Gateway

Backend
Python Flask web framework

Supabase (PostgreSQL database & authentication)

OpenAI GPT-3.5 for AI suggestions

Flask-CORS for cross-origin requests

Deployment
Client-side: Static hosting compatible (Netlify, Vercel, GitHub Pages)

Server-side: Flask application (localhost:5000 for development)

📦 Installation & Setup
Prerequisites
Python 3.7+

Node.js (for potential future frontend build tools)

Supabase account

OpenAI API key

1. Clone the Repository
bash
git clone <repository-url>
cd mama-kitchen-recipes
2. Backend Setup
bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors supabase openai python-dotenv

# Set environment variables (create a .env file)
export SUPABASE_URL="your_supabase_url"
export SUPABASE_KEY="your_supabase_key"
export OPENAI_API_KEY="your_openai_key"

# Run the Flask server
python hackathon2.py
3. Frontend Setup
The frontend is ready to use as static files. Simply open index.html in a browser or serve it with a local server.

For local development with live reloading:

bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
🗄️ Database Schema
The application uses a Supabase PostgreSQL database with the following structure:

Recipes Table
id (uuid, primary key)

recipe_name (text)

category (text)

ingredients (text)

steps (text)

created_at (timestamp)

Users Table (Managed by Supabase Auth)
id (uuid, primary key)

email (text)

created_at (timestamp)

🔌 API Endpoints
GET /recipes
Fetches all recipes, optionally filtered by search term.

Query Parameters:

search (optional): Filter recipes by name

Response:

json
[
  {
    "id": "uuid",
    "recipe_name": "String",
    "category": "String",
    "ingredients": "String",
    "steps": "String"
  }
]
POST /ai_suggestions
Get AI-generated recipe suggestions based on user input.

Request Body:

json
{
  "prompt": "User input text"
}
Response:

json
{
  "suggestion": "AI-generated response"
}
🎨 Customization
Styling
Modify hackathon2.css to customize the appearance:

Color scheme (currently green food-themed)

Typography

Layout and spacing

Responsive breakpoints

Content
Update hero image in HTML and CSS

Modify recipe data in Supabase

Customize text content throughout the site

🔒 Security Notes
API keys are stored environment variables (not in code)

Supabase handles user authentication securely

All sensitive operations are server-side

CORS is properly configured for development

🚀 Deployment
Frontend (Static Files)
Deploy to any static hosting service:

Netlify

Vercel

GitHub Pages

Firebase Hosting

Backend (Flask API)
Deploy to:

Heroku

DigitalOcean App Platform

PythonAnywhere

AWS Elastic Beanstalk

Remember to set environment variables on your deployment platform.

📱 Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Team
Designed with ❤️ by KarMai Tech

🆘 Support
For support, email info@karmaitech.com or call +254 713 854 865.

