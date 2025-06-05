import { z } from 'zod';//importamos la libreria zod para validar los datos

 const UserSchema = z.object({//validacion de datos
  name   : z.string().min(2).optional(), //nombre obligatorio
    email  : z.string().email().min(2, { message: "Invalid email" }), //email obligatorio y con formato de email
    password: z.string().min(6, { message: "Invalid password" }), //contraseña obligatoria
    })

export function validateUser(obj) {
    return UserSchema.safeParse(obj);
}
export function optionalUser(obj) {//con el partial hacemos que todos los campos sean opcionales
    return UserSchema.partial().safeParse(obj);
}
