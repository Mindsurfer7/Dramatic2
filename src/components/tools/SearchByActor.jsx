import React, { useCallback, useState } from "react";
import { Button, Input } from "antd";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSearchString } from "../../store/FilterSlice";
import css from "../Header/header.module.css";
import { searchByActor } from "../../store/HomeSlice";

const SearchByActor = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const search2Redux = useCallback(
    debounce((str) => {
      dispatch(searchByActor(str));
    }, 500),
    []
  );
  const searchOnType = (e) => {
    setSearch(e);
    search2Redux(search);
  };
  return (
    <Input
      className={css.search}
      value={search}
      placeholder="search movie by actor..."
      allowClear
      onSearch={setSearch}
      onChange={(e) => searchOnType(e.target.value)}
      style={{ height: 30, width: 200, borderRadius: 15 }}
      inputStyle={{
        "::placeholder": {
          color: "black",
        },
      }}
    />
  );
};
export default SearchByActor;
