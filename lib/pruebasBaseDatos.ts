import * as dao from "./productDAO";
import { Product, createProduct } from "./definitions";
const default_list = require("@/scripts/defaultProducts");

export async function enBd() {
  //Esto es para probar cosas en la base de datos, despues hay que sacarlo
  //se llama en la pagina de Home
  let permiso = false;
  if(!permiso)
    return ;

  console.log("--------------------------")
  console.log("corriendo pruebasBaseDatos")
  console.log("--------------------------")

  //pruebo insertar productos mas recientes:
  let p1: Product = createProduct("French Exit", "TV Girl", "/tv-girl.jpg",24.99, true,"","Indie Pop","LP","2024-01-02",0)
  let p2: Product = createProduct("The Slow Rush Colored Vinyl 2 Lps", "Tame Impala", "/tame-impala.jpg",24.99, true,"","Indie","LP","2024-01-02",0)
  let p3: Product = createProduct("Currents", "Tame Impala", "/tame-impala-currents.jpg", 29.99, true, "", "Psychedelic Rock", "LP", "2024-01-02", 0);
  let p4: Product = createProduct("Salad Days", "Mac DeMarco", "/salad-days.jpg", 19.99, true, "", "Indie Rock", "LP", "2024-01-02", 0);
  let p5: Product = createProduct("This Old Dog", "Mac DeMarco", "/this-old-dog.jpg", 21.99, true, "", "Indie Rock", "LP", "2024-01-02", 0);

  var p : Product;
  p = await dao.insertProduct(p1);
  console.log(p.name)
  p = await dao.insertProduct(p2);
  console.log(p.name)
  p = await dao.insertProduct(p3);
  console.log(p.name)
  p = await dao.insertProduct(p4);
  console.log(p.name)
  p = await dao.insertProduct(p5);
  console.log(p.name)
  

  /*
  var i;
  productos_de_ejemplo.map(
    async (p) =>
    (
      i = await dao.insertProduct(p)
    )
  )
  console.log("borrando")
  const c = await dao.borrarDuplicados();
  console.log("borrados")
  
  const all : Product[]= await dao.getAllProducts()
  all.map((p) => console.log(p.name))*/

}
//sacados de home:
const productos_de_ejemplo: Product[]= [{
  product_id: 7,
  name: 'Live at BBC Special Edition',
  artist: 'Pink Floyd',
  price: 22.99,
  image: '/pink_floyd_1.png',
  state: true,
  description: 'Special edition live recordings from Pink Floyd.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '1970-12-20',
  sold: 0
}, {
  product_id: 8,
  name: 'Nevermind Deluxe Edition',
  artist: 'Nirvana',
  price: 20.99,
  image: '/nirvana_1.png',
  state: true,
  description: 'Deluxe edition of Nirvana’s Nevermind.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '1991-09-24',
  sold: 0
}, {
  product_id: 9,
  name: 'Appetite for Destruction',
  artist: 'Guns N’ Roses',
  price: 24.99,
  image: '/guns_1.png',
  state: true,
  description: 'Classic debut album from Guns N’ Roses.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '1987-07-21',
  sold: 0
}, {
  product_id: 10,
  name: 'Live at Racket, NYC: Limited',
  artist: 'The Rolling Stones',
  price: 23.99,
  image: '/Rstones-1.png',
  state: true,
  description: 'Limited edition live performance from The Rolling Stones.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '1969-11-10',
  sold: 0
},{
  product_id: 1,
  name: 'Gangsta 7" Vinyl',
  artist: 'Free Nationals',
  price: 22.99,
  image: '/free_1.png',
  state: true,
  description: 'Limited edition 7" vinyl featuring exclusive tracks.',
  genre: 'Hip Hop',
  format: 'Vinyl',
  release_date: '2022-05-20',
  sold: 0
}, {
  product_id: 2,
  name: 'FAMILY LP',
  artist: 'DJ Scheme',
  price: 20.99,
  image: '/Scheme_1.png',
  state: true,
  description: 'Debut LP from DJ Scheme with guest features.',
  genre: 'Hip Hop',
  format: 'Vinyl',
  release_date: '2021-10-15',
  sold: 0
}, {
  product_id: 3,
  name: 'Wont He Do It Vinyl (Bone)',
  artist: 'Conway the Machine',
  price: 24.99,
  image: '/ConwaytheMachine_1.png',
  state: true,
  description: 'Special edition bone-colored vinyl from Conway the Machine.',
  genre: 'Hip Hop',
  format: 'Vinyl',
  release_date: '2023-03-17',
  sold: 0
}, {
  product_id: 4,
  name: 'Glockoma 2 Vinyl (Deluxe)',
  artist: 'Key Glock',
  price: 23.99,
  image: '/Key_1.png',
  state: true,
  description: 'Deluxe edition of Glockoma 2 with bonus tracks.',
  genre: 'Hip Hop',
  format: 'Vinyl',
  release_date: '2022-11-11',
  sold: 0
}, {
  product_id: 5,
  name: 'You Only Live 2wice Vinyl',
  artist: 'Freddie Gibbs',
  price: 23.99,
  image: '/FreddieGibbs_1.png',
  state: true,
  description: 'Freddie Gibbs’ second studio album on vinyl.',
  genre: 'Hip Hop',
  format: 'Vinyl',
  release_date: '2021-06-25',
  sold: 0
}, {
  product_id: 6,
  name: 'U Wasnt There',
  artist: 'Camron & A-Trak',
  price: 23.99,
  image: '/Camron_1.png',
  state: true,
  description: 'Collaboration album between Camron & A-Trak.',
  genre: 'Hip Hop',
  format: 'Vinyl',
  release_date: '2022-04-09',
  sold: 0
},
//los primeros que pusimos en /products:
{
  product_id: 0,
  name: "Gangsta 7\" Vinyl",
  artist: "Free Nationals",
  image: "/free_1.png",
  price: 22.99,
  state: true,
  description: "A 7-inch vinyl by Free Nationals.",
  genre: "none",
  format: "Single",
  release_date: "2023-01-01",
  sold: 0
},
{
  product_id: 0,
  name: "FAMILY LP",
  artist: "DJ Scheme",
  image: "/Scheme_1.png",
  price: 20.99,
  state: true,
  description: "An LP by DJ Scheme.",
  genre: "none",
  format: "LP",
  release_date: "2023-01-01",
  sold: 0
},
{
  product_id: 0,
  name: "Glockoma 2 Vinyl (Deluxe)",
  artist: "Key Glock",
  image: "/Key_1.png",
  price: 23.99,
  state: true,
  description: "Deluxe vinyl by Key Glock.",
  genre: "none",
  format: "LP",
  release_date: "2023-01-01",
  sold: 0
},
{
  product_id: 0,
  name: "You Only Live 2wice Vinyl",
  artist: "Freddie Gibbs",
  image: "/FreddieGibbs_1.png",
  price: 23.99,
  state: true,
  description: "A vinyl by Freddie Gibbs.",
  genre: "none",
  format: "LP",
  release_date: "2023-01-01",
  sold: 0
},
{
  product_id: 0,
  name: "U Wasnt There",
  artist: "Camron & A-Trak",
  image: "/Camron_1.png",
  price: 23.99,
  state: true,
  description: "A vinyl by Camron & A-Trak.",
  genre: "none",
  format: "LP",
  release_date: "2023-01-01",
  sold: 0
},{ //otros generados:
  product_id: 17,
  name: 'Graceland',
  artist: 'Paul Simon',
  price: 22.99,
  image: '/paul_simon_graceland.png',
  state: true,
  description: 'Paul Simon\'s iconic solo album.',
  genre: 'Worldbeat',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 18,
  name: 'Hysteria',
  artist: 'Def Leppard',
  price: 23.99,
  image: '/def_leppard_hysteria.png',
  state: true,
  description: 'A defining album of 80s rock.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 19,
  name: 'Brothers in Arms',
  artist: 'Dire Straits',
  price: 22.99,
  image: '/dire_straits_brothers_in_arms.png',
  state: true,
  description: 'A landmark album of the 80s.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 20,
  name: 'Sports',
  artist: 'Huey Lewis and the News',
  price: 21.99,
  image: '/huey_lewis_sports.png',
  state: true,
  description: 'One of the best-selling albums of the 80s.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 21,
  name: 'Private Dancer',
  artist: 'Tina Turner',
  price: 22.99,
  image: '/tina_turner_private_dancer.png',
  state: true,
  description: 'Tina Turner\'s comeback album.',
  genre: 'Pop',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 22,
  name: 'Can\'t Slow Down',
  artist: 'Lionel Richie',
  price: 20.99,
  image: '/lionel_richie_cant_slow_down.png',
  state: true,
  description: 'Lionel Richie\'s second solo studio album.',
  genre: 'Pop',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 23,
  name: 'Rio',
  artist: 'Duran Duran',
  price: 21.99,
  image: '/duran_duran_rio.png',
  state: true,
  description: 'One of the most iconic albums of the 80s.',
  genre: 'New Wave',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 24,
  name: '90125',
  artist: 'Yes',
  price: 22.99,
  image: '/yes_90125.png',
  state: true,
  description: 'The album that brought Yes to the mainstream.',
  genre: 'Progressive Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 25,
  name: 'Scary Monsters',
  artist: 'David Bowie',
  price: 23.99,
  image: '/david_bowie_scary_monsters.png',
  state: true,
  description: 'David Bowie\'s first album of the 80s.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 26,
  name: 'Double Fantasy',
  artist: 'John Lennon & Yoko Ono',
  price: 24.99,
  image: '/john_lennon_double_fantasy.png',
  state: true,
  description: 'The final album released by John Lennon during his lifetime.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 27,
  name: 'True Blue',
  artist: 'Madonna',
  price: 21.99,
  image: '/madonna_true_blue.png',
  state: true,
  description: 'One of Madonna\'s best-selling albums.',
  genre: 'Pop',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 28,
  name: 'Construction Time Again',
  artist: 'Depeche Mode',
  price: 21.99,
  image: '/depeche_mode_construction_time_again.png',
  state: true,
  description: 'The third studio album by Depeche Mode.',
  genre: 'Synthpop',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 29,
  name: 'Tango in the Night',
  artist: 'Fleetwood Mac',
  price: 21.99,
  image: '/fleetwood_mac_tango_in_the_night.png',
  state: true,
  description: 'Fleetwood Mac\'s best-selling 80s album.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 30,
  name: 'Green',
  artist: 'R.E.M.',
  price: 21.99,
  image: '/rem_green.png',
  state: true,
  description: 'The sixth studio album by R.E.M.',
  genre: 'Alternative Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 31,
  name: 'Achtung Baby',
  artist: 'U2',
  price: 22.99,
  image: '/u2_achtung_baby.png',
  state: true,
  description: 'One of U2\'s most critically acclaimed albums.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 32,
  name: 'The Dreaming',
  artist: 'Kate Bush',
  price: 23.99,
  image: '/kate_bush_the_dreaming.png',
  state: true,
  description: 'The fourth studio album by Kate Bush.',
  genre: 'Art Pop',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 33,
  name: 'Avalon',
  artist: 'Roxy Music',
  price: 22.99,
  image: '/roxy_music_avalon.png',
  state: true,
  description: 'The eighth and final studio album by Roxy Music.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 34,
  name: 'Rio',
  artist: 'Duran Duran',
  price: 21.99,
  image: '/duran_duran_rio.png',
  state: true,
  description: 'One of the most iconic albums of the 80s.',
  genre: 'New Wave',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}, {
  product_id: 35,
  name: 'The Wall',
  artist: 'Pink Floyd',
  price: 24.99,
  image: '/pink_floyd_the_wall.png',
  state: true,
  description: 'One of Pink Floyd\'s most famous concept albums.',
  genre: 'Rock',
  format: 'Vinyl',
  release_date: '2023-01-01',
  sold: 0
}];