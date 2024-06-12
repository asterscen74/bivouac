import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function BivouacDeclaration() {
    const navigate = useNavigate();
    const location = useLocation();
    const acceptedLocations = ["/reservation-bivouac/informations",
    "/reservation-bivouac/localisation",
    "/reservation-bivouac/quizz",
    "/reservation-bivouac/thanks"]

    useEffect(() => {
        if (
            !acceptedLocations.includes(location.pathname)
        ) {
            navigate("/reservation-bivouac/informations");
        }
      }, [navigate]);

    return (
        <>
            <Outlet />
        </>
    );
}