import { IActivity } from "@src/@types";
import Goose from "./components/Activity/btgoose";
import Journey from "./components/Activity/Journey";
// import PetPig from "./components/Activity/PetPig";

export const activityInfo:IActivity[] = [
    {
        "name":"热爱奇旅",
        "component":Journey
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