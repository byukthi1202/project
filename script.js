async function checkGrammar() {
  const textarea = document.querySelector("textarea");
  const text = textarea.value.trim();

  if (!text) {
    alert("Please enter some text first.");
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
        body: JSON.stringify({ text: text })
      }
    );

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    alert("Corrected Text:\n\n" + data.corrected_text);

  } catch (error) {
    alert(
      "Backend is waking up (free server). Please wait 5–10 seconds and try again."
    );
    console.error(error);
  }
}

