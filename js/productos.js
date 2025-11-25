const productos = [
    {
        id: "Motivador",
        nombre: "Ducktor Motivator",
        subtitulo: "Tu Dosis Diaria de 'Tú Puedes'",
        descripcion: `¿Necesitas un empujón para ese sprint final? ¿O quizás un recordatorio de que eres capaz de superar cualquier bug?
            El Patito Motivador es tu aliado incansable, diseñado para infundirte esa energía y confianza extra que a veces se desvanecen en el largo camino del desarrollo.

            Este pequeño campeón no juzga, solo inspira. Colócalo en tu escritorio y deja que su espíritu inquebrantable te recuerde tus metas, celebre tus pequeños triunfos y te impulse a ver cada desafío como una oportunidad para crecer. Es la voz amable que susurra:`,
        frase: "¡Sigue adelante, tú puedes con esto!",
        caracteristicas: [
            "Viste su icónico chándal de coach.",
            "Lleva un silbato y un portapapeles con gráficos de progreso ascendente.",
            "Fabricado con 100% de ánimo y positividad."],
        imagenGaleria: "../img/CoachMotivacional.png",
        imagenFrontal: "../img/CoachMotivacionalFrontP.png",
        imagenLateral: "../img/CoachMotivacionalLatP.png",
        precio: 12.00,
        categoria: "Corporativo",
        stock: 10,
    },
    {
        id: "Escucha",
        nombre: "Ducktor Escucha Activa",
        subtitulo: "El Arte de Escuchar",
        descripcion: `¿Sientes que las stand-ups se alargan y nadie entiende el pull request? ¿Las reuniones de sprint planning se sienten como un monólogo que podrías haberte saltado?
        El Ducktor Escucha Activa es tu consultor de comunicación. Está diseñado para recordarte que la mitad de la solución no está en teclear, sino en entender qué se necesita realmente.

        Colócalo junto a tu monitor durante las videollamadas. Con su postura atenta, te recordará pausar, asentir y preguntar "¿has probado a...?" antes de saltar a la solución. Es el recordatorio silencioso que dice:`,
        frase: "Entendido. ¡Ahora, cuéntame más!",
        caracteristicas: [
            "Su postura corporal abierta y receptiva, listo para escuchar y retener.",
            "Lleva una libreta y un lápiz para 'tomar notas' de tus ideas.",
            "Fabricado con 99% de paciencia y 1% de 'ajá, te sigo'."],
        imagenGaleria: "../img/EscuchaActiva.png",
        imagenFrontal: "../img/EscuchaActivaFrontP.png" ,
        imagenLateral: "../img/EscuchaActivaLatP.png",
        precio: 12.00,
        categoria: "Corporativo",
        stock: 5,
    },
    {
        id: "Focus",
        nombre: "Ducktor Focus On",
        subtitulo: "Modo Avión Activado",
        descripcion: `¿Una notificación de Slack te acaba de sacar de "la zona"? ¿Sientes que pasas el día saltando de pestaña en pestaña sin cerrar ninguna task?
        El Ducktor Focus On es tu guardaespaldas personal contra la procrastinación. Programado para una sola cosa: proteger tu flujo de trabajo y ayudarte a entrar en ese estado de flow donde los bugs tiemblan.

        Ponlo de cara a la puerta o a tu compañero como señal de "No molestar". Su mirada decidida y sus anteojeras bloquean el ruido digital y te ayudan a conquistar esa tarea compleja. Te mira fijamente y piensa:`,
        frase: "Una línea de código a la vez. Lo demás no existe.",
        caracteristicas: [
            "Estado de concentración, bloqueando toda distracción.",
            "Luce una camiseta que advierte al exterior: 'Shhh... Compilando mis pensamientos'.",
            "Fabricado con 100% de determinación y cero notificaciones."],
        imagenGaleria: "../img/FocusOn.png",
        imagenFrontal: "../img/FocusOnFrontP.png" ,
        imagenLateral: "../img/FocusOnLatP.png" ,
        precio: 12.00,
        categoria: "Corporativo",
        stock: 2,
    },
    {
        id: "Meditacion",
        nombre: "Zen Ducktor",
        subtitulo: "La calma en un Mar de Bugs",
        descripcion: `¿La build acaba de romperse a las 5 PM de un viernes? ¿Ese merge conflict te tiene al borde del pánico y buscando culpables en el git blame?
        Zen Ducktor es tu oasis de calma en un mar de commits fallidos. Diseñado para bajar tus revoluciones y ayudarte a encontrar el "zen" en el código.

        Cuando sientas que la frustración sube, tómate 30 segundos para mirarlo. Su postura serena te invita a respirar hondo, soltar el ratón y recordar que nada es tan grave. Es la calma en la tormenta que susurra:`,
        frase: "Respira. Es solo un error de sintaxis, no el fin del mundo.",
        caracteristicas: [
            "Sentado en una serena postura de loto.",
            "Luce su túnica de meditación y un colgante con el símbolo Om.",
            "Fabricado con pura tranquilidad y bytes de serenidad."],
        imagenGaleria: "../img/Meditacion.png",
        imagenFrontal: "../img/MeditacionFrontP.png",
        imagenLateral: "../img/MeditacionLatP.png",
        precio: 12.00,
        categoria: "Corporativo",
        stock: 0,
    },
    {
        id: "Analitico",
        nombre: "Ducktor Analítico",
        subtitulo: "Detective de los Bugs más difíciles",
        descripcion: `¿Te enfrentas a un bug que parece imposible, uno que se esconde en las profundidades del legacy code? ¿No sabes por dónde empezar a debuggear?
        El Ducktor Analítico es tu Sherlock Holmes del software. Su especialidad no es la fuerza bruta, sino la lógica; descompone problemas complejos en partes manejables.

        Colócalo junto al teclado cuando necesites pensar con claridad. Su lupa te recuerda mirar de cerca y su gorra de detective te inspira a preguntar "por qué" cinco veces. Es el lógico implacable que te dice:`,
        frase: "Elemental, mi querido developer. El error está en la línea 42.",
        caracteristicas: [ 
            "Luce unas gafas para no perder el mínimo detalle.",
            "Sostiene una gran lupa, listo para inspeccionar el código.",
            "Fabricado con 90% de lógica pura y 10% de intuición."],
        imagenGaleria: "../img/PensamientoAnalitico.png",
        imagenFrontal: "../img/PensamientoAnaliticoFrontP.png" ,
        imagenLateral: "../img/PensamientoAnaliticoLatP.png" ,
        precio: 12.00,
        categoria: "Corporativo",
        stock: 12,
    },
    {
        id: "Relax",
        nombre: "Ducktor Relax",
        subtitulo: "Especialista para la Desconexión",
        descripcion: `¿Llevas tres horas seguidas mirando la misma pantalla? ¿Tu "sprint" se ha convertido en una maratón sin fin y te sientes culpable por tomarte un descanso?
        El Ducktor Relax ha llegado para recordarte la regla más importante: no se puede pushear código de calidad con la batería al 1%. Es el guardián de tu bienestar digital.

        Su única misión es recordarte que te levantes, estires las piernas y te tomes ese café. Míralo y verás que no hay prisa, que tu bienestar es lo primero. Es la voz relajada que te dice:`,
        frase: "¡Cierra el portátil! Ese commit puede esperar.",
        caracteristicas: [
            "Sumergido en su jacuzzi de madera personal, dejando que las burbujas disuelvan el estrés del sprint.",
            "Luce dos rodajas de pepino para un merecido detox visual de sprints y deadlines.",
            "Fabricado con 100% de autocuidados y 0% merge conflicts."],
        imagenGaleria: "../img/Relax.png",
        imagenFrontal: "../img/RelaxFrontP.png",
        imagenLateral: "../img/RelaxLatP.png",
        precio: 12.00,
        categoria: "Corporativo",
        stock: 8,
    },
    {
        id: "Fundacion",
        nombre: "Ducktor & Code Well",
        subtitulo: "Apoyando la mente detrás del código",
        descripcion: `Te presentamos a Ducktor Hope Este no es solo un patito; es un símbolo de apoyo y comunidad. Es nuestra edición especial diseñada para recordar que no estás solo en los momentos de estrés y bloqueo mental.

        Creemos en el bienestar de quienes crean el futuro digital. Por eso, el 100% de los beneficios de cada "Patito Esperanza" vendido se destina íntegramente a la Fundación.
        Se dedican al bienestar de las mentes detrás del código mediante la financiación de programas de salud mental y la lucha contra el burnout en el sector tecnológico.`,
        frase: "¡Apoya una Causa Importante!",
        caracteristicas: [
            "Viste la bata oficial de Duck-tor's.",
            "Lleva el lazo verde de la concienciación sobre la salud mental.",
            "Fabricado con 100% de empatía."],
        imagenGaleria: "../img/CodeWell.png",
        imagenFrontal: "../img/CodeWellFrontP.png",
        imagenLateral: "../img/CodeWellLatP.png",
        precio: 12.00,
        categoria: "Benefico",
        stock: 500,
    },
];

export { productos };