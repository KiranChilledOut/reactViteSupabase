import { message } from "antd";
import supabaseConfig from "../config/supabase-config";

/**
 * User Service Functions
 * 
 * This file contains all the user-related service functions that interact with Supabase:
 * - User registration
 * - User login
 * - User session management
 * 
 * Authentication Flow:
 * - Public routes (/login, /register) are wrapped in PublicLayout which automatically
 *   redirects authenticated users to the home page ("/")
 * - Private routes (/) are wrapped in PrivateLayout
 * - The getLoggedInUser() function is typically used to verify authentication status
 *   and fetch user data throughout the application
 */

/**
 * Registers a new user with Supabase authentication
 * 
 * @param values - Object containing user registration data (email, password, name)
 * @returns Promise with success status and message
 * 
 * Flow:
 * 1. Checks if email already exists in user_profiles table
 * 2. Creates auth user in Supabase
 * 3. Creates corresponding profile in user_profiles table
 * 4. Returns success/error response
 */
/**
 * Registers a new user with email/password authentication
 * 
 * @param {Object} values - User registration data
 * @param {string} values.email - User's email address
 * @param {string} values.password - User's password
 * @param {string} values.name - User's full name
 * 
 * @returns {Promise<Object>} Response object
 * @property {boolean} success - Registration success status
 * @property {string} message - Success/error message
 * 
 * @throws {Error} If email already registered or Supabase error occurs
 * 
 * Example usage:
 * try {
 *   const result = await registerUser({
 *     email: 'user@example.com',
 *     password: 'securepassword',
 *     name: 'John Doe'
 *   });
 *   console.log(result.message);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const registerUser = async (values: any) => {
    try {

        // check if the email is already registered
        const userExistingResponse = await supabaseConfig.from('user_profiles').select('*').eq('email', values.email)
        if (userExistingResponse.data && userExistingResponse.data.length > 0) {
            throw new Error("Email already registered. Please login");
        }
        const signupResponse = await supabaseConfig.auth.signUp({
            email: values.email,
            password: values.password
        })
        if (signupResponse.error) {
            throw new Error(signupResponse.error.message)
        }
        // get the user id from the response and store other data in the db
        const userId = signupResponse.data.user?.id
        const userProfilesTableData = {
            id: userId,
            email: values.email,
            name: values.name,
            profile_pic: ''
        }
        const userProfileResponse = await supabaseConfig.from('user_profiles').insert([userProfilesTableData])
        if (userProfileResponse.error) {
            throw new Error(userProfileResponse.error.message);
        }
        return {
            success: true,
            message: "Registration successful. Please check your Email to verify"
        }

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong")
    }
}

/**
 * Authenticates a user with Supabase
 * 
 * @param values - Object containing login credentials (email, password)
 * @returns Promise with success status and message
 * 
 * Flow:
 * 1. Attempts to authenticate with Supabase auth
 * 2. Returns success/error response
 */
/**
 * Authenticates a user with email/password credentials
 * 
 * @param {Object} values - User login credentials
 * @param {string} values.email - User's email address
 * @param {string} values.password - User's password
 * 
 * @returns {Promise<Object>} Response object
 * @property {boolean} success - Login success status
 * @property {string} message - Success/error message
 * 
 * @throws {Error} If invalid credentials or Supabase error occurs
 * 
 * Example usage:
 * try {
 *   const result = await loginUser({
 *     email: 'user@example.com',
 *     password: 'securepassword'
 *   });
 *   console.log(result.message);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const loginUser = async (values: any) => {
    try {
        const loginResponse = await supabaseConfig.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })
        if (loginResponse.error) {
            throw new Error(loginResponse.error.message);
        }

        return {
            success: true,
            message: "Login successful"
        } 

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
}

/**
 * Gets the currently logged in user's full profile
 * 
 * @returns Promise with success status, message, and user data
 * 
 * Flow:
 * 1. Gets current session from Supabase auth
 * 2. Fetches user profile from user_profiles table
 * 3. Merges auth and profile data
 * 4. Returns combined user data
 */
/**
 * Retrieves the currently authenticated user's full profile
 * 
 * @returns {Promise<Object>} Response object
 * @property {boolean} success - Operation success status
 * @property {string} message - Success/error message
 * @property {Object} data - Combined user data from auth and profile tables
 * 
 * @throws {Error} If no authenticated user or Supabase error occurs
 * 
 * Example usage:
 * try {
 *   const result = await getLoggedInUser();
 *   console.log(result.data);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const getLoggedInUser = async () => {
    try {

        // step 1 - get the session from supabase
        const userResponse = await supabaseConfig.auth.getUser();
        if(userResponse.error) {
            throw new Error(userResponse.error.message);
        }
        // step 2 - get the user from supabase
        const userId = userResponse.data.user?.id
        const userProfileResponse = await supabaseConfig.from('user_profiles').select('*').eq('id', userId);
        if(userProfileResponse.error || userProfileResponse.data.length === 0) {
            throw new Error(userProfileResponse?.error?.message);
        }
        const result = {
            ...userResponse.data.user,
            ...userProfileResponse.data[0]
        }
        return {
            success: true,
            message: "User fetched successfully",
            data: result
        }
        
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong")
    }
}