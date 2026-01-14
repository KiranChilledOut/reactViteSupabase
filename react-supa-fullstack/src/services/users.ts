import supabaseConfig from "../config/supabase-config";

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
