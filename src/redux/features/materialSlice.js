import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    listOfProjectResources: [],
    listOfIssueResources: [],
    listOfSprintResources: [],
    selectedResource: {},
    numberOfProjectResources: 0,
    numberOfIssueResources: [],
    numberOfSprintResources: [],
    searchedQuery: '',
    searchResourcesResults: [],
    isLoading: false,
}

export const getProjectResources = createAsyncThunk(
    'resource/getProjectResources',
    async (project, thunkAPI) => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/cpta/material/findByProjectId?project=${project}`);
            response.data.resources.forEach((element, index) => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.entryDate = new Date(element.entryDate).toLocaleString();
            });
            return { resources: response.data.resources, user: userId }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const deleteResource = createAsyncThunk(
    'resource/deleteResource',
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
    name: 'material',
    initialState,
    reducers: {
        updateResources: (state, action) => {
            state.selectedResource = action.payload;
            let resources = state.listOfProjectResources;

            resources.forEach(resource => {
                if (resource.id === action.payload._id) {
                    resource = action.payload;
                }
            })
            state.listOfProjectResources = resources;
        },
        dynamicSearch: (state, action) => {
            state.searchResourcesResults = state.listOfProjectResources.filter(resource => resource.name.toUpperCase().includes(action.payload.toUpperCase()));
        },
        manualSearch: (state, action) => {
            state.searchResourcesResults = state.listOfProjectResources.filter(resource => resource.name.toUpperCase().includes(action.payload.toUpperCase()));
        }
    },
    extraReducers: {
        [getProjectResources.pending] : (state) => {
            state.isLoading = true;
        },
        [getProjectResources.fulfilled] : (state, action) => {
            state.isLoading = false;
            let listOfProjectResources = action.payload.resources.sort((a,b) => new Date(a.creationDate) - new Date(b.creationDate));
            state.listOfProjectResources = listOfProjectResources;
            state.listOfConsultantsResources = action.payload.resources.filter(resource => resource.consultantId === action.payload.user);
            state.listOfOwnerResources = action.payload.resources.filter(resource => resource.ownerId === action.payload.user);
            state.numberOfResources = state.listOfConsultantsResources.length + state.listOfOwnerResources.length;
        },
        [getProjectResources.rejected] : (state) => {
            state.isLoading = false;
        },
        [deleteResource.pending] : (state) => {
            state.isLoading = true;
        },
        [deleteResource.fulfilled] : (state, action) => {
            state.isLoading = false;
            let resources = state.listOfProjectResources;
            resources.filter(resource => resource._id !== action.payload)
            state.listOfProjectResources = resources;
            state.responseMessage = 'Resource deleted';
        },
        [deleteResource.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { updateResources, dynamicSearch, manualSearch } = userSlice.actions;
export default userSlice.reducer;