const InitialState = null;

const FooterSectionData = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_FOOTER_SECTION_DATA":
            return state = action.data;
            break;
        default:
            return state;
            break;
    }

};

export default FooterSectionData;