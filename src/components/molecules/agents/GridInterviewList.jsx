import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import Link from "next/link";

const GridInterviewList = async () => {

    const supabase = await createClient()

    let { data: Interviews } = await supabase
        .from('Interviews')
        .select('*')

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {
                    Interviews.length === 0 ? (
                        <>
                            <span className="text-neutral-500">No Interviews Found</span>
                        </>
                    ) : (
                        Interviews?.map((interview, i) => (
                            <Card key={i} className={"py-4"}>
                                <CardHeader className={"px-4"}>
                                    <CardTitle>{interview.role}</CardTitle>
                                </CardHeader>
                                <CardContent className={"flex gap-4 px-4 items-end justify-between"}>
                                    <Button
                                        asChild
                                        className={"w-3/5 bg-purple-500 text-white hover:text-purple-500"}
                                    >
                                        <Link
                                            href={`/agents/interview-preparation/${interview.interview_id}`}
                                            className="cursor-pointer"
                                        >
                                            Start
                                        </Link>
                                    </Button>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-neutral-400">
                                            {
                                                interview.status === "not-started" ? "Not Started" : "In Progress"
                                            }
                                        </span>
                                        <span className="text-xs text-neutral-400">
                                            {format(interview.created_at, "PP")}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default GridInterviewList
