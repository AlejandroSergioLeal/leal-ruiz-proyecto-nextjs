
import MaxWidthWrapper from '@/app/ui/MaxWidthWrapper';
import * as dao from '@/lib/dao';
import Image from 'next/image';
import { getAlbumInfo } from '@/lastfm';
import CartButton from '@/app/ui/ButtonCart';
import { notFound } from 'next/navigation';

interface Track {
  name: string;
  duration: string;
}

export default async function ProductPage({ params }: { params: { productId: number } }) {
  const pId = params.productId;
  const producto = await dao.getProductById(pId);

  if(!producto){
    notFound();
  }

  let tracklist : string[] = [];
  let albumInfo;
  try{
    albumInfo = await getAlbumInfo(producto.artist, producto.name);
  }
  catch(error){
    albumInfo = null;
  }
  if (albumInfo?.album?.tracks?.track) {
    albumInfo.album.tracks.track.forEach((track: Track) => {
      tracklist.push(track.name);
    });
  }

  return (
    <MaxWidthWrapper>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 bg-gray-100 dark:bg-gray-800 shadow-lg mt-5 mb-5">
        <div className="flex justify-center items-center">
          <div className="flex flex-col relative w-full max-w-xs md:max-w-none md:w-[500px] md:h-[500px]">
            <Image
              src={producto.image}
              height={500}
              width={500}
              alt="Product Image"
              priority 
              className="rounded-lg object-cover w-full h-auto"
            />
            <p>{producto.description}</p>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-4xl font-bold text-black dark:text-white">{producto.name}</h1>
            <p className="text-gray-800 dark:text-gray-400 font-bold mb-3">{producto.artist}</p>
            <h2 className="text-2xl text-gray-800 dark:text-gray-200">${producto.price}</h2>
          </div>
          <div className="grid gap-2 mt-4">
            <CartButton product={producto}></CartButton>
          </div>
          <div className="grid gap-2 mt-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Género:</h3>
            <p className="text-gray-600 dark:text-gray-400">{producto.genre}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Formato:</h3>
            <p className="text-gray-600 dark:text-gray-400">{producto.format}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Tracklist:</h3>
            {tracklist.length > 0 ? (
              <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400">
                {tracklist.map((track, index) => (
                  <li key={index}>{track}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No tracklist available</p>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
