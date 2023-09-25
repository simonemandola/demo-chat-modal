export interface MessageInterface {
    attachment?: {
        name?: string;
        extension?: string;
        size?: number;
        url?: string;
        version?: number;
    };
    date: Date;
    isStudent: boolean;
    body: string;
}

// Let's assume that this data has been obtained from the database.
export const studentAvatarUrl = "src/assets/img/student-avatar.jpg";
export const tutorAvatarUrl = "src/assets/img/tutor-avatar.jpg";
export const attachmentUrl = "src/assets/Titulo del archivo a subir 2.pdf";

export const preloadedMessageList = <MessageInterface[]>[
    {
        attachment: {
            name: "Titulo del archivo a subir 2.pdf",
            extension: "PDF",
            size: 2300000,
            url: attachmentUrl,
            version: 1,
        },
        date: new Date(new Date().setTime(new Date() - 23 * 60 * 1000)) , // substract 23 minutes
        isStudent: true,
        body: "",
    },
    {
        attachment: {},
        date: new Date(new Date().setTime(new Date() - 20 * 60 * 1000)), // substract 20 minutes
        isStudent: true,
        body: "Buenas tardes, acabo de subir el primer archivo con el primer caso práctico, espero revisión",
    },
    {
        attachment: {},
        date: new Date(new Date().setTime(new Date() - 18 * 60 * 1000)), // substract 18 minutes
        isStudent: false,
        body: "¡Gran trabajo Silvia! Pero creo que deberías revisar el punto 3. Intenta añadir un poco más de contexto y un apartado final de conclusiones personales.",
    },
    {
        attachment: {
            name: "Titulo del archivo a subir 2.pdf",
            extension: "PDF",
            size: 4300000,
            url: attachmentUrl,
            version: 2,
        },
        date: new Date(new Date().setTime(new Date() - 14 * 60 * 1000)), // substract 14 minutes
        isStudent: true,
        body: "",
    },
    {
        attachment: {},
        date: new Date(new Date().setTime(new Date() - 6 * 60 * 1000)), // substract 6 minutes
        isStudent: true,
        body: "Realizados los cambios según feedback.",
    },
    {
        attachment: {},
        date: new Date(new Date().setTime(new Date() - 4 * 60 * 1000)), // substract 4 minutes
        isStudent: false,
        body: "Perfecto, excelente trabajo.",
    },
];
