const InitialState = null;

const PromotionSectionData = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_PROMOTION_SECTION_DATA":
            return state = action.data;
            break;
        default:
            return state;
            break;
    }

};

export default PromotionSectionData;