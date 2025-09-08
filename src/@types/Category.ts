import * as FaIcons from "react-icons/fa";
import type { ColorKey } from "../utils/colors";

export type Category = {
    id: number,
    user_id: string, 
    name: string,
    type: "gasto" | "receita";     
    icon: keyof typeof FaIcons,
    color: ColorKey,
    created_at: string
}