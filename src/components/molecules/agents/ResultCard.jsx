import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import GeminiMarkdown from "./GeminiMarkdown";

const ResultCard = ({ question }) => {

    const renderContent = (content) => {
        if (!content) return <p className="italic text-neutral-500">N/A</p>;

        if (typeof content === 'string') {
            return <GeminiMarkdown content={content} />;
        }

        return content;
    };

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto h-full items-center justify-center p-4 md:p-6 gap-4 md:rounded-3xl border bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30 border-neutral-800">
            <div className="flex w-full">
                <span className="text-base font-mono">
                    {question.id + 1}. {question.question}
                </span>
            </div>

            <Separator />

            <div className="space-y-4 w-full">
                {AnswerConfig.map((item) => (
                    <div
                        key={item.id}
                        className={cn("flex flex-col w-full", item.className)}
                    >
                        <span className="font-semibold text-base font-mono underline underline-offset-4">{item.label}:</span>
                        {renderContent(question[item.value])}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultCard

const AnswerConfig = [
    {
        id: 1,
        label: "Your Answer",
        value: "userAnswer",
        className: "bg-red-500/50 text-neutral-200 p-4 md:p-6 rounded-2xl w-full",
    },
    {
        id: 2,
        label: "Correct Answer",
        value: "correctAnswer",
        className: "bg-green-500/50 text-neutral-200 p-4 md:p-6 rounded-2xl w-full",
    },
    {
        id: 3,
        label: "Improvement Suggestions",
        value: "improvement",
        className: "bg-yellow-500/50 text-neutral-200 p-4 md:p-6 rounded-2xl w-full",
    },
    {
        id: 4,
        label: "Feedback",
        value: "feedback",
        className: "bg-blue-500/50 text-neutral-200 p-4 md:p-6 rounded-2xl w-full",
    },
    {
        id: 5,
        label: "Rating",
        value: "rate",
        className: "bg-purple-500/50 text-neutral-200 p-4 md:p-6 rounded-2xl w-full",
    },
]
