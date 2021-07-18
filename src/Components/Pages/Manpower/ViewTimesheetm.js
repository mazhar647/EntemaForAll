import React, { useEffect, useState, useMemo } from "react";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import axios from "axios";
import { IconButton, Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "Id", field: "Id", sortable: false },
    { name: "Timesheet For", field: "Timesheet For", sortable: false },
    { name: "Month", field: "Month", sortable: false },
    { name: "Year", field: "Year", sortable: false },
    { name: "Total Hours", field: "Total Hours", sortable: false },
    { name: "Total", field: "Total", sortable: false },
    { name: "Created On", field: "Created On", sortable: false },
    { name: "Created By", field: "Created By", sortable: false },
    { name: "Status", field: "Status", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
  ];

  const getData = () => {
    showLoader();

    fetch("http://localhost:3009/getManpowerTimesheetData")
      .then((response) => response.json())
      .then((json) => {
        hideLoader();
        setComments(json);
        console.log(json);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const removeMPTimeSheet = (tsId) => {
    axios
      .post("http://localhost:3009/removeMPTSDataonId", {
        TSID: tsId,
      })
      .then((res) => {
        console.log("successfully deleted TS ", tsId);
        getData();
      });

    console.log("TimeSheet ID : ", tsId);
  };

  const test = (data) => {
    alert("hurrray :" + data);
  };

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.MTS_MANPOWER.toLowerCase().includes(search.toLowerCase()) ||
          comment.MTS_IQAMA.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  return (
    <>
        <div
          class="container"
          style={{ paddingTop: "3px", paddingLeft: "5px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>View ManPower Timesheet</h3>
            </div>
          </div>

          <div className="row w-100">
            <div className="col mb-3 col-12 text-center">
              <div className="row">
                <div
                  className="col-md-6 d-flex flex-row-reverse"
                  style={{ marginBottom: "30px", marginLeft: "340px" }}
                >
                  <Search
                    onSearch={(value) => {
                      setSearch(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <table className="table table-striped">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {commentsData.map((comment) => (
                    <tr>
                      <th scope="row" key={comment.MMTS_ID}>
                        {comment.MMTS_ID}
                      </th>
                      <td onClick={() => test(comment.MMTS_ID)}>
                        {comment.MTS_MANPOWER}
                      </td>
                      <td>{comment.MTS_MONTH}</td>
                      <td>{comment.MTS_YEAR}</td>
                      {/* <td>{comment.MTS_DESCRIPTION}</td> */}
                      {/* <td>{comment.MTS_IQAMA}</td> */}
                      <td>{comment.MTS_WORKHOURS}</td>
                      <td>{comment.MTS_TOTAL}</td>
                      <td>{comment.CREATED_DATE}</td>
                      <td>{comment.CREATED_BY}</td>
                      <td>{comment.MTS_STATUS}</td>
                      {/* <td>{comment.MTS_OT_HOURS}</td>
                      <td>{comment.MTS_HR_RATE}</td>
                      <td>{comment.MTS_OT_RATE}</td>
                      <td>{comment.MTS_GRID}</td> */}
                      <td>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon
                            onClick={() => removeMPTimeSheet(comment.MMTS_ID)}
                          />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      {loader}
    </>
  );
};

export default DataTable;
