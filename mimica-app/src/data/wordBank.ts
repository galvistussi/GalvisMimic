import type { Category } from "./categories";

export const WORD_BANK: Record<Category, string[]> = {
    Profesiones: [
        "Médico", "Bombero", "Astronáuta", "Arquitecto", "Cocinero",
        "Detective", "Bailarín", "Programador", "Agricultor", "Peluquero",
        "Carpintero", "Abogado", "Piloto", "Plomero", "Escritor",
        "Fotógrafo", "Actor", "Mecánico", "Vendedor", "Maestro"
    ],
    Lugares: [
        "Playa", "Bosque", "Gimnasio", "Biblioteca", "Aeropuerto",
        "Casino", "Parque de Diversiones", "Hospital", "Cine", "Restaurante",
        "Iglesia", "Estadio", "Mercado", "Cueva", "Isla",
        "Desierto", "Montaña", "Zoológico", "Oficina", "Escuela"
    ],
    Acciones: [
        "Saltar la cuerda", "Pintar un cuadro", "Cambiar un pañal", "Pasear al perro", "Hacer surf",
        "Tocar el violín", "Subir una escalera", "Pescar", "Bucear", "Hacer yoga",
        "Planchar la ropa", "Conducir", "Comer espaguetis", "Dormir", "Llorar",
        "Reír", "Bailar salsa", "Cantar opera", "Correr una maratón", "Cocinar"
    ],
    Objetos: [
        "Teléfono", "Paraguas", "Cepillo de dientes", "Guitarra", "Bicicleta",
        "Reloj", "Llave", "Gafas", "Silla", "Mesa",
        "Cámara", "Libro", "Botella", "Espejo", "Martillo",
        "Globo", "Linterna", "Pala", "Tijeras", "Diccionario"
    ],
    "Seres Vivos": [
        "Elefante", "Mariposa", "Pingüino", "Árbol", "Dinosaurio",
        "Jirafa", "Pulpo", "Gato", "Perro", "Abeja",
        "León", "Mono", "Cebra", "Baleen", "Serpiente",
        "Vaca", "Caballo", "Flor", "Seta", "Pájaro"
    ]
};
