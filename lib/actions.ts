'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Product } from './definitions';
import * as dao from '@/lib/dao'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    name?: string[];
    artist?: string[];
    price?: string[];
    format?: string[];
    imgUrl?: string[];
    descr?: string[];
    genre?: string[];
  };
  message?: string | null;
};

export async function sendProduct(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    id: '0',
    name: formData.get("name"),
    artist: formData.get("artist"),
    price: formData.get("price"),
    format: formData.get("format"),
    descr: formData.get("description"),
    imgUrl: formData.get("imgUrl"),
    genre: formData.get("genre"),
    state: formData.get("state"),
  });

  if (!validatedFields.success) {
    console.log("**")
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create product.',
    };
  }

  const product: Product = {
    product_id: 0,
    name: validatedFields.data.name,
    artist: validatedFields.data.artist,
    description: validatedFields.data.descr,
    format: validatedFields.data.format,
    genre: validatedFields.data.genre,
    image: validatedFields.data.imgUrl,
    price: validatedFields.data.price,
    state: validatedFields.data.state === 'on'
  }

  try {
    await dao.insertProduct(product);
  } catch (error) {
    console.error('Error inserting product:', error);
    return {
      message: 'failed',
    };
  }
  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin")


  return {
    errors: {},
    message: "success"
  }
}

export async function updateProduct(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    id: formData.get("product_id"),
    name: formData.get("name"),
    artist: formData.get("artist"),
    price: formData.get("price"),
    format: formData.get("format"),
    descr: formData.get("description"),
    imgUrl: formData.get("imgUrl"),
    genre: formData.get("genre"),
    state: formData.get("state"),
  });

  if (!validatedFields.success) {
    console.log("**")
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to edit product.',
    };
  }
  const id = validatedFields.data.id;
  const product: Product = {
    product_id: id,
    name: validatedFields.data.name,
    artist: validatedFields.data.artist,
    description: validatedFields.data.descr,
    format: validatedFields.data.format,
    genre: validatedFields.data.genre,
    image: validatedFields.data.imgUrl,
    price: validatedFields.data.price,
    state: validatedFields.data.state === 'on'
  }

  try {
    await dao.updateProduct(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      message: 'failed',
    };
  }
  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin")
  revalidatePath(`/product/${id}`)
  revalidatePath(`/admin/edit/${id}`)

  return {
    errors: {},
    message: "success"
  }
}


export async function deleteProduct(id: number) {
  console.log("delete");
  console.log(id);

  try {
    const result = await dao.deleteProduct(id);
    if (result) {
      revalidatePath("/")
      revalidatePath("/products")
      revalidatePath("/admin/productos")
      revalidatePath(`/product/${id}`)
      revalidatePath(`/admin/edit/${id}`)
      redirect("/admin/productos")
    }
    else {
      //mostrar error
      console.log("..")
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export async function deleteSale(id: number) {
  console.log("delete");
  console.log(id);

  try {
    const result = await dao.deleteSale(id);
    if (result) {
      revalidatePath("/")
      revalidatePath("/admin/pedidos")
      revalidatePath(`/admin/pedidos/${id}`)
      redirect("/admin/pedidos")
    }
    else {
      //mostrar error
      console.log("..")
    }
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
}
const FormSchema = z.object({
  id: z.string()
    .transform(val => parseInt(val)), // to number
  name: z.string()
    .min(1, { message: "Ingrese el nombre del álbum" })
    .max(100, { message: "El nombre del álbum no debe superar los 100 caracteres" }),
  artist: z.string()
    .min(1, { message: "Ingrese el nombre del artista" })
    .max(100, { message: "El nombre del artista no debe superar los 100 caracteres" }),
  price: z.string()
    .regex(/^[0-9]{1,8}([.,][0-9]{1,2})?$/, { message: 'Ingrese un monto válido' })
    .transform(val => parseFloat(val.replace(',', '.'))) // to number
    .refine(val => val > 0, { message: 'Ingrese un monto mayor a 0' }),
  format: z.string({
    invalid_type_error: 'Por favor elija un formato.',
  }),
  imgUrl: z.string()
    .url({ message: "Ingrese una URL válida" })
    .refine(url => url.startsWith("https://res.cloudinary.com"), {
      message: "ingrese una URL de Cloudinary",
    }),
  descr: z.string().max(255, { message: "Ha superado el limite de caracteres para la descripcion del producto" }),
  state: z.string().nullable(),
  genre: z.string({
    invalid_type_error: 'Por favor elija un género.',
  }),
});