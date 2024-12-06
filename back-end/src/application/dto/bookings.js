import { z } from 'zod';

export const BookingDTO = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    dateTime: z.string().min(1),
    service: z.string().min(1),
}); 