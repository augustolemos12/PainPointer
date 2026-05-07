export type Muscle = {
  id: string;
  label: string;
  region: string;
  actions: string[];
};

export const muscles: Record<string, Muscle> = {
  esternocleidomastoideo: {
    id: "esternocleidomastoideo",
    label: "Esternocleidomastoideo",
    region: "Cuello",
    actions: ["flexión cervical", "rotación de cabeza"],
  },
  pectoral_mayor: {
    id: "pectoral_mayor",
    label: "Pectoral mayor",
    region: "Tórax anterior",
    actions: ["aducción del brazo", "rotación interna"],
  },
  deltoide: {
    id: "deltoide",
    label: "Deltoide",
    region: "Hombro",
    actions: ["abducción del brazo"],
  },
  biceps: {
    id: "biceps",
    label: "Bíceps",
    region: "Brazo anterior",
    actions: ["flexión del codo", "supinación"],
  },
  serratos: {
    id: "serratos",
    label: "Serratos",
    region: "Costillas laterales",
    actions: ["estabilización escapular"],
  },
  recto_abdomen: {
    id: "recto_abdomen",
    label: "Recto del abdomen",
    region: "Abdomen",
    actions: ["flexión del tronco"],
  },
  oblicuo_externo: {
    id: "oblicuo_externo",
    label: "Oblicuo externo del abdomen",
    region: "Abdomen lateral",
    actions: ["rotación del tronco"],
  },
  extensores_dedos: {
    id: "extensores_dedos",
    label: "Extensores de los dedos",
    region: "Antebrazo posterior",
    actions: ["extensión de dedos"],
  },
  flexores_dedos: {
    id: "flexores_dedos",
    label: "Flexores de los dedos",
    region: "Antebrazo anterior",
    actions: ["flexión de dedos"],
  },
  cuadriceps: {
    id: "cuadriceps",
    label: "Cuádriceps femoral",
    region: "Muslo anterior",
    actions: ["extensión de rodilla"],
  },
  sartorio: {
    id: "sartorio",
    label: "Sartorio",
    region: "Muslo",
    actions: ["flexión de cadera", "rotación externa"],
  },
  trapecio: {
    id: "trapecio",
    label: "Trapecio",
    region: "Espalda superior",
    actions: ["elevación escapular"],
  },
  infraespinoso: {
    id: "infraespinoso",
    label: "Infraespinoso",
    region: "Hombro posterior",
    actions: ["rotación externa del hombro"],
  },
  dorsal_ancho: {
    id: "dorsal_ancho",
    label: "Dorsal ancho",
    region: "Espalda",
    actions: ["extensión del hombro", "aducción"],
  },
  triceps: {
    id: "triceps",
    label: "Tríceps",
    region: "Brazo posterior",
    actions: ["extensión del codo"],
  },
  gluteo_mayor: {
    id: "gluteo_mayor",
    label: "Glúteo mayor",
    region: "Cadera",
    actions: ["extensión de cadera"],
  },
  biceps_femoral: {
    id: "biceps_femoral",
    label: "Bíceps femoral",
    region: "Muslo posterior",
    actions: ["flexión de rodilla"],
  },
  gemelos: {
    id: "gemelos",
    label: "Gemelos",
    region: "Pantorrilla",
    actions: ["flexión plantar"],
  },
  tibial_anterior: {
    id: "tibial_anterior",
    label: "Tibial anterior",
    region: "Pierna anterior",
    actions: ["dorsiflexión del pie"],
  },
};