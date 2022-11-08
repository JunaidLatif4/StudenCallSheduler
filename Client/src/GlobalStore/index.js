import { combineReducers } from "redux";

// Reducers :
import HeroSectionData from "./reducrs/hero";
import PromotionSectionData from "./reducrs/promotion";
import ReviewSectionData from "./reducrs/review";
import FooterSectionData from "./reducrs/footer";

const allReducers = combineReducers({
    HeroSectionData,
    PromotionSectionData,
    ReviewSectionData,
    FooterSectionData,
});

export default allReducers;