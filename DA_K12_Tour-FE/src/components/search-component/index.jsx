import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Collapse, Input, Select, Space } from "antd";
import React, { useState, useEffect } from "react";
import "./index.css";
import { customFilterOption } from "../../utils/searchFilter";
import DatePicker from "../datepicker-component";
import dayjs from "dayjs";

const SearchComponent = ({ searchFields = [], onSearch, onDateChange }) => {
    const initialSearchValues = searchFields.reduce((acc, field) => {
        acc[field.key] = field.value || "";
        return acc;
    }, {});

    const [searchValues, setSearchValues] = useState(initialSearchValues);

    useEffect(() => {
        setSearchValues(initialSearchValues);
    }, [searchFields]);

    const handleInputChange = (key, value) => {
        setSearchValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
        if (key === "date" && onDateChange) {
            onDateChange(value ? dayjs(value) : null);
        }
    };

    const handleSearch = () => {

        onSearch(searchValues);
    };

    const handleClear = () => {
        const clearedValues = Object.keys(searchValues).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {});
        setSearchValues(clearedValues);
        onSearch(clearedValues);
    };

    const renderField = (field, index) => {
        switch (field.type) {
            case "select":
                return (
                    <Select
                        className="searchField"
                        key={index}
                        style={{ width: 200 }}
                        placeholder={field.placeholder}
                        onChange={(value) => handleInputChange(field.key, value)}
                        value={searchValues[field.key] || undefined}
                        options={field.options}
                        allowClear
                        showSearch
                        filterOption={customFilterOption}
                    />
                );
            case "date":
                return (
                    <DatePicker
                        className="searchField"
                        key={index}
                        style={{ width: 200 }}
                        onChange={(date, dateString) =>
                            handleInputChange(field.key, dateString)
                        }
                        value={
                            searchValues[field.key] ? dayjs(searchValues[field.key]) : null
                        }
                        format="DD-MM-YYYY"
                        showTime={field.showTime}
                        allowClear
                    />
                );
            default:
                return (
                    <Input
                        className="searchField"
                        key={field.key || index}
                        placeholder={field.placeholder}
                        style={{ width: 300 }}
                        value={searchValues[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                    />
                );
        }
    };

    const items = [
        {
            key: "1",
            label: "Tìm kiếm",
            children: (
                <Space align="center" className="searchFieldsContainer">
                    {searchFields.map((field, index) => renderField(field, index))}
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        type="default"
                        danger
                        icon={<CloseOutlined />}
                        onClick={handleClear}
                    >
                        Hủy bỏ
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Collapse defaultActiveKey={["1"]} size="small" items={items} />
        </div>
    );
};

export default SearchComponent;
