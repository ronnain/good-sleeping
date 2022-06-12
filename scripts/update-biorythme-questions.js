const fs = require('fs');

const text = `[
    {
      "description": "Tu n’as rien à faire demain et tu t’autorises à faire la grasse matinée. A quelle heure ton corps se réveille-t-il ?",
      "propositions": [
        {
          "text": "Avant 6 h 30."
        },
        {
          "text": "Entre 6 h 30 et 8 h 45."
        },
        {
          "text": "Après 8 h 45."
        }
      ]
    },
    {
      "description": "Quand tu as besoin de te lever à une heure précise, utilises-tu un réveil ?",
      "propositions": [
        {
          "text": "Inutile, ton corps se réveille tout seul à l’heure dite."
        },
        {
          "text": "Oui, mais tu te lèves tout de suite quand le réveil sonne."
        },
        {
          "text": "Oui, et tu le reprogrammes plusieurs fois afin de dormir encore un peu."
        }
      ]
    },
    {
      "description": "A quelle heure te réveilles-tu le week-end ?",
      "propositions": [
        {
          "text": "A la même heure qu’en semaine."
        },
        {
          "text": "Entre trois-quarts d’heure et une heure et demie plus tard qu’en semaine."
        },
        {
          "text": "Plus d’une heure et demie plus tard qu’en semaine."
        }
      ]
    },
    {
      "description": "Souffres-tu souvent de jet-lag après un voyage ?",
      "propositions": [
        {
          "text": "Oui, et il te faut du temps pour t’en remettre."
        },
        {
          "text": "Oui, mais tu vas mieux après 48 heures."
        },
        {
          "text": "Non, tu t’en remets très vite, surtout si tu voyages d’est en ouest."
        }
      ]
    },
    {
      "description": "Quel est ton repas préféré ? (En terme d’horaires)",
      "propositions": [
        {
          "text": "Le petit-déjeuner."
        },
        {
          "text": "Le déjeuner."
        },
        {
          "text": "Le dîner."
        }
      ]
    },
    {
      "description": "Tu retournes au lycée pour passer le bac. A quelle heure préfères-tu commencer les examens afin de maximiser ta concentration (et non afin d’en finir au plus vite) ?",
      "propositions": [
        {
          "text": "En début de matinée."
        },
        {
          "text": "En début d’après-midi."
        },
        {
          "text": "En milieu d’après-midi."
        }
      ]
    },
    {
      "description": "Tu dois programmer une séance de sport intensif. Quelle heure choisis-tu ?",
      "propositions": [
        {
          "text": "Avant 8 h."
        },
        {
          "text": "Entre 8h et 16 h."
        },
        {
          "text": "Après 16 h."
        }
      ]
    },
    {
      "description": "Quand es-tu le plus attentif(ve) ?",
      "propositions": [
        {
          "text": "Une à deux heures après le réveil."
        },
        {
          "text": "Deux à quatre heures après le réveil. "
        },
        {
          "text": "Quatre à six heures après le réveil."
        }
      ]
    },
    {
      "description": "Tu peux choisir tes horaires de travail. Quel bloc de cinq heures consécutives préfères-tu ?",
      "propositions": [
        {
          "text": "De 4 h à 9 h du matin."
        },
        {
          "text": "De 9 h à 14 h."
        },
        {
          "text": "De 16 h à 21 h."
        }
      ]
    },
    {
      "description": "Tu es plutôt… ?",
      "propositions": [
        {
          "text": "Cerveau gauche (un esprit stratégique et analytique)."
        },
        {
          "text": "Entre les deux."
        },
        {
          "text": "Cerveau droit (un esprit créatif et clairvoyant)."
        }
      ]
    },
    {
      "description": "Fais-tu la sieste ?",
      "propositions": [
        {
          "text": "Jamais."
        },
        {
          "text": "Parfois le week-end."
        },
        {
          "text": "Si tu fais la sieste, tu ne dors pas la nuit."
        }
      ]
    },
    {
      "description": "Une tâche physique importante (déplacer des meubles, jardiner…) occupe deux heures de ta journée. Quel moment choisis-tu afin de maximiser ton efficacité et ta sécurité ?",
      "propositions": [
        {
          "text": "De 8 h à 10 h."
        },
        {
          "text": "De 11 h à 13 h."
        },
        {
          "text": "De 18 h à 20 h."
        }
      ]
    },
    {
      "description": "En ce qui concerne ta santé (nourriture, exercice…), quelle affirmation te ressemble le plus ?",
      "propositions": [
        {
          "text": "“Je fais des choix raisonnables la plupart du temps”."
        },
        {
          "text": "“Je fais des choix raisonnables de temps en temps”."
        },
        {
          "text": "J’ai du mal à faire des choix raisonnables."
        }
      ]
    },
    {
      "description": "Es-tu à l’aise avec la prise de risques ?",
      "propositions": [
        {
          "text": "Pas du tout."
        },
        {
          "text": "Plus ou moins."
        },
        {
          "text": "Très."
        }
      ]
    },
    {
      "description": "Tu te vois plutôt…",
      "propositions": [
        {
          "text": "Orienté(e) vers l’avenir, avec de grands projets et des objectifs clairs."
        },
        {
          "text": "Instruit(e) par le passé, plein(e) d’espoir pour l’avenir et désireux(se) de vivre l’instant présent."
        },
        {
          "text": "Ancré(e) dans le présent. L'importance, c’est de se sentir bien."
        }
      ]
    },
    {
      "description": "Tu te décris plutôt comme un(e) élève…",
      "propositions": [
        {
          "text": "Exemplaire."
        },
        {
          "text": "Sérieux(se)."
        },
        {
          "text": "Fainéant(e)."
        }
      ]
    },
    {
      "description": "Quand tu te réveilles le matin, tu te sens…",
      "propositions": [
        {
          "text": "Fais (fraîche) et dispos(e)."
        },
        {
          "text": "Légèrement hébété(e), mais très temporairement."
        },
        {
          "text": "Assommé(e), avec les paupières lourdes."
        }
      ]
    },
    {
      "description": "As-tu de l’appétit au réveil ?",
      "propositions": [
        {
          "text": "Oui, beaucoup."
        },
        {
          "text": "Oui, un peu."
        },
        {
          "text": "Non, pas du tout."
        }
      ]
    },
    {
      "description": "A quelle fréquence souffres-tu des symptômes de l’insomnie ?",
      "propositions": [
        {
          "text": "Presque jamais, ou seulement après un changement de fuseau horaire."
        },
        {
          "text": "Parfois, dans les moments difficiles ou quand tu es stressé(e)."
        },
        {
          "text": "De manière chronique. Tu as des périodes."
        }
      ]
    },
    {
      "description": "D'une manière générale, la vie que tu as menée te satisfait…",
      "propositions": [
        {
          "text": "Beaucoup."
        },
        {
          "text": "Assez."
        },
        {
          "text": "Peu."
        }
      ]
    }
  ]`;

const questions = JSON.parse(text);

questions.forEach(question => {
    question.propositions.forEach((proposition, index) => {
        proposition.value = index + 1;
    });
});



fs.writeFileSync("./output.json", JSON.stringify(questions));