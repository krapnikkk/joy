import { IActivity } from "@src/@types";
import Treasurehunt from "./components/Activity/Treasurehunt";
// import Goose from "./components/Activity/btgoose";
// import Journey from "./components/Activity/Journey";
// import PetPig from "./components/Activity/PetPig";

export const activityInfo:IActivity[] = [
    // {
    //     "name":"热爱奇旅",
    //     "component":Journey
    // },
    {
        "name":"穿行寻宝",
        "component":Treasurehunt
    },
    // {
    //     "name":"天天提鹅",
    //     "component":Goose
    // },
    // {
    //     "name":"养猪猪",
    //     "component":PetPig
    // }
]