// import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useSelector } from "react-redux";

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const ComponentWithAuth = (props: P) => {
        const router = useRouter();
        // uncomment the following line after integrating API
        // const isLoggedIn = useSelector(
        //     (state: RootState) => state.loginReducer.isLoggedIn
        // );
        // comment out the following line after integrating API
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        useEffect(() => {
            // Perform authentication check here

            if (isLoggedIn === "false") {
                // redirect to login page
                router.push("/");
            }
        }, [isLoggedIn, router]);

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
};

export default withAuth;
