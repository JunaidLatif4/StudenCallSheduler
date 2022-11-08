const InitialState = null;

const ReviewSectionData = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_REVIEW_SECTION_DATA":
            return state = action.data;
            break;
        default:
            return state;
            break;
    }

};

export default ReviewSectionData;