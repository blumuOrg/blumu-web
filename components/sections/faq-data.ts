export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faqMeistrams: FaqEntry[] = [
  {
    id: "m1",
    question: "Ar BLUMU renka komisinius mokesčius už atliktus darbus?",
    answer:
      "Ne. Tai yra didžiausias mūsų privalumas. Mes netaikome jokių komisinių mokesčių. Visi pinigai, kuriuos klientas sumoka už jūsų darbą, 100 % lieka jums. Jūs patys suderinate kainą ir atsiskaitymo būdą tiesiogiai su klientu.",
  },
  {
    id: "m2",
    question:
      "Ar privalau turėti registruotą veiklą, kad galėčiau teikti paslaugas?",
    answer:
      "Taip, BLUMU platformoje paslaugas teikti galima tik oficialiai. Registracijos metu jūsų bus paprašyta įvesti galiojantį Verslo liudijimo numerį, Individualios veiklos (IV) pažymos numerį arba įmonės kodą.",
  },
  {
    id: "m3",
    question: "Ar galiu savo profilyje siūlyti kelių skirtingų sričių paslaugas?",
    answer:
      "Taip! BLUMU programėlėje vienam profiliui galite pasirinkti iki 3 skirtingų paslaugų kategorijų (pvz., apdaila, santechnika ir smulkus remontas).",
  },
  {
    id: "m4",
    question: "Kaip klientai mane ras?",
    answer:
      "BLUMU pirmiausia naudoja išmaniąją geolokaciją – kai klientas ieško paslaugos, sistema jam iškart parodo meistrus, esančius arčiausiai jo, taip taupant jūsų laiką kelionėms. Be to, programėlėje veikia ir patogi paslaugų skelbimų (sąrašo) skiltis. Joje klientai gali naudoti detalius filtrus, kad greitai ir tikslingai atrastų būtent jūsų profilį.",
  },
];

export const faqKlientams: FaqEntry[] = [
  {
    id: "k1",
    question: "Ar programėlės atsisiuntimas ir meistrų paieška yra mokama?",
    answer:
      "Ne, klientams BLUMU programėlė yra visiškai nemokama. Jūs galite nemokamai ieškoti meistrų, peržiūrėti jų profilius ir susisiekti su jais. Jūs mokate tik pačiam meistrui už realiai atliktą darbą.",
  },
  {
    id: "k2",
    question: "Kaip vyksta apmokėjimas už atliktą remontą ar paslaugą?",
    answer:
      "Atsiskaitymas už paslaugas vyksta tiesiogiai tarp jūsų ir meistro jums patogiu būdu (grynaisiais arba bankiniu pavedimu) po to, kai darbas yra atliktas arba pagal jūsų susitarimą. BLUMU programėlė šių mokėjimų neapdoroja.",
  },
  {
    id: "k3",
    question: "Kaip galiu žinoti, ar meistras yra patikimas?",
    answer:
      "Mes rūpinamės jūsų saugumu. Kiekvienas BLUMU platformoje esantis meistras yra patvirtinęs savo tapatybę ir legalią veiklą. Taip pat programėlėje veikia atsiliepimų sistema – galite matyti ankstesnių klientų paliktus įvertinimus ir komentarus apie meistro darbą.",
  },
  {
    id: "k4",
    question: "Ar atliktiems darbams suteikiama garantija?",
    answer:
      "Garantiją už atliktą darbą, medžiagas ir kokybę suteikia pats meistras, su kuriuo sudarote žodinį ar rašytinį susitarimą. Visada rekomenduojame prieš pradedant darbus aptarti garantines sąlygas tiesiogiai su pasirinktu specialistu.",
  },
];
