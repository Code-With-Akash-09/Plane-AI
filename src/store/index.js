import { create } from "zustand"
import { devtools, redux } from "zustand/middleware"
import { reducer } from "./reducer"

const initialState = {
    greet: true,
    questionList: null,
}

const useInterviewStore = create(
    devtools(redux(reducer, initialState), {
        name: "useInterviewStore",
        enabled:
            (typeof window !== "undefined" &&
                Boolean(window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])) ||
            process.env.VERCEL_ENV !== "production",
    })
)

export default useInterviewStore