'use client'
import { updateProduct } from "@/lib/actions";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/definitions";
import SuccessAlert from "../../SuccessAlert";
import ErrorAlert from "../../ErrorAlert";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        pending ? (
            <button className="btn btn-warning m-2 animate-none" disabled>
                Procesando...
            </button>
        ) : (
            <button type="submit" className="btn btn-warning m-2 animate-none" >
                Guardar Cambios
            </button>
        )

    )
}
function CancelButton() {
    const { pending } = useFormStatus();
    return (
        pending ? (<div className="btn btn-neutral m-2 animate-none">...</div>) : (
            <Link href="/admin" className="btn btn-neutral m-2 animate-none">
                Cancelar
            </Link >
        )
    )
}

export default function ProductEditForm({ product }: { product: Product }) {
    const initialState = { errors: {}, message: null };
    const [state, dispatch] = useFormState(updateProduct, initialState);
    const DEFAULT_IMG: string = "/default_image.png";
    const [imageUrl, setImageUrl] = useState(product.image)

    function handleImgPreview(event: ChangeEvent<HTMLInputElement>) {
        const newUrl = event?.target.value;
        if (newUrl.startsWith('https://res.cloudinary.com')) {
            setImageUrl(newUrl);
        }
        else
            setImageUrl(DEFAULT_IMG)
    }

    return (
        <div>
            <form action={dispatch}>
                <div className="flex flex-col items-center min-h-screen mb-10 sm:flex-row">
                    <div className="flex flex-col sm:mr-4">
                        {/*album: */}
                        <div>
                            <label className="mb-2">
                                Nombre del álbum:
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={product.name}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg"
                                aria-describedby="name-error"
                            />
                            <div id="name-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.name &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.name?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        {/*artista: */}
                        <div>
                            <label className="mb-2">
                                Artista:
                            </label>
                            <input
                                id="artist"
                                name="artist"
                                type="text"
                                defaultValue={product.artist}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg"
                                aria-describedby="artist-error"
                            />
                            <div id="artist-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.artist &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.artist?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        {/*precio: */}
                        <div>
                            <label className="mb-2">
                                Precio:
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                defaultValue={product.price}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg"
                                aria-describedby="price-error"
                            />
                            <div id="price-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.price &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.price?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        {/*formato: */}
                        <div>
                            <label className="mb-2">
                                Formato:
                            </label>
                            <select className="select select-bordered select-sm w-full min-w-lg max-w-lg"
                                id="format"
                                name="format"
                                defaultValue={product.format}
                                aria-describedby="format-error"
                            >
                                <option value="" disabled>Seleccione un formato</option>
                                <option>Single</option>
                                <option>LP</option>
                                <option>EP</option>
                                <option>Double-LP</option>
                            </select>
                            <div id="format-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.format &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.format?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        {/*genero: */}
                        <div className="flex flex-col">
                            <label className="mb-2">
                                Género:
                            </label>
                            <select className="select select-bordered select-sm w-full min-w-lg max-w-lg"
                                id="genre"
                                name="genre"
                                defaultValue={product.genre}
                                aria-describedby="genre-error"
                            >
                                <option value="" disabled>Seleccione un género</option>
                                <option>Rock</option>
                                <option>Pop</option>
                                <option>Hip-Hop</option>
                                <option>Indie</option>
                                <option>Otros</option>
                            </select>
                            <div id="genre-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.genre &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.genre?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        {/*descripcion: */}
                        <div className="flex flex-col">
                            <label className="mb-2 mt-2">
                                Descripción breve:
                            </label>
                            <textarea
                                id="descrption"
                                name="description"
                                defaultValue={product.description}
                                className="textarea textarea-bordered textarea-lg text-md min-w-lg max-w-lg resize-none"
                                rows={4}
                                placeholder={`Máximo 255 caracteres.`}
                                aria-describedby="description-error"
                            ></textarea>
                            <div id="description-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.descr &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.descr?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:ml-4">
                        {/* imagen */}
                        <Image
                            className="w-full h-auto max-w-[300px] max-h-[300px] object-cover mb-5 rounded-md"
                            src={imageUrl}
                            alt="Imagen de Producto"
                            height={300}
                            width={300}
                            onError={() => setImageUrl(DEFAULT_IMG)}
                        />
                        {/* Url de la imagen: */}
                        <div>
                            <label className="mb-2">
                                URL de imagen:
                            </label>
                            <input
                                id="imgUrl"
                                name="imgUrl"
                                type="text"
                                defaultValue={product.image}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg"
                                aria-describedby="imageurl-error"
                                onChange={handleImgPreview}
                            />
                            <div id="imageurl-error" aria-live="polite" aria-atomic="true" className="mb-2">
                                {state.errors?.imgUrl &&
                                    <p className="text-sm text-red-500">
                                        {state.errors?.imgUrl?.[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        {/* checkbox habilitar producto: */}
                        <div className="form-control">
                            <label className="label cursor-pointer flex items-center justify-start">
                                <input
                                    id="state"
                                    type="checkbox"
                                    defaultChecked
                                    name="state"
                                    className="checkbox mr-2" />
                                <span className="label-text">Habilitado para la compra</span>
                            </label>
                        </div>
                        {/* botones */}
                        <div className="flex flex-col w-full">
                            <SubmitButton />
                            <CancelButton />
                        </div>
                    </div>
                </div>
                <input
                    type="hidden"
                    id = "product_id"
                    name="product_id"
                    value={product.product_id}
                />
            </form>
            {state.message === "success" && (<SuccessAlert title={"Éxito!"} desc={"Los cambios se guardaron exitosamente."} />)}
            {state.message === "failed" && (<ErrorAlert title={"Algo falló"} desc={"Ocurrio un error guardando el producto, por favor reintentelo mas tarde."} />)}
        </div>
    )
}
