import type { ColorKey } from '../pages/Categories/Categories';
import * as FaIcons from "react-icons/fa";

export type Category = {
    id: number,
    user_id: string, 
    name: string,
    type: string,
    icon: keyof typeof FaIcons,
    color: ColorKey,
    created_at: string
}