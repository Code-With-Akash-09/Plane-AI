import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const CardInterviewList = () => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={"!h-12"}>Role</TableHead>
                        <TableHead className={"!h-12"}>Skills</TableHead>
                        <TableHead className={"!h-12"}>Job Description</TableHead>
                        <TableHead className={"!h-12"}>Difficult Level</TableHead>
                        <TableHead className={"!h-12"}>Rating</TableHead>
                        <TableHead className={"!h-12"}>More</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        PreviousInterviews.map((interview, i) => (
                            <TableRow key={i}>
                                <TableCell className={"!h-12"}>{interview.role}</TableCell>
                                <TableCell className={"!h-12"}>{interview.skills}</TableCell>
                                <TableCell className={"!h-12"}>{interview.responsibility}</TableCell>
                                <TableCell className={"!h-12"}>{interview.level}</TableCell>
                                <TableCell className={"!h-12"}>{interview.rating}</TableCell>
                                <TableCell className={"!h-12"}>{interview.action}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default CardInterviewList

const PreviousInterviews = [
    {
        role: "Software Engineer",
        skills: "JavaScript, React",
        responsibility: "Develop and maintain web applications",
        level: "Intermediate",
        rating: "4/5",
        action: "View"
    },
    {
        role: "Data Analyst",
        skills: "Python, SQL, Excel",
        responsibility: "Analyze datasets and generate reports",
        level: "Beginner",
        rating: "3/5",
        action: "View"
    },
    {
        role: "UI/UX Designer",
        skills: "Figma, Adobe XD",
        responsibility: "Create user interfaces and improve user experience",
        level: "Advanced",
        rating: "5/5",
        action: "View"
    },
    {
        role: "DevOps Engineer",
        skills: "AWS, Docker, Kubernetes",
        responsibility: "Manage CI/CD pipelines and cloud infrastructure",
        level: "Intermediate",
        rating: "4/5",
        action: "View"
    },
    {
        role: "Mobile Developer",
        skills: "Flutter, Dart",
        responsibility: "Build cross-platform mobile apps",
        level: "Beginner",
        rating: "2/5",
        action: "View"
    }
]