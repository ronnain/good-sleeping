import { CardQuestionDTO } from "../shared/card-quizz/card-question.dto";

// todo add propositions here
export const IS_DOLPHIN_QUESTIONS: CardQuestionDTO[] = [
  {
    description: "Je n'arrive pas à m'endormir (ou je me réveille) s'il y a un peu de lumière ou du bruit.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "La nourriture me laisse relativement indéfférent(e).",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "Je me réveille généralment avant la sonnerie de mon réveil.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "Je ne dors pas bien en avion, même avec un masque et des bouchons d'oreille.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "La fatigue me rend souvent irritable.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "Je me fais beaucoup trop de souci pour de menus détails.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "J'ai éré déclaré(e) insommniaque par un médecin (ou je me suis auto-diagnostiqué(e)).",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "Pendant mes études, j'étais très stressé(e) par mes notes.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "Au lieu de m'endormir, je rumine le passé et je m'insquiète pour l'avenir.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  },
  {
    description: "Je suis perfectionniste.",
    propositions: [
      [
        { text: "Vrai", value: 1 },
        { text: "Faux", value: 0 }
      ]
    ]
  }
];

export const BIORYTHME_QUESTIONS: CardQuestionDTO[] =
  [
    {
      description: "Tu n’as rien à faire demain et tu t’autorises à faire la grasse matinée. A quelle heure ton corps se réveille-t-il ?",
      propositions: [
        { text: "Avant 6 h 30.", value: 1 },
        { text: "Entre 6 h 30 et 8 h 45.", value: 2 },
        { text: "Après 8 h 45.", value: 3 }
      ]
    },
    {
      description: "Quand tu as besoin de te lever à une heure précise, utilises-tu un réveil ?",
      propositions: [
        {
          text: "Inutile, ton corps se réveille tout seul à l’heure dite.",
          value: 1
        },
        {
          text: "Oui, mais tu te lèves tout de suite quand le réveil sonne.",
          value: 2
        },
        {
          text: "Oui, et tu le reprogrammes plusieurs fois afin de dormir encore un peu.",
          value: 3
        }
      ]
    },
    {
      description: "A quelle heure te réveilles-tu le week-end ?",
      propositions: [
        { text: "A la même heure qu’en semaine.", value: 1 },
        {
          text: "Entre trois-quarts d’heure et une heure et demie plus tard qu’en semaine.",
          value: 2
        },
        {
          text: "Plus d’une heure et demie plus tard qu’en semaine.",
          value: 3
        }
      ]
    },
    {
      description: "Souffres-tu souvent de jet-lag après un voyage ?",
      propositions: [
        { text: "Oui, et il te faut du temps pour t’en remettre.", value: 1 },
        { text: "Oui, mais tu vas mieux après 48 heures.", value: 2 },
        {
          text: "Non, tu t’en remets très vite, surtout si tu voyages d’est en ouest.",
          value: 3
        }
      ]
    },
    {
      description: "Quel est ton repas préféré ? (En terme d’horaires)",
      propositions: [
        { text: "Le petit-déjeuner.", value: 1 },
        { text: "Le déjeuner.", value: 2 },
        { text: "Le dîner.", value: 3 }
      ]
    },
    {
      description: "Tu retournes au lycée pour passer le bac. A quelle heure préfères-tu commencer les examens afin de maximiser ta concentration (et non afin d’en finir au plus vite) ?",
      propositions: [
        { text: "En début de matinée.", value: 1 },
        { text: "En début d’après-midi.", value: 2 },
        { text: "En milieu d’après-midi.", value: 3 }
      ]
    },
    {
      description: "Tu dois programmer une séance de sport intensif. Quelle heure choisis-tu ?",
      propositions: [
        { text: "Avant 8 h.", value: 1 },
        { text: "Entre 8h et 16 h.", value: 2 },
        { text: "Après 16 h.", value: 3 }
      ]
    },
    {
      description: "Quand es-tu le plus attentif(ve) ?",
      propositions: [
        { text: "Une à deux heures après le réveil.", value: 1 },
        { text: "Deux à quatre heures après le réveil. ", value: 2 },
        { text: "Quatre à six heures après le réveil.", value: 3 }
      ]
    },
    {
      description: "Tu peux choisir tes horaires de travail. Quel bloc de cinq heures consécutives préfères-tu ?",
      propositions: [
        { text: "De 4 h à 9 h du matin.", value: 1 },
        { text: "De 9 h à 14 h.", value: 2 },
        { text: "De 16 h à 21 h.", value: 3 }
      ]
    },
    {
      description: "Tu es plutôt… ?",
      propositions: [
        {
          text: "Cerveau gauche (un esprit stratégique et analytique).",
          value: 1
        },
        { text: "Entre les deux.", value: 2 },
        {
          text: "Cerveau droit (un esprit créatif et clairvoyant).",
          value: 3
        }
      ]
    },
    {
      description: "Fais-tu la sieste ?",
      propositions: [
        { text: "Jamais.", value: 1 },
        { text: "Parfois le week-end.", value: 2 },
        { text: "Si tu fais la sieste, tu ne dors pas la nuit.", value: 3 }
      ]
    },
    {
      description: "Une tâche physique importante (déplacer des meubles, jardiner…) occupe deux heures de ta journée. Quel moment choisis-tu afin de maximiser ton efficacité et ta sécurité ?",
      propositions: [
        { text: "De 8 h à 10 h.", value: 1 },
        { text: "De 11 h à 13 h.", value: 2 },
        { text: "De 18 h à 20 h.", value: 3 }
      ]
    },
    {
      description: "En ce qui concerne ta santé (nourriture, exercice…), quelle affirmation te ressemble le plus ?",
      propositions: [
        {
          text: "“Je fais des choix raisonnables la plupart du temps”.",
          value: 1
        },
        {
          text: "“Je fais des choix raisonnables de temps en temps”.",
          value: 2
        },
        { text: "J’ai du mal à faire des choix raisonnables.", value: 3 }
      ]
    },
    {
      description: "Es-tu à l’aise avec la prise de risques ?",
      propositions: [
        { text: "Pas du tout.", value: 1 },
        { text: "Plus ou moins.", value: 2 },
        { text: "Très.", value: 3 }
      ]
    },
    {
      description: "Tu te vois plutôt…",
      propositions: [
        {
          text: "Orienté(e) vers l’avenir, avec de grands projets et des objectifs clairs.",
          value: 1
        },
        {
          text: "Instruit(e) par le passé, plein(e) d’espoir pour l’avenir et désireux(se) de vivre l’instant présent.",
          value: 2
        },
        {
          text: "Ancré(e) dans le présent. L'importance, c’est de se sentir bien.",
          value: 3
        }
      ]
    },
    {
      description: "Tu te décris plutôt comme un(e) élève…",
      propositions: [
        { text: "Exemplaire.", value: 1 },
        { text: "Sérieux(se).", value: 2 },
        { text: "Fainéant(e).", value: 3 }
      ]
    },
    {
      description: "Quand tu te réveilles le matin, tu te sens…",
      propositions: [
        { text: "Fais (fraîche) et dispos(e).", value: 1 },
        { text: "Légèrement hébété(e), mais très temporairement.", value: 2 },
        { text: "Assommé(e), avec les paupières lourdes.", value: 3 }
      ]
    },
    {
      description: "As-tu de l’appétit au réveil ?",
      propositions: [
        { text: "Oui, beaucoup.", value: 1 },
        { text: "Oui, un peu.", value: 2 },
        { text: "Non, pas du tout.", value: 3 }
      ]
    },
    {
      description: "A quelle fréquence souffres-tu des symptômes de l’insomnie ?",
      propositions: [
        {
          text: "Presque jamais, ou seulement après un changement de fuseau horaire.",
          value: 1
        },
        {
          text: "Parfois, dans les moments difficiles ou quand tu es stressé(e).",
          value: 2
        },
        { text: "De manière chronique. Tu as des périodes.", value: 3 }
      ]
    },
    {
      description: "D'une manière générale, la vie que tu as menée te satisfait…",
      propositions: [
        { text: "Beaucoup.", value: 1 },
        { text: "Assez.", value: 2 },
        { text: "Peu.", value: 3 }
      ]
    }
  ];