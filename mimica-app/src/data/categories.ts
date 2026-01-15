export const CATEGORIES = [
    "Profesiones",
    "Lugares",
    "Acciones",
    "Objetos",
    "Seres Vivos",
] as const;

export type Category = (typeof CATEGORIES)[number];
