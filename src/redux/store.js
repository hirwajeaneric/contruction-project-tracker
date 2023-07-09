import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './features/userSlice';
import projectReducer  from './features/projectSlice';
// import issueReducer from './features/issueSlice';
// import sprintReducer from './features/sprintSlice';
// import materialReducer from './features/materialSlice';

export const store = configureStore({
    reducer: {
        // user: userReducer,
        project: projectReducer, 
        // issue: issueReducer,
        // sprint: sprintReducer,
        // material: materialReducer
    }
})