'use client'
import { redirectToAdmin, updateProduct } from "@/lib/actions";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/definitions";
import SuccessAlert from "../../SuccessAlert";
import ErrorAlert from "../../ErrorAlert";

export default function ProductEditForm({ product }: { product: Product }) {
    const descrCharLimit = 255;
    const charLimit = 120;
    const [buttonBlock, setButtonBlock] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)

    const [imageUrl, setImageUrl] = useState(product.image)
    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        setImageUrl(newUrl);
    };

    const [isChecked, setIsChecked] = useState(product.state)
    const handleState = () => {
        setIsChecked(!isChecked)
    }

    const sendUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setButtonBlock(true)
        const formData = new FormData(event.currentTarget);
        try {
            await updateProduct.bind(null, product.product_id, formData)();
            setSuccess(true)
        }
        catch (error) {
            setFailed(true)
        }
    }
    const handleCancel = () => {
        redirectToAdmin()
    }

    return (
        <div>
            <form onSubmit={sendUpdate}>
                <div className="flex flex-col items-center min-h-screen mb-10 sm:flex-row">
                    <div className="flex flex-col sm:mr-4">
                        {/*id*/}
                        <input className="hidden"
                            name="prod_id"
                            type="text"
                            value={product.product_id}
                            readOnly
                        />
                        {/*album: */}
                        <div>
                            <label className="mb-2">
                                Nombre del álbum:
                            </label>
                            <input
                                name="name"
                                type="text"
                                defaultValue={product.name}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg mb-2"
                                required maxLength={charLimit}
                            />
                        </div>
                        {/*artista: */}
                        <div>
                            <label className="mb-2">
                                Artista:
                            </label>
                            <input
                                name="artist"
                                type="text"
                                defaultValue={product.artist}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg mb-2"
                                required maxLength={charLimit}
                            />
                        </div>
                        {/*precio: */}
                        <div>
                            <label className="mb-2">
                                Precio:
                            </label>
                            <input
                                name="price"
                                type="text"
                                defaultValue={product.price}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg mb-2"
                                min={1} required
                                pattern="^[0-9]{1,8}([.,][0-9]{1,2})?$"
                                title="Ingrese un precio válido"
                            />
                        </div>
                        {/*formato: */}
                        <div>
                            <label className="mb-2">
                                Formato:
                            </label>
                            <input
                                name="format"
                                type="text"
                                defaultValue={product.format}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg mb-2"
                                required maxLength={charLimit}
                            />
                        </div>
                        {/*genero: */}
                        <div className="flex flex-col">
                            <label className="mb-2">
                                Género:
                            </label>
                            <select className="select select-bordered select-sm w-full min-w-lg max-w-lg mb-2" required
                                name="genre">
                                <option>Rock</option>
                                <option>Pop</option>
                                <option>Hip-Hop</option>
                            </select>
                        </div>
                        {/*descripcion: */}
                        <div className="flex flex-col">
                            <label className="mb-2 mt-2">
                                Descripción breve:
                            </label>
                            <textarea
                                name="description"
                                className="textarea textarea-bordered textarea-lg text-md min-w-lg max-w-lg mb-2 resize-none"
                                defaultValue={product.description}
                                rows={4}
                                placeholder={`Máximo ${descrCharLimit} caracteres.`}
                                maxLength={descrCharLimit}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:ml-4">
                        <Image
                            className="w-full h-auto max-w-[300px] max-h-[300px] object-cover mb-5 rounded-md"
                            src={imageUrl}
                            alt="Imagen de Producto"
                            height={300}
                            width={300}
                        />
                        {/* Url de la imagen: */}
                        <div>
                            <label className="mb-2">
                                URL de imagen:
                            </label>
                            <input
                                name="imgUrl"
                                type="text"
                                defaultValue={product.image}
                                onChange={handleImage}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg mb-2"
                                required
                            />
                        </div>
                        {/* checkbox habilitar producto: */}
                        <div className="form-control">
                            <label className="label cursor-pointer flex items-center justify-start">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleState}
                                    name="habilitador"
                                    className="checkbox mr-2" />
                                <span className="label-text">Habilitado para la compra</span>
                            </label>
                        </div>
                        {/* botones */}
                        <div className="flex flex-col w-full">
                            <button type="submit" 
                                    className="btn btn-warning m-2" 
                                    disabled={buttonBlock}
                            >
                                {!buttonBlock ? "Guardar Cambios" : "Procesando.."}
                            </button>
                            <button type="button" 
                                    className="btn btn-neutral m-2" 
                                    disabled={buttonBlock}
                                    onClick = {handleCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {success ? (
                <SuccessAlert title={"Éxito"} desc={"Los cambios se guardaron correctamente."} />
            ) : failed ? (
                <ErrorAlert title={"Algo falló"} desc={"Los cambios no fueron guardados."} />
            ) : (
                <div></div>
            )}
        </div>

    )
}