function calculScore() {
    let score = 0;

    const reponses = document.querySelectorAll('input[type="radio"]:checked');
    reponses.forEach(r => {
        score += parseInt(r.value);
    });

    document.getElementById("resultat").innerText =
        "Votre score : " + score + " / 2";
}
