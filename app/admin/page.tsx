
import { redirect } from "next/navigation";
import Pagination from "../products/ui/Pagination";
import SearchBar from "../products/ui/search";
import ProductTable from "./productos/ProductTable";
import * as dao from '@/lib/dao'

export default function Page(){
    redirect("admin/productos")
}