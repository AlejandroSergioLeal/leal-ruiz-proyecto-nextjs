import MaxWidthWrapper from "./MaxWidthWrapper";

const ArtistSection = () => {
    const artists = [
      { name: "Nirvana", image: "/nirvana_artist_section.png", link: "/products" },
      { name: "Red Hot Chilli Peppers", image: "/rhcp_artist_section.png", link: "/products" },
      { name: "Nirvana", image: "/nirvana_artist_section.png", link: "/products" },
      { name: "Nirvana", image: "/nirvana_artist_section.png", link: "/products" },
      { name: "Nirvana", image: "/nirvana_artist_section.png", link: "/products" },
      { name: "Nirvana", image: "/nirvana_artist_section.png", link: "/products" }
    ];
  
    return (
      <section className="md:py-12 py-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="py-2 md:py-10 lg:py-10 mt-5">
            <h1 className="text-center text-lg text-black mb-4">Tus preferidos</h1>
            <h2 className="text-center text-4xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl">Encontrá tus artistas favoritos</h2>
            <div className="max-w-6xl px-4 sm:px-1 lg:px-1">
              <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 ">
                {artists.map((artist, index) => (
                  <div key={index}>
                    <a href={artist.link}>
                      <img
                        alt={artist.name}
                        loading="lazy"
                        width="416"
                        height="416"
                        src={artist.image}
                        decoding="async"
                        style={{ color: "transparent" }}
                        className="cursor-pointer object-cover w-full h-full"
                      />
                      <h1 className="text-s text-center lg:text-m text-black pb-10">{artist.name}</h1>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ArtistSection;
  