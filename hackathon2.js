
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://qrckcaithtgzftdcupoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyY2tjYWl0aHRnemZ0ZGN1cG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MzczMzgsImV4cCI6MjA3MjIxMzMzOH0.1axjJwj6a0nPW9py6TxM0wct_MTQ807mTno3CKm5wWQ'


const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {

  // ---------- SUPABASE AUTH ----------
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const forgotBtn = document.getElementById('forgotBtn');

  signupBtn?.addEventListener('click', async () => { /* signup logic */ });
  loginBtn?.addEventListener('click', async () => { /* login logic */ });
  forgotBtn?.addEventListener('click', async () => { /* reset logic */ });

  // ---------- FETCH & SEARCH RECIPES ----------
  const recipesHeader = document.getElementById('recipesHeader');
  const recipeResults = document.getElementById('recipeResults');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  async function fetchRecipes() {
    try {
      const res = await fetch("http://127.0.0.1:5000/recipes");
      const recipes = await res.json();
      recipeResults.innerHTML = recipes.map(r => `
        <h3>${r.recipe_name}</h3>
        <p><strong>Category:</strong> ${r.category}</p>
        <p><strong>Ingredients:</strong><br>${r.ingredients.replace(/\n/g, '<br>')}</p>
        <p><strong>Steps:</strong><br>${r.steps.replace(/\n/g, '<br>')}</p>
      `).join('');
    } catch (err) {
      console.error("Error fetching recipes:", err);
      recipeResults.innerHTML = "<p>Error fetching recipes.</p>";
    }
  }

  recipesHeader?.addEventListener('click', () => {
    if (recipeResults.style.display === 'none') {
      recipeResults.style.display = 'block';
      fetchRecipes();
    } else {
      recipeResults.style.display = 'none';
    }
  });

  searchBtn?.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    try {
      const res = await fetch(`http://127.0.0.1:5000/recipes?search=${searchTerm}`);
      const recipes = await res.json();
      if (!recipes.length) {
        recipeResults.innerHTML = "<p>No recipes found.</p>";
        return;
      }
      recipeResults.innerHTML = recipes.map(r => `
        <h3>${r.recipe_name}</h3>
        <p><strong>Category:</strong> ${r.category}</p>
        <p><strong>Ingredients:</strong><br>${r.ingredients.replace(/\n/g, '<br>')}</p>
        <p><strong>Steps:</strong><br>${r.steps.replace(/\n/g, '<br>')}</p>
      `).join('');
    } catch (err) {
      console.error("Error fetching recipes:", err);
      recipeResults.innerHTML = "<p>Error fetching recipes.</p>";
    }
  });

  // ---------- AI SUGGESTIONS ----------
 const aiBtn = document.getElementById("aiBtn");
  const aiInput = document.getElementById("aiInput");
  const aiResult = document.getElementById("aiResult");

  aiBtn.addEventListener("click", async () => {
    const prompt = aiInput.value.trim();
    if (!prompt) {
      alert("Please enter a prompt for AI");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/ai_suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      aiResult.textContent = data.suggestion || data.error || "No suggestion returned.";
    } catch (err) {
      console.error("AI suggestion error:", err);
      aiResult.textContent = "Error fetching AI suggestion.";
    }
  });
});

