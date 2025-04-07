// fields.js
// Beskrivning: Samlade fältdefinitioner för formulärkomponenter för olika jobbtyper.

/* Lackering */
export const lackeringFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text" },
    { name: "firma", label: "Firma", type: "text" },
    { name: "kommentar", label: "Kommentar", type: "textarea" },
    { name: "delar", label: "Delar", type: "checkboxGroup" }
  ];
  
  /* Rekond */
  export const rekondFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text" },
    { name: "firma", label: "Firma", type: "text" },
    { name: "tvatt", label: "Tvätt", type: "text" },
    { name: "kommentar", label: "Kommentar", type: "textarea" }
  ];
  
  /* Verkstad */
  export const verkstadFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text", placeholder: "Ange registreringsnummer" },
    { name: "typ_av_jobb", label: "Typ av jobb", type: "text", placeholder: "Ange typ av jobb" },
    { name: "kommentar", label: "Kommentar", type: "textarea", placeholder: "Skriv en kommentar" }
  ];
  
  /* PWR */
  export const pwrFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text", placeholder: "Ange registreringsnummer" },
    { name: "kommentar", label: "Kommentar", type: "textarea", placeholder: "Skriv en kommentar" },
    { name: "delar", label: "Del", type: "checkboxGroup" }
  ];
  
  /* Besiktning */
  export const besiktningFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text", placeholder: "Ange registreringsnummer" },
    { name: "sista_bes_datum", label: "Sista besiktningsdatum", type: "date", placeholder: "YYYY-MM-DD" },
    { name: "kommentar", label: "Kommentar", type: "textarea", placeholder: "Skriv en kommentar" }
  ];
  
  /* Körning */
  export const korningFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text", placeholder: "Ange registreringsnummer" },
    {
      name: "korningstyp",
      label: "Korningstyp",
      type: "select",
      options: [
        { label: "Leverans", value: "Leverans" },
        { label: "Hämtning", value: "Hämtning" }
      ]
    },
    { name: "forare", label: "Förare", type: "text", placeholder: "Ange förare" },
    { name: "kommentar", label: "Kommentar", type: "textarea", placeholder: "Skriv en kommentar" },
    { name: "planerat_datum", label: "Planerat datum", type: "date" }
  ];
  
  /* Åtgärd */
  export const atgardFields = [
    { name: "regnr", label: "Registreringsnummer", type: "text", placeholder: "Ange registreringsnummer" },
    { name: "anstalld", label: "Anställd", type: "text", placeholder: "Ange anställd" },
    { name: "kommentar", label: "Kommentar", type: "textarea", placeholder: "Skriv en kommentar" },
    { name: "sista_datum", label: "Sista Datum", type: "date", placeholder: "Ange datum" }
  ];
  