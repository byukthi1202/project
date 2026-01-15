async function checkGrammar() {
  const text = document.querySelector("textarea").value;

  if (!text.trim()) {
    alert("Please enter some text");
    return;
  }

  try {
    const response = await fetch(
      "https://backendproject-2-4r6i.onrender.com/check-grammar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      }
    );

    const data = await response.json();
    alert("Corrected Text:\n\n" + data.corrected_text);

  } catch (error) {
    alert("Backend is waking up, try again in a few seconds");
  }
}

