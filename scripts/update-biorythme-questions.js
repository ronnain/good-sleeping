const fs = require('fs');

const text = `[
  {
    "description": "Je n'arrive pas à m'endormir (ou je me réveille) s'il y a un peu de lumière ou du bruit."
  },
  {
    "description": "La nourriture me laisse relativement indéfférent(e)."
  },
  {
    "description": "Je me réveille généralment avant la sonnerie de mon réveil."
  },
  {
    "description": "Je ne dors pas bien en avion, même avec un masque et des bouchons d'oreille."
  },
  {
    "description": "La fatigue me rend souvent irritable."
  },
  {
    "description": "Je me fais beaucoup trop de souci pour de menus détails."
  },
  {
    "description": "J'ai éré déclaré(e) insommniaque par un médecin (ou je me suis auto-diagnostiqué(e))."
  },
  {
    "description": "Pendant mes études, j'étais très stressé(e) par mes notes."
  },
  {
    "description":"Au lieu de m'endormir, je rumine le passé et je m'insquiète pour l'avenir."
  },
  {
    "description": "Je suis perfectionniste."
  }
]`;

const questions = JSON.parse(text);

const trueFalsePropistions = [
  {
    text: 'Vrai',
    value: 1
  },
  {
    text: 'Faux',
    value: 0
  },
];

questions.forEach(question => {
    question.propositions = [...trueFalsePropistions];
});



fs.writeFileSync("./output.json", JSON.stringify(questions));