import { combineReducers } from "redux";

// Reducers :
import HeroSectionData from "./reducrs/hero";
import PromotionSectionData from "./reducrs/promotion";
import ReviewSectionData from "./reducrs/review";
import FooterSectionData from "./reducrs/footer";
import InstituteData from "./reducrs/institute";
import ScheduleData from "./reducrs/schedule";

const allReducers = combineReducers({
    HeroSectionData,
    PromotionSectionData,
    ReviewSectionData,
    FooterSectionData,
    InstituteData,
    ScheduleData
});

export default allReducers;