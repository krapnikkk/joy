import { IActivity } from "@src/@types";
import Goose from "./components/Activity/btgoose";
import Travel from "./components/Activity/Travel";
// import PetPig from "./components/Activity/PetPig";

export const activityInfo:IActivity[] = [
    {
        "name":"热爱环游记",
        "component":Travel
    },
    {
        "name":"天天提鹅",
        "component":Goose
    },
    // {
    //     "name":"养猪猪",
    //     "component":PetPig
    // }
]