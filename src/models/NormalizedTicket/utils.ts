import { NormalizedTicket, NormalizedSegment } from "./index";
import { Ticket, Segment } from '../Tickets';

/** Нормализация массива билетов */
export const normalize = (tickets: Ticket[]): NormalizedTicket[] => tickets.map(ticket => ({
    price: [ticket.price, `${ticket.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} P`],
    carrier: ticket.carrier,
    segments: [normalizeSegment(ticket.segments[0]), normalizeSegment(ticket.segments[1])],
}));

/** Нормализация сегмента билета */
export const normalizeSegment = (segment: Segment): NormalizedSegment => ({
    direction: [`${segment.origin} - ${segment.destination}`, getTimeDestination(segment.date, segment.duration)],
    duration: [segment.duration, 'В пути', getTimeDuration(segment.duration)],
    stops: [segment.stops.length, getStopsLabel(segment.stops), segment.stops.join(', ')],
}) as NormalizedSegment;

/** Получение надписи по количеству пересадок */
const getStopsLabel = (stops: string[]): string => {
    const len = stops.length;
    if (len === 0) return 'Без пересадок';
    return declOfNum(len, ['пересадка', 'пересадки', 'пересадок']);
};

/** Получение надписи в зависимости от количества */
export const declOfNum = (n: number, titles: string[]): string => `${n} ${titles[
    (n % 10 === 1 && n % 100 !== 11)
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
]}`;

/** Получение времени в пути */
const getTimeDuration = (minutes: number): string => {
    const days = Math.floor(minutes / (60 * 12));
    const hours = Math.floor(minutes / 60);
    const lastMinutes = minutes % 60;
    const result = [];

    if (days) result.push(`${days}д`);
    if (hours) result.push(`${hours}ч`);
    if (lastMinutes) result.push(`${lastMinutes}м`);

    return result.join(' ');
};

/** Получение времени отправления-прибытия */
const getTimeDestination = (dateString: string, minutes: number): string => {
    const date = new Date(dateString);
    const newDate = new Date(date.getTime() + minutes * 60000);

    return `${getDateTime(date)} - ${getDateTime(newDate)}`;
};

/** Получение текстового представления времени HH:MM */
const getDateTime = (date: Date): string => {
    const dateHour = `${date.getHours()}`.padStart(2, '0');
    const dateMinutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${dateHour}:${dateMinutes}`;
};
