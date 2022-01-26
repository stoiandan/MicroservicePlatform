

const LoginReducer = (state, action) => {

        switch (action.type)
        {
                case "DO_LOGIN":
                        console.log("Doing login");
                        return {
                                userName: action.userName,
                                password: action.password,
                        }
                default:
                        return {
                                userName: "",
                                password: "",

                        }
        }

}

export default LoginReducer;