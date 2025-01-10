import { z } from 'zod'
import { insertProductSquema } from '@/lib/validators';

export type Product = z.infer<typeof insertProductSquema> &  {
    id: string;
    rating: string;
    createdAt: Date;

}