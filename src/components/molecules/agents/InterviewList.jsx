import CardInterviewList from "./CardInterviewList"
import GridInterviewList from "./GridInterviewList"

const InterviewList = ({ type = "grid" }) => {

    return (
        <>
            {
                type === "grid" ? (
                    <GridInterviewList />
                ) : (
                    <CardInterviewList />
                )
            }
        </>
    )
}

export default InterviewList