import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import Table from "./Table";
import toast from "react-hot-toast";

const Form = () => {
    const [passwordArr, setPasswordArr] = useState([]);
    const [editId, setEditId] = useState(null);

    const imgRef = useRef(null);
    const inputPassRef = useRef(null);

    const formRef = useRef();
    const buttonRef = useRef();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    // Get existing data from local storage
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArr(JSON.parse(passwords));
        }

        // GSAP Animations
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: 0.5,
                ease: "back.out(1.7)",
            }
        );
    }, []);

    // Input field feature show and hide password (toggle)
    const showPassword = () => {
        if (inputPassRef.current) {
            if (inputPassRef.current.type === "password") {
                inputPassRef.current.type = "text";
                imgRef.current.src = "/eye-line.png";
            } else {
                inputPassRef.current.type = "password";
                imgRef.current.src = "/eye-off-line.png";
            }
        }
    };

    // Delete the whole row by id
    const deletePassword = (id) => {
        const arr = passwordArr.filter((item) => item.id !== id);
        setPasswordArr(arr);
        localStorage.setItem("passwords", JSON.stringify(arr));
        toast.success("Deleted Successfully!");
    };

    // Edit the whole row using existing form
    const editPassword = (id) => {
        const item = passwordArr.find((item) => item.id === id);
        if (item) {
            setValue("site", item.site);
            setValue("username", item.username);
            setValue("password", item.password);
            setEditId(id); // Set the edit ID
        }
    };

    const onSubmit = (data) => {
        if (editId) {
            // Update existing password
            const updatedArr = passwordArr.map((item) =>
                item.id === editId ? { ...item, ...data } : item
            );

            setPasswordArr(updatedArr);
            localStorage.setItem("passwords", JSON.stringify(updatedArr));
            toast.success("Password updated successfully!");

            // Reset edit mode
            setEditId(null);
        } else {
            // Add new password
            const newPassword = { ...data, id: crypto.randomUUID() };
            const updatedArr = [...passwordArr, newPassword];
            setPasswordArr(updatedArr);
            localStorage.setItem("passwords", JSON.stringify(updatedArr));
            toast.success("Password added successfully!");
        }
        reset();
    };

    return (
        <>
            <div
                ref={formRef}
                className="mt-16 md:mt-5 py-10 px-5 md:px-10 max-w-4xl w-[96vw] rounded-3xl mx-auto bg-secondary"
            >
                <div>
                    <h1 className="text-center text-3xl font-mono text-white">
                        Password Manager
                    </h1>
                    <p className="text-sm text-gray-400 text-center">
                        Your own password manager.
                    </p>
                </div>
                <form
                    className="py-10 flex flex-col gap-5"
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <input
                            placeholder="Website url"
                            type="text"
                            {...register("site", {
                                required: "Website URL is required",
                                pattern: {
                                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                    message: "Please enter a valid URL",
                                },
                            })}
                            className="py-3 px-5 font-sans rounded-2xl bg-transparent border-[.5px] outline-none border-gray-400 w-full text-gray-100 md:px-7"
                        />
                        {errors.site && (
                            <p className="text-red-500 text-xs">
                                {errors.site.message}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <div className="md:w-[70%]">
                            <input
                                placeholder="Username"
                                type="text"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Username must be at least 3 characters",
                                    },
                                })}
                                className="py-3 px-5 font-sans rounded-2xl bg-transparent border-[.5px] outline-none border-gray-400 w-full text-gray-100 md:px-7"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div className="md:w-[30%] relative">
                            <input
                                placeholder="Password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                ref={(e) => {
                                    // Attach both refs
                                    register("password").ref(e); // React Hook Form's ref
                                    inputPassRef.current = e; // Your custom ref
                                }}
                                className="py-3 px-5 font-sans rounded-2xl bg-transparent border-[.5px] outline-none border-gray-400 w-full text-gray-100 md:px-7"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs">
                                    {errors.password.message}
                                </p>
                            )}
                            <span onClick={showPassword}>
                                <img
                                    ref={imgRef}
                                    src="/eye-off-line.png"
                                    className="absolute right-5 top-[50%] -translate-y-[50%] cursor-pointer h-5"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="w-fit mx-auto mt-5">
                        <button
                            ref={buttonRef}
                            className="py-3 px-8 rounded-2xl bg-bg-dark text-white text-sm flex items-center gap-1"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/sbnjyzil.json"
                                trigger="hover"
                                colors="primary:#3080e8,secondary:#b4b4b4"
                                style={{
                                    width: "2rem",
                                    height: "2rem",
                                    color: "white",
                                }}
                            ></lord-icon>
                            <span>
                                {editId ? "Update Password" : "Save Password"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <Table
                passwordArr={passwordArr}
                editPassword={editPassword}
                deletePassword={deletePassword}
            />
        </>
    );
};

export default Form;
