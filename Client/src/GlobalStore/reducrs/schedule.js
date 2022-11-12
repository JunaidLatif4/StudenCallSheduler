const InitialState = null;

const ScheduleData = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_SCHEDULE_DATA":
            return state = action.data;
            break;
        default:
            return state;
            break;
    }

};

export default ScheduleData;