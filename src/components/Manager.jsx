import React, { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const closeEye = "fa-solid fa-eye-slash";
  const openEye = "fa-solid fa-eye";
  const addButton = "fa-solid fa-plus";
  const tickButton = "fa-regular fa-circle-check";
  const [eye, setEye] = useState(closeEye);
  const [pass, setPass] = useState("password");
  const [button, setButton] = useState(addButton);

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePassword, setVisiablePassword] = useState({});
  const InputFocus = useRef(null);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const showPass = () => {
    if (eye == openEye) {
      setEye(() => closeEye);
      setPass(() => "password");
    } else {
      setPass(() => "text");
      setEye(() => openEye);
    }
  };
  const AddPass = () => {
    if (form.site.length > 4 && form.username.length > 2) {
      setButton(() => tickButton);
      setTimeout(() => {
        setButton(() => addButton); // revert to plus after 2s
      }, 1500);
      setPasswordArray([...passwordArray, form]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, form])
      );
      console.log([...passwordArray, form]);
      setForm((prev) => ({
        ...prev,
        site: "",
        username: "",
        password: "",
      }));

      toast.success("Save successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("Enter a valid site name", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setForm((prev) => ({
        ...prev,
        site: "",
        username: "",
        password: "",
      }));
    }
  };

  const copyText = (s) => {
    navigator.clipboard.writeText(s);
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVis = (index) => {
    setVisiablePassword((pre) => ({
      ...pre,
      [index]: !pre[index],
    }));
  };
  const removePassword = (itemToRemove) => {
    const stored = localStorage.getItem("passwords");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((item) => item.site !== itemToRemove.site);

      // Update state and localStorage
      setPasswordArray(filtered);
      localStorage.setItem("passwords", JSON.stringify(filtered));
    } catch (e) {
      console.error("Error parsing localStorage or updating passwords:", e);
    }
  };
  const handleEdit = (i) => {
    removePassword(i);
    const obj = { site: i.site, username: i.username, password: i.password };
    setForm(obj);
    InputFocus.current?.focus();
  };

  return (
    <div className="p-3 bg-green-50 h-[80vh] ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="px-2  md:px-0 md: mycontainer rounded-2xl  ">
        <h1 className="text-4xl font-bold text-center">
          <span className=" text-green-700">&lt; </span> Pass
          <span className=" text-green-700">OP /&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center ">
          Your Own Password Manager
        </p>
        <div className="text-black flex flex-col items-center p-4 ">
          <input
            spellCheck={false}
            ref={InputFocus}
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full px-3 py-1"
            type="text"
            name="site"
          ></input>
          <div className=" flex flex-col md:flex-row w-full gap-5 py-3 justify-between ">
            <input
              spellCheck={false}
              value={form.username}
              name="username"
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full py-1 px-4"
              type="text"
            />
            <div className="relative">
              <input
                value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full py-1 px-4 pr-10"
                type={pass}
              />
              <span className=" cursor-pointer absolute right-2 top-1 p-0.5">
                <i class={eye} onClick={showPass}></i>
              </span>
            </div>
          </div>
          <button
            className=" px-3 text-lg hover:border hover:bg-green-400 w-fit flex gap-2 justify-center items-center bg-green-500 rounded-full p-2"
            onClick={AddPass}
          >
            <i class={button}></i>Save Password
          </button>
        </div>
      </div>
      <div className="passwords flex flex-col mx-auto justify-center items-center gap-4 px-45">
        <h2 className="font-bold text-md md:text-xl py-1 md:py-4">
          Your Passwords
        </h2>
        {/* {alert(passwordArray.length)} */}
        {passwordArray.length === 0 && <div>No Passwords</div>}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden border border-white">
            <thead className="bg-green-500 text-white ">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((i, index) => {
                return (
                  <tr>
                    <td className="text-center py-2 w-3">
                      <a href={i.site} target="_blank">
                        {i.site}{" "}
                      </a>
                    </td>
                    <td className="text-center  py-2 w-32">
                      <div className="flex cursor-pointer justify-center gap-4 group items-center">
                        {i.username}{" "}
                        <i
                          class=" fa-regular fa-copy opacity-0 group-hover:opacity-100"
                          onClick={() => copyText(i.username)}
                        ></i>
                      </div>
                    </td>
                    <td className="text-center py-2 w-32">
                      <div className="flex  cursor-pointer justify-center gap-4 items-center group">
                        {visiblePassword[index]
                          ? i.password
                          : ".".repeat(i.password.length)}
                        <i
                          onClick={() => handleVis(index)}
                          class={visiblePassword[index] ? openEye : closeEye}
                        ></i>{" "}
                        {visiblePassword[index] && (
                          <i
                            class="fa-regular fa-copy opacity-0 group-hover:opacity-100"
                            onClick={() => copyText(i.password)}
                          ></i>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-2 w-32 ">
                      <div className="px-2 md:px-0 flex justify-center items-center gap-5">
                        <span
                          className=" cursor-pointer hover:font-bold hover:text-lg"
                          onClick={() => removePassword(i)}
                        >
                          <i class="fa-solid fa-trash"></i>{" "}
                        </span>
                        <span
                          className=" cursor-pointer hover:font-bold hover:text-lg"
                          onClick={() => handleEdit(i)}
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
