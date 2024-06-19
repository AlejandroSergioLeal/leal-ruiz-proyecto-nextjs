import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl text-center animate-pulse">Cargando</h1>
    </div>
  )
}