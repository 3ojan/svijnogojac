import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router';

// components


const tableRow = (color, data, history) => {
  const { user } = data
  return (
    <tr
      key={user._id}
      onClick={() => { history(`/userads/${user._id}`) }}
    >
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
        <img
          // src={require("./logo192.png")}
          className="h-12 w-12 bg-white rounded-full border"
          alt="..."
        ></img>
        <span
          className={
            "ml-3 font-bold " +
            +(color === "light" ? "text-gray-700" : "text-white")
          }
        >
          {user.firstName}
        </span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        {data.total}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        {data.date}
      </td>
    </tr>)
}

export default function UserTable({ color, data, title }) {
  const history = useNavigate();
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-800" : "text-white")
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Korisnik
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Ukupno oglasa
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Datum zadnjeg unosa
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.map(item => tableRow(color, item, history))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

UserTable.defaultProps = {
  color: "light",
};

UserTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
