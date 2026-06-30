import { z } from 'zod';

export const cities = [
  'Ouagadougou',
  'Bobo-Dioulasso',
  'Koudougou',
  'Banfora',
  'Ouahigouya',
] as const;

export const recordSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  ciudad: z.string().min(1, 'Seleccione una ciudad'),
  edad: z.number()
    .min(0, 'La edad mínima es 0')
    .max(120, 'La edad máxima es 120'),
});

export type RecordFormData = z.infer<typeof recordSchema>;

export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
