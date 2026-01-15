async function checkGrammar() {
  const text = document.querySelector("textarea").value;

  if (!text.trim()) {
    alert("Hey smarty 😌 Enter some text first!");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/check-grammar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Corrected Text:\n\n" + data.corrected_text);

  } catch (error) {
    console.error(error);
    alert("Backend not responding 😢");
  }
}
