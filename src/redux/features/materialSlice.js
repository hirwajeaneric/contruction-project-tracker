import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    listOfProjects: [],
    listOfOwnerProjects: [],
    listOfConsultantsProjects: [],
    selectedProject: {},
    numberOfProjects: 0,
    responseMessage: '',
    searchedQuery: '',
    searchProjectsResults: [],
    isLoading: false,
}

export const getAllProjects = createAsyncThunk(
    'project/getAllProjects',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/cpta/project/list`);
            response.data.projects.forEach((element, index) => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.startDate = new Date(element.startDate).toLocaleString();
                element.endDate = new Date(element.endDate).toLocaleString();
                element.estimatedEndDate = new Date(element.estimatedEndDate).toLocaleString();
                element.number = index;
            });
            return { projects: response.data.projects, user: userId }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getProjectDetails = createAsyncThunk(
    'project/getProjectDetails',
    async (projectId, thunkAPI) => { 
        try {
            const response = await axios.get(`${serverUrl}/api/v1/cpta/project/findById?id=${projectId}`)
            return response.data.project;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (id, thunkAPI) => { 
        try {
            const response = await axios.delete(Endpoints.APIS.jobApis.delete+id)
            if (response.status === 204) {
                return id;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const userSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        updateProjects: (state, action) => {
            state.selectedProject = action.payload;
            let projects = state.listOfProjects;

            projects.forEach(project => {
                if (project.id === action.payload._id) {
                    project = action.payload;
                }
            })
            state.listOfProjects = projects;
        },
        dynamicSearch: (state, action) => {
            state.searchProjectsResults = state.listOfProjects.filter(project => project.jobLocation.toUpperCase().includes(action.payload.toUpperCase()));
        },
        manualSearch: (state, action) => {
            state.searchProjectsResults = state.listOfProjects.filter(project => project.jobLocation.toUpperCase().includes(action.payload.toUpperCase()));
        }
    },
    extraReducers: {
        [getAllProjects.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllProjects.fulfilled] : (state, action) => {
            state.isLoading = false;
            let listOfProjects = action.payload.projects.sort((a,b) => new Date(a.creationDate) - new Date(b.creationDate));
            state.listOfProjects = listOfProjects;
            state.listOfConsultantsProjects = action.payload.projects.filter(project => project.consultantId === action.payload.user);
            state.listOfOwnerProjects = action.payload.projects.filter(project => project.ownerId === action.payload.user);
            state.numberOfProjects = state.listOfConsultantsProjects.length + state.listOfOwnerProjects.length;
        },
        [getAllProjects.rejected] : (state) => {
            state.isLoading = false;
        },
        [getProjectDetails.pending] : (state) => {
            state.isLoading = true;
        },
        [getProjectDetails.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedProject = action.payload;
        },
        [getProjectDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [deleteProject.pending] : (state) => {
            state.isLoading = true;
        },
        [deleteProject.fulfilled] : (state, action) => {
            state.isLoading = false;
            let projects = state.listOfProjects;
            projects.filter(project => project._id !== action.payload)
            state.listOfProjects = projects;
            state.responseMessage = 'Project deleted';
        },
        [deleteProject.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { updateProjects, dynamicSearch, manualSearch } = userSlice.actions;
export default userSlice.reducer;