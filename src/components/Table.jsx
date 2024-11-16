import React, { useState } from "react";
import toast from "react-hot-toast";

const Table = ({ passwordArr, deletePassword, editPassword }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust this value as needed

    // Calculate total pages
    const totalPages = Math.ceil(passwordArr.length / itemsPerPage);

    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = passwordArr.slice(indexOfFirstItem, indexOfLastItem);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", {
            style: {
                borderRadius: "5px",
                background: "#212226",
                color: "#fff",
            },
        });
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="relative w-[96vw] min-h-[80vh]  max-w-4xl mx-auto pb-5 overflow-x-auto my-5">
            <h2 className="py-3 px-5 text-2xl text-gray-300">Your Passwords</h2>
            {passwordArr.length === 0 && (
                <p className="text-sm text-gray-400 px-5">
                    No passwords to show!
                </p>
            )}

            {passwordArr.length > 0 && (
                <>
                    <table className="table-auto w-full text-left mt-5 mb-5 rounded-2xl overflow-hidden">
                        <thead>
                            <tr className="bg-primary text-gray-200 text-sm">
                                <th className="border border-secondary text-sm px-4 py-2">
                                    Website URL
                                </th>
                                <th className="border border-secondary text-sm px-4 py-2">
                                    Username
                                </th>
                                <th className="border border-secondary text-sm px-4 py-2">
                                    Password
                                </th>
                                <th className="border border-secondary text-sm px-4 py-2">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className="bg-bg-dark hover:bg-secondary text-white"
                                >
                                    <td className="border border-secondary text-sm px-4 py-2">
                                        <div className="flex items-center gap-5 relative">
                                            <a
                                                href={item.site}
                                                target="_blank"
                                                className="flex-1"
                                                rel="noopener noreferrer"
                                            >
                                                {item.site}
                                            </a>
                                            <span
                                                onClick={() =>
                                                    copyText(item.site)
                                                }
                                                className="cursor-pointer relative"
                                            >
                                                <i className="ri-file-copy-line"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="border border-secondary text-sm px-4 py-2">
                                        <div className="flex items-center gap-5 relative">
                                            <span className="flex-1">
                                                {item.username}
                                            </span>
                                            <span
                                                onClick={() =>
                                                    copyText(item.username)
                                                }
                                                className="cursor-pointer relative"
                                            >
                                                <i className="ri-file-copy-line"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="border border-secondary text-sm px-4 py-2">
                                        <div className="flex items-center gap-5 relative">
                                            <span className="flex-1">
                                                {"*".repeat(
                                                    item.password.length
                                                )}
                                            </span>
                                            <span
                                                onClick={() =>
                                                    copyText(item.password)
                                                }
                                                className="cursor-pointer relative"
                                            >
                                                <i className="ri-file-copy-line"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="border border-secondary text-sm px-4 py-2">
                                        <div className="flex justify-center items-center gap-5">
                                            <span
                                                onClick={() =>
                                                    editPassword(item.id)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                                    trigger="hover"
                                                    colors="primary:#3080e8,secondary:#b4b4b4"
                                                    style={{
                                                        width: " 1.5rem",
                                                        height: "1.5rem",
                                                    }}
                                                ></lord-icon>
                                            </span>
                                            <span
                                                onClick={() =>
                                                    deletePassword(item.id)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover"
                                                    colors="primary:#3080e8,secondary:#b4b4b4"
                                                    style={{
                                                        width: " 1.5rem",
                                                        height: "1.5rem",
                                                    }}
                                                ></lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center w-fit text-sm gap-2 absolute bottom-5 left-[50%] -translate-x-[50%]">
                        <button
                            className="py-2 px-4 bg-secondary text-gray-300 rounded"
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-gray-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="py-2 px-4 bg-secondary text-gray-300 rounded"
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Table;
