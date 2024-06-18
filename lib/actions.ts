'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Product } from './definitions';
import * as dao from '@/lib/dao'
import {delay} from '@/lib/utils'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import exp from 'constants';

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

export async function redirectToAdmin(){
  redirect("/admin")
}
export async function sendProduct(formData: FormData) {

  // Recupera el valor de cada campo del formulario
  const nameValue = formData.get("name")?.toString() ?? "";
  const artistValue = formData.get("artist")?.toString() ?? "";
  const priceValue = formData.get("price")?.toString().replace(',', '.') ?? "";
  const formatValue = formData.get("format")?.toString() ?? "";
  const descriptionValue = formData.get("description")?.toString() ?? "";
  const imgUrlValue = formData.get("imgUrl")?.toString() ?? "";
  const genreValue = formData.get("genre")?.toString() ?? "";
  const habilitado = formData.get("habilitador") === "on"

  const product: Product = {
    product_id: 0,
    name: nameValue,
    artist: artistValue,
    description: descriptionValue,
    format: formatValue,
    genre: genreValue,
    image: imgUrlValue,
    price: parseFloat(priceValue),
    state: habilitado
  }

  try {
    const result = await dao.insertProduct(product);
    if (result != null) {
      revalidatePath("/")
      revalidatePath("/products")
      revalidatePath("/admin")
    }
    return result;

  } catch (error) {
    console.error('Error inserting product:', error);
    throw error;
  }
}

export async function updateProduct(id: number, formData: FormData) {

  // Recupera el valor de cada campo del formulario
  const nameValue = formData.get("name")?.toString() ?? "";
  const artistValue = formData.get("artist")?.toString() ?? "";
  const priceValue = formData.get("price")?.toString().replace(',', '.') ?? "";
  const formatValue = formData.get("format")?.toString() ?? "";
  const descriptionValue = formData.get("description")?.toString() ?? "";
  const imgUrlValue = formData.get("imgUrl")?.toString() ?? "";
  const genreValue = formData.get("genre")?.toString() ?? "";
  const habilitado = formData.get("habilitador") === "on"

  const product: Product = {
    product_id: id,
    name: nameValue,
    artist: artistValue,
    description: descriptionValue,
    format: formatValue,
    genre: genreValue,
    image: imgUrlValue,
    price: parseFloat(priceValue),
    state: habilitado
  }
  console.log(product)
  try {
    const result = await dao.updateProduct(product);
    if(result){
      revalidatePath("/")
      revalidatePath("/products")
      revalidatePath("/admin")
      revalidatePath(`/product/${id}`)
      revalidatePath(`/admin/edit/${id}`)
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}


export async function deleteProduct(id: number){
  console.log("delete");
  console.log(id);

  try {
    const result = await dao.deleteProduct(id);
    if(result){
      revalidatePath("/")
      revalidatePath("/products")
      revalidatePath("/admin")
      revalidatePath(`/product/${id}`)
      revalidatePath(`/admin/edit/${id}`)
      redirect("/admin")
    }
    else{
      //mostrar error
      console.log("..")
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}