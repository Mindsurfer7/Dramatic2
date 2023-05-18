import React from "react";
import { Pagination } from "antd";

// type propsType = {
//   currentPage: number;
//   setPage: (e: number) => void;
// };

const Paginator = (props) => {
  return (
    <Pagination
      size="small"
      total={10}
      showSizeChanger={false}
      pageSize={4}
      onChange={(e) => props.setPage(e)}
    />
  );
};
export default Paginator;
