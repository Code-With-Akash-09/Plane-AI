import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient, getUser } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import Link from "next/link"

const CardInterviewList = async () => {
    const supabase = await createClient()
    const user = await getUser()

    const { data: interviews, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("uid", user.id)
        .eq("status", "completed")
        .order("created_at", { ascending: false })

    if (error) {
        return <p className="text-red-500">Failed to load interviews</p>
    }

    if (!interviews || interviews.length === 0) {
        return <p className="text-gray-500">No Completed interviews found.</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="!h-12">Sr.</TableHead>
                    <TableHead className="!h-12">Role</TableHead>
                    <TableHead className="!h-12">Skills</TableHead>
                    <TableHead className="!h-12">Job Description</TableHead>
                    <TableHead className="!h-12">Difficulty Level</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {interviews.map((interview, i) => (
                    <TableRow key={interview.interview_id} className="cursor-pointer">
                        <Cell interviewId={interview.interview_id}>{i + 1}</Cell>
                        <Cell interviewId={interview.interview_id}>{interview.role}</Cell>
                        <Cell interviewId={interview.interview_id} className="truncate max-w-72">
                            {interview.skills?.join(", ") || "-"}
                        </Cell>
                        <Cell interviewId={interview.interview_id} className="truncate max-w-72">
                            {interview.job_description}
                        </Cell>
                        <Cell interviewId={interview.interview_id}>
                            {interview.difficulty}
                        </Cell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
    )
}

export default CardInterviewList

const Cell = ({ children, interviewId, className }) => {
    const url = `/agents/interview-preparation/interview/${interviewId}/result`
    return (
        <TableCell className={cn("!h-12", className)}>
            <Link href={url} className="hover:underline hover:decoration-primary hover:underline-offset-4">
                {children}
            </Link>
        </TableCell>
    )
}
