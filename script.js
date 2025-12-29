let indexQuestion = 0;
let score = 0;
let questionValidee = false;

const questions = [
    /*{
        type: "text",
        question: "Quelle est la ville dans laquelle nous nous sommes rencontrés ?",
        bonneReponse: "Le Lamentin"
    },
    {
        type: "text",
        question: "Quelle est la ville dans laquelle on a passé le plus de temps ensemble (depuis qu'on est en couple) ?",
        bonneReponse: "Lyon"
    },
    {
        type: "qcm",
        question: "Quelle est la ville dans laquelle on se projette le plus ?",
        options: ["Lyon", "Paris", "Aix-en-Provence", "Saint Andiol", "Lille", "Porto Vecchio"],
        bonneReponse: "Paris"
    },
    {
        type: "qcm",
        question: " Quel adjectif nous définit le mieux ?",
        options: ["jovials", "en bon terme", "amoureux", "copaings", "autre ??"],
        bonneReponse: "amoureux"
    },
    {
        type: "qcm",
        question: " Quel adjectif nous définit le mieux en deuxième?",
        options: ["précautionneux", "studieux", "en avance", "en retard", "gourmands"],
        bonneReponse: "gourmands"
    },*/
    {
        type: "text",
        question: " Quel aliment fait le plus l'unanimité entre nous deux ?",
        bonneReponse: "chocolat"
    }
];


function afficherQuestion() {
    questionValidee = false;
    document.body.className = "";
    document.getElementById("message").innerText = "";
    document.getElementById("next-btn").style.display = "none";

    const q = questions[indexQuestion];
    document.getElementById("question").innerText = q.question;

    const form = document.getElementById("qcm-form");
    const inputText = document.getElementById("text-answer");

    form.innerHTML = "";
    inputText.value = "";

    if (q.type === "qcm") {
        form.style.display = "block";
        inputText.style.display = "none";

        q.options.forEach(opt => {
            form.innerHTML += `
                <label>
                    <input type="radio" name="answer" value="${opt}">
                    ${opt}
                </label>
            `;
        });
    } else {
        form.style.display = "none";
        inputText.style.display = "block";
    }
}

function valider() {
    if (questionValidee) return;

    const q = questions[indexQuestion];
    let bonne = false;

    if (q.type === "qcm") {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return;
        bonne = selected.value === q.bonneReponse;
    } else {
        const input = document.getElementById("text-answer").value.trim();
        bonne = input === q.bonneReponse;
    }

    if (bonne) {
        score++;
        questionValidee = true;
        document.body.classList.add("good");
        document.getElementById("message").innerText = "✅ Bonne réponse !";
        document.getElementById("next-btn").style.display = "inline-block";
    } else {
        document.body.classList.add("bad");
        document.getElementById("message").innerText = "❌ Réessaie";
    }
}

function questionSuivante() {
    indexQuestion++;
    if (indexQuestion < questions.length) {
        afficherQuestion();
    } else {
        finQuiz();
    }
}

function finQuiz() {
    document.body.className = "";

    const moyenne = questions.length / 2;
    let boutonCadeau = "";

    if (score > moyenne) {
        boutonCadeau = `
            <button onclick="window.location.href='lieeen'">
                🎁 Voir le cadeau
            </button>
        `;
    }

    document.querySelector(".container").innerHTML = `
        <h1>🎉 Fin du quiz</h1>
        <p>Score : ${score} / ${questions.length}</p>
        <p><strong>hihi bien joué</strong></p>
        <p><strong>avec ces questions, tu as quelques éléments pour imaginer le cadeau</strong></p>
        ${boutonCadeau}
    `;
}


afficherQuestion();
