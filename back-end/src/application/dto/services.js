import { z } from 'zod';

export const ServiceDTO = z.object({
    name: z.string().min(1),
}); 