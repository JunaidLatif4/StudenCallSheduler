const InitialState = null;

const HeroSectionData = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_HERO_SECTION_DATA":
            return state = action.data;
            break;
        default:
            return state;
            break;
    }

};

export default HeroSectionData;