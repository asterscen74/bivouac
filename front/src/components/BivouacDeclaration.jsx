import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function BivouacDeclaration() {
    const navigate = useNavigate();
    const location = useLocation();
    const acceptedLocations = ["/declaration-bivouac/informations",
    "/declaration-bivouac/localisation",
    "/declaration-bivouac/quizz",
    "/declaration-bivouac/thanks"]

    useEffect(() => {
        if (
            !acceptedLocations.includes(location.pathname)
        ) {
            navigate("/declaration-bivouac/informations");
        }
      }, [navigate]);

    return (
        <>
            <Outlet />
        </>
    );
}
