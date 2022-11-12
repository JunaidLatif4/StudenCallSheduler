const InitialState = null;

const InstituteData = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_INSTITUTE_DATA":
            return state = action.data;
            break;
        default:
            return state;
            break;
    }

};

export default InstituteData;