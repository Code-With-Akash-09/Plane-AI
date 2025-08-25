import SignInForm from "@/components/molecules/auth/SignInForm"
import SignUpForm from "@/components/molecules/auth/SignUpForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = () => {
    return (
        <div className="w-full max-w-sm h-fit p-6">
            <Tabs defaultValue="signin" className={"gap-4 w-full"}>
                <TabsList className={"w-full !h-10"}>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <div className="w-full">
                    <TabsContent value="signin">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignUpForm />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default page
