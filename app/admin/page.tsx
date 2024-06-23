
import { redirect } from "next/navigation";
import Pagination from "../products/components/Pagination";
import SearchBar from "../products/components/search";
import ProductTable from "./productos/components/ProductTable";
import * as dao from '@/lib/dao'

export default function Page(){
    redirect("admin/productos")
}