import { BorderBeam } from "@/components/atoms/BorderBeam"
import SignInForm from "@/components/molecules/auth/SignInForm"
import SignUpForm from "@/components/molecules/auth/SignUpForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = () => {
    return (
        <div className="w-full max-w-sm h-fit p-6">
            <Tabs defaultValue="signin" className={"gap-4 w-full"}>
                <TabsList className={"w-full !h-10"}>
                    {
                        TabsData.map((tab, i) => (
                            <TabsTrigger
                                key={i}
                                value={tab.value}
                                className={"dark:data-[state=active]:bg-purple-500"}
                            >
                                {tab.id}
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                <div className="w-full">
                    {
                        TabsData.map((tab, i) => (
                            <TabsContent key={i} value={tab.value}>
                                <Card className={"relative"}>
                                    <CardHeader>
                                        <CardTitle>{tab.label}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <tab.component />
                                    </CardContent>
                                    <BorderBeam
                                        duration={6}
                                        size={400}
                                        className="from-transparent via-purple-500 to-transparent"
                                    />
                                    <BorderBeam
                                        duration={6}
                                        delay={3}
                                        size={400}
                                        borderWidth={2}
                                        className="from-transparent via-blue-500 to-transparent"
                                    />
                                </Card>
                            </TabsContent>
                        ))
                    }
                </div>
            </Tabs>
        </div>
    )
}

export default page


const TabsData = [
    {
        id: "Sign In",
        label: "Sign In to Your Account",
        value: "signin",
        component: SignInForm
    },
    {
        id: "Sign Up",
        label: "Register Yourself",
        value: "signup",
        component: SignUpForm
    }
]