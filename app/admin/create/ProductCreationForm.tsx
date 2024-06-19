import { redirectToAdmin, sendProduct } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import SuccessAlert from "../SuccessAlert";
import ErrorAlert from "../ErrorAlert";

export default function ProductCreationForm() {
    const descrCharLimit = 255;
    const charLimit = 120;
    const DEFAULT_IMG: string = "/default_image.png";
    const [imageUrl, setImageUrl] = useState(DEFAULT_IMG)
    const [imageLabel, setImageLabel] = useState("");
    const [buttonBlock, setButtonBlock] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    
    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        if (newUrl.startsWith('https://res.cloudinary.com')) {
            setImageUrl(newUrl);
            setImageLabel("");
        }
        else
            handleImgError();
    };

    const createProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageUrl == DEFAULT_IMG) {
            setImageLabel("Ingrese un link válido de Cloudinary")
            return
        }
        setButtonBlock(true)
        const formData = new FormData(event.currentTarget);
        try {
            await sendProduct(formData);
            setSuccess(true);
        }
        catch (error) {
            setFailed(true);
        }
    }
    const handleCancel = () => {
        redirectToAdmin()
    }

    function handleImgError(): void {
        setImageUrl(DEFAULT_IMG);
    }

    return (
        <div>
            <form onSubmit={createProduct} >
                <div className="flex flex-col items-center min-h-screen mb-10 sm:flex-row">
                    <div className="flex flex-col sm:mr-4">
                        {/*album: */}
                        <div>
                            <label className="mb-2">
                                Nombre del álbum:
                            </label>
                            <input
                                name="name"
                                type="text"
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
                                rows={4}
                                placeholder={`Máximo ${descrCharLimit} caracteres.`}
                                maxLength={descrCharLimit}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:ml-4">
                        {/* imagen */}
                        <Image
                            className="w-full h-auto max-w-[300px] max-h-[300px] object-cover mb-5 rounded-md"
                            src={imageUrl}
                            onError={handleImgError}
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
                                onChange={handleImage}
                                className="input input-bordered input-sm w-full min-w-lg max-w-lg mb-2"
                                required
                            />
                        </div>
                        <label className="text-red-500 text-sm mt-1">
                            {imageLabel}
                        </label>
                        {/* checkbox habilitar producto: */}
                        <div className="form-control">
                            <label className="label cursor-pointer flex items-center justify-start">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    name="habilitador"
                                    className="checkbox mr-2" />
                                <span className="label-text">Habilitado para la compra</span>
                            </label>
                        </div>
                        {/* botones */}
                        <div className="flex flex-col w-full">
                            <button type="submit"
                                className="btn btn-accent m-2"
                                disabled={buttonBlock}
                            >
                                {!buttonBlock ? "Crear Producto" : "Procesando.."}

                            </button>
                            <button type="button"
                                className="btn btn-neutral m-2"
                                disabled={buttonBlock}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {success ? (
                <SuccessAlert title={"Éxito"} desc={"El producto fue creado exitosamente."} />
            ) : failed ? (
                <ErrorAlert title={"Algo falló"} desc={"El producto no fue creado."} />
            ) : (
                <div></div>
            )}
        </div>
    )
}