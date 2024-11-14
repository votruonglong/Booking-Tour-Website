import Tours from "../../components/tours"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/features/system/categoriesSlice";
import { fetchTour } from "../../redux/features/system/tourSlice";


const HomePage = () => {

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
    const toursInMienTay = tours.filter((tour) => tour.categoryName == "Miền Tây");
    const toursInMienTrung = tours.filter((tour) => tour.categoryName == "Miền Trung");


    return (
        <div>
            <Tours
                title="Tour Miền Bắc"
                tours={toursInMienBac}
                pagination={false}
                search={false}
                loading={isLoading}
                linkTo="/mienbac"
                viewAll={true}
            />
            <Tours
                title="Tour Miền Tây"
                tours={toursInMienTay}
                pagination={false}
                search={false}
                loading={isLoading}
                linkTo="/mientay"
                viewAll={true}
            />
            <Tours
                title="Tour Miền Trung"
                tours={toursInMienTrung}
                pagination={false}
                search={false}
                loading={isLoading}
                linkTo="/mientrung"
                viewAll={true}
            />
        </div>
    )

}


export default HomePage