export default function convertHourToMinutes(time: string){
    const [hour, minutes] = time.split(':').map(Number); // Vai pegar a hora em string no formato (ex: 8:20). Daí ele vai separar a partir do ":", tendo dois valores: 8 e 20. Então ele vai percorrer os dois (através do map), convertendo-os para Number
    const timeInMinutes = (hour * 60) + minutes; // Converte a hora em minutos e soma com os minutos restantes

    return timeInMinutes;
}