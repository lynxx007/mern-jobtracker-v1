import { createContext, useEffect, useReducer } from "react"
import { createAction } from "../utils/reducer/reducer"
import axios from 'axios'

// const user = localStorage.getItem('user')
// const token = localStorage.getItem('token')
// const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    userLocation: '',
    jobLocation: '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'interview', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    userLoading: true
}

export const APP_ACTION_TYPE = {
    SET_ALERT: 'SHOW_ALERT',
    HIDE_ALERT: 'HIDE_ALERT',
    SET_SIDEBAR: 'SET_SIDEBAR',
    REGISTER_USER_START: 'REGISTER_USER_START',
    REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
    REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',
    LOGIN_USER_START: 'LOGIN_USER_START',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
    LOGOUT_USER: 'LOGOUT_USER',
    UPDATE_USER_START: 'UPDATE_USER_START',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
    HANDLE_CHANGE: 'HANDLE_CHANGE',
    CLEAR_VALUES: 'CLEAR_VALUES',
    CREATE_JOB_START: 'CREATE_JOB_START',
    CREATE_JOB_SUCCESS: 'CREATE_JOB_SUCCESS',
    CREATE_JOB_FAILURE: 'CREATE_JOB_FAILURE',
    GET_JOB_START: 'GET_JOB_START',
    GET_JOB_SUCCESS: 'GET_JOB_SUCCESS',
    SET_EDIT_JOB: 'SET_EDIT_JOB',
    DELETE_JOB_START: 'DELETE_JOB_START',
    EDIT_JOB_START: 'EDIT_JOB_START',
    EDIT_JOB_SUCCESS: 'EDIT_JOB_SUCCESS',
    EDIT_JOB_FAILURE: 'EDIT_JOB_FAILURE',
    SHOW_STATS_START: 'SHOW_STATS_START',
    SHOW_STATS_SUCCESS: 'SHOW_STATS_SUCCESS',
    CLEAR_FILTERS: 'CLEAR_FILTERS',
    CHANGE_PAGE: 'CHANGE_PAGE',
    GET_CURRENT_USER_START: 'GET_CURRENT_USER',
    GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
}

export const AppContext = createContext()

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_ACTION_TYPE.SET_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please Provide All Values'
            }
        case APP_ACTION_TYPE.HIDE_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: ''
            }
        case APP_ACTION_TYPE.REGISTER_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case APP_ACTION_TYPE.REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User created! Redirecting...'
            }
        case APP_ACTION_TYPE.REGISTER_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.response.data.msg
            }
        case APP_ACTION_TYPE.LOGIN_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case APP_ACTION_TYPE.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'Login successful! Redirecting...'
            }
        case APP_ACTION_TYPE.LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.response.data.msg,
            }
        case APP_ACTION_TYPE.SET_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case APP_ACTION_TYPE.LOGOUT_USER:
            return {
                ...state,
                user: null,
                token: null,
                jobLocation: '',
                userLocation: '',
                isLoading: false,
                userLoading: false
            }
        case APP_ACTION_TYPE.UPDATE_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case APP_ACTION_TYPE.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User data updated!'
            }
        case APP_ACTION_TYPE.UPDATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.response.data.msg
            }
        case APP_ACTION_TYPE.HANDLE_CHANGE:
            return {
                ...state,
                page: 1,
                [action.payload.name]: action.payload.value
            }
        case APP_ACTION_TYPE.CLEAR_VALUES:
            return {
                ...state,
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending'
            }
        case APP_ACTION_TYPE.CREATE_JOB_START:
            return {
                ...state,
                isLoading: true
            }
        case APP_ACTION_TYPE.CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Job Created'
            }
        case APP_ACTION_TYPE.CREATE_JOB_FAILURE:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.response.data.msg
            }
        case APP_ACTION_TYPE.GET_JOB_START:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            }
        case APP_ACTION_TYPE.GET_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages
            }
        case APP_ACTION_TYPE.SET_EDIT_JOB:
            const job = state.jobs.find(job => job._id === action.payload)
            const { _id, position, company, jobLocation, jobType, status } = job
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status

            }
        case APP_ACTION_TYPE.DELETE_JOB_START:
            return {
                ...state,
                isLoading: true
            }
        case APP_ACTION_TYPE.EDIT_JOB_START:
            return {
                ...state,
                isLoading: true
            }
        case APP_ACTION_TYPE.EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job updated!'
            }
        case APP_ACTION_TYPE.EDIT_JOB_FAILURE:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.error.response.data.msg
            }
        case APP_ACTION_TYPE.SHOW_STATS_START:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            }
        case APP_ACTION_TYPE.SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload.defaultStats,
                monthlyApplications: action.payload.monthlyApplications
            }
        case APP_ACTION_TYPE.CLEAR_FILTERS:
            return {
                ...state,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest'
            }
        case APP_ACTION_TYPE.CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case APP_ACTION_TYPE.GET_CURRENT_USER_START:
            return {
                ...state,
                userLoading: true,
                showAlert: false
            }
        case APP_ACTION_TYPE.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location
            }

        default:
            throw new Error(`unhandled type ${action.type} in appReducer`)
    }

}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)
    const handleChange = (name, value) => {
        dispatch(createAction(APP_ACTION_TYPE.HANDLE_CHANGE, { name, value }))
    }
    const clearValues = () => {
        dispatch(createAction(APP_ACTION_TYPE.CLEAR_VALUES))
    }
    const displayAlert = () => {
        dispatch(createAction(APP_ACTION_TYPE.SET_ALERT))
    }
    const hideAlert = () => {
        dispatch(createAction(APP_ACTION_TYPE.HIDE_ALERT))
    }
    const toggleSidebar = () => {
        dispatch(createAction(APP_ACTION_TYPE.SET_SIDEBAR))
    }
    // const addUserToLocalStorage = (user, token, location) => {
    //     localStorage.setItem('user', JSON.stringify(user))
    //     localStorage.setItem('token', token)
    //     localStorage.setItem('location', location)
    // }
    // const removeUserFromLocalStorage = () => {
    //     localStorage.removeItem('user')
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('location')
    // }
    const registerUser = async (name, email, password) => {
        dispatch(createAction(APP_ACTION_TYPE.REGISTER_USER_START))
        try {
            const response = await axios.post('/v1/auth/register', {
                name,
                email,
                password
            })
            const { user, token, location } = response.data
            dispatch(createAction(APP_ACTION_TYPE.REGISTER_USER_SUCCESS, { user, token, location }))
            // addUserToLocalStorage(user, token, location)
        } catch (error) {
            dispatch(createAction(APP_ACTION_TYPE.REGISTER_USER_FAILURE, error))
        }
        setTimeout(hideAlert, 3000)
    }
    const loginUser = async (email, password) => {
        dispatch(createAction(APP_ACTION_TYPE.LOGIN_USER_START))
        try {
            const response = await axios.post('/v1/auth/login', {
                email,
                password
            })
            const { user, token, location } = response.data
            dispatch(createAction(APP_ACTION_TYPE.LOGIN_USER_SUCCESS, { user, token, location }))
            // addUserToLocalStorage(user, token, location)
        } catch (error) {
            dispatch(createAction(APP_ACTION_TYPE.LOGIN_USER_FAILURE, error))
        }
    }
    const logoutUser = async () => {
        await axios.get('/v1/auth/logout')
        dispatch(createAction(APP_ACTION_TYPE.LOGOUT_USER))
        // removeUserFromLocalStorage()
    }
    const updateUser = async (name, email, lastName, locationParam) => {
        dispatch(createAction(APP_ACTION_TYPE.UPDATE_USER_START))
        try {
            const { data } = await axios.patch('/v1/auth/updateUser', {
                name,
                email,
                lastName,
                location: locationParam
            },
                // {
                //     headers: {
                //         Authorization: `Bearer ${state.token}`
                //     }
                // }
            )
            const { user, token, location } = data
            dispatch(createAction(APP_ACTION_TYPE.UPDATE_USER_SUCCESS, { user, token, location }))
            // addUserToLocalStorage(user, token, location)
            setTimeout(hideAlert, 5000)
        } catch (error) {
            dispatch(createAction(APP_ACTION_TYPE.UPDATE_USER_FAILURE, error))
        }
    }
    const createJob = async () => {
        dispatch(createAction(APP_ACTION_TYPE.CREATE_JOB_START))
        const { position, company, jobLocation, jobType, status } = state
        try {
            await axios.post('/v1/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status
            },
                // {
                //     headers: {
                //         Authorization: `Bearer ${state.token}`
                //     }
                // }
            )
            dispatch(createAction(APP_ACTION_TYPE.CREATE_JOB_SUCCESS))
            dispatch(createAction(APP_ACTION_TYPE.CLEAR_VALUES))
            setTimeout(hideAlert, 5000)
        } catch (error) {
            if (error.response.status === 401) return
            dispatch(createAction(APP_ACTION_TYPE.CREATE_JOB_FAILURE, error))
        }
    }
    const getAllJobs = async () => {
        dispatch(createAction(APP_ACTION_TYPE.GET_JOB_START))
        const { page, search, searchStatus, searchType, sort } = state
        let url = `/v1/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search) {
            url = url + `&search=${search}`
        }
        try {
            const response = await axios.get(url,
                //     {
                //     headers: {
                //         Authorization: `Bearer ${state.token}`
                //     }
                // }
            )
            const { jobs, totalJobs, numOfPages } = response.data
            dispatch(createAction(APP_ACTION_TYPE.GET_JOB_SUCCESS, { jobs, totalJobs, numOfPages }))
            setTimeout(hideAlert, 5000)
        } catch (error) {
            logoutUser()
        }
    }
    const setEditJob = id => {
        dispatch(createAction(APP_ACTION_TYPE.SET_EDIT_JOB, id))
    }
    const editJob = async () => {
        dispatch(createAction(APP_ACTION_TYPE.EDIT_JOB_START))
        try {
            const { position, company, jobLocation, jobType, status, editJobId } = state
            await axios.patch(`/v1/jobs/${editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status
            },
                //  {
                //     headers: {
                //         Authorization: `Bearer ${state.token}`
                //     }
                // }
            )
            dispatch(createAction(APP_ACTION_TYPE.EDIT_JOB_SUCCESS))
            dispatch(createAction(APP_ACTION_TYPE.CLEAR_VALUES))
            setTimeout(hideAlert, 5000)
        } catch (error) {
            if (error.response.status === 401) return
            dispatch(createAction(APP_ACTION_TYPE.EDIT_JOB_FAILURE, error))
        }
    }
    const deleteJob = async jobId => {
        dispatch(createAction(APP_ACTION_TYPE.DELETE_JOB_START))
        try {
            await axios.delete(`/v1/jobs/${jobId}`,
                //  {
                //     headers: {
                //         Authorization: `Bearer ${state.token}`
                //     }
                // }
            )
            getAllJobs()
        } catch (error) {
            logoutUser()
        }
    }
    const showStats = async () => {
        dispatch(createAction(APP_ACTION_TYPE.SHOW_STATS_START))
        try {
            const { data } = await axios.get('/v1/jobs/stats',
                // {
                //     headers: {
                //         Authorization: `Bearer ${state.token}`
                //     }
                // }
            )
            dispatch(createAction(APP_ACTION_TYPE.SHOW_STATS_SUCCESS, data))
            setTimeout(hideAlert, 5000)
        } catch (error) {
            console.log(error);
        }
    }
    const clearFilters = () => {
        dispatch(createAction(APP_ACTION_TYPE.CLEAR_FILTERS))
    }
    const changePage = page => {
        dispatch(createAction(APP_ACTION_TYPE.CHANGE_PAGE, page))
    }
    const getCurrentUser = async () => {
        dispatch(createAction(APP_ACTION_TYPE.GET_CURRENT_USER_START))
        try {
            const { data } = await axios.get('/v1/auth/getCurrentUser')
            const { user, location } = data
            dispatch(createAction(APP_ACTION_TYPE.GET_CURRENT_USER_SUCCESS, { user, location }))
        } catch (error) {
            if (error.response.status === 401) return
            logoutUser()
        }
    }
    useEffect(() => {
        getCurrentUser()
    }, [])


    const value = {
        ...state,
        displayAlert,
        hideAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage
    }
    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}