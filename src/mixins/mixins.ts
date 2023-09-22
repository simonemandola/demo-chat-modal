/**
 * Format time
 * @param{string | number} time
 * @return{string} time formatted e.g.: '08:05'
 */
export function formatTimeHoursAndMinutes( time: string | number ): string {

    const date = new Date(time);
    const hours = date.getHours().toString().padStart( 2, "0" );
    const minutes = date.getMinutes().toString().padStart( 2, "0" );

    return `${ hours }:${ minutes }`;

}

/**
 * Format date
 * @param{string | number} date
 * @param{string} divider
 * @return{string} date formatted e.g.: '04/09/2023'
 */
export function formatDateDayMonthYear(date: string | number, divider: string = "/"): string {

    const fullDate = new Date(date);
    const day = fullDate.getDate().toString().padStart(2, "0");
    const month = fullDate.toLocaleString("default", {month: "short"});
    const year = fullDate.getFullYear();

    return `${ day }${ divider }${ month }${ divider }${ year }`;

}

/***
 *  Get file extension from file name
 * @param fileName
 * @return{string} return file extension e.g.: 'PDF'
 */
export function getAttachmentExtension(fileName: string): string {
    return fileName.split(".")[1].toUpperCase();
}

