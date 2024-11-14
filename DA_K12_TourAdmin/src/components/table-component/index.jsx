import { RedoOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import React from "react";

const TableComponent = ({
  rowKey,
  dataSource,
  columns,
  selectedRowKeys,
  setSelectedRowKeys,
  pagination,
  loading,
}) => {
  const handleUncheckRadio = () => {
    setSelectedRowKeys([]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      console.log(
        `selectedRowKeys: ${newSelectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    type: "radio",
    columnTitle: () => (
      <Tooltip title="Bỏ chọn">
        <RedoOutlined
          className="icon-reset-rad-btn"
          onClick={handleUncheckRadio}
        />
      </Tooltip>
    ),
  };

  const handleRowClick = (record) => {
    const selectedKey = record.id;
    setSelectedRowKeys([selectedKey]);
  };

  return (
    <>
      <Table
        size="small"
        scroll={{ y: "calc(100vh - 420px)" }}
        bordered
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        className="custom-scroll-table"
        // tableLayout="auto"
        tableLayout="fixed"
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record);
          },
        })}
      />
    </>
  );
};

export default TableComponent;
