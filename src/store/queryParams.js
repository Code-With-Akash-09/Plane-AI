"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import useInterviewStore from "."

const QueryParamsProvider = () => {
	const searchParams = useSearchParams()

	const dispatch = useInterviewStore(store => store.dispatch)

	useEffect(() => {
		dispatch({
			type: "SET_STATE",
			payload: { queryParams: Object.fromEntries(searchParams) },
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return null
}

export default QueryParamsProvider
