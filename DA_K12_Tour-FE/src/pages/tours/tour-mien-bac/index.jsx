import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tours from "../../../components/tours";
import { fetchCategories } from "../../../redux/features/system/categoriesSlice";
import { fetchTour } from "../../../redux/features/system/tourSlice";

const TourMienBac = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        searchName: "",
        searchCode: "",
        categoriesSearch: ""
    });

    const { tours } = useSelector((state) => state.tours)

    const getListCategories = async () => {
        try {
            await dispatch(fetchCategories({ searchName: "", searchCode: "" })).unwrap();
        } catch (error) {
            setIsLoading(false);
        }

    };

    const getListTours = async () => {

        await dispatch(fetchTour({ ...searchParams })).unwrap();
    };

    useEffect(() => {
        getListCategories();
        getListTours()
    }, [dispatch, searchParams]);

    const toursInMienBac = tours.filter((tour) => tour.categoryName == "Miền Bắc");


    return (
        <div>
            <Tours
                title="Tour ở miền Bắc"
                tours={toursInMienBac}
                pagination={true}
                search={true}
                loading={isLoading}
                linkTo="/mienbac"
                viewAll={false}
            />
        </div>
    )

}

export default TourMienBac