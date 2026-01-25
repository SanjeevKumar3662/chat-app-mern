import { useRef, useState } from "react";
import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";

export const Chat = ({ chatTarget, onBack }) => {
  const { messages, getMessage, sendMessage, addMessage } = useMessageStore();
  const { authUser } = useAuthStore();
  const { socket } = useSocketStore();

  const [message, setMessage] = useState({ text: "", image: "" });

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Load old chat
  useEffect(() => {
    if (!chatTarget) return;
    (async () => {
      await getMessage(chatTarget._id);
    })();
  }, [chatTarget, getMessage]);

  //Socket IO logic
  useEffect(() => {
    if (!socket || !chatTarget) return;

    const handleNewMessage = (data) => {
      // only add if message belongs to current chat
      if (
        data.senderId === chatTarget._id &&
        data.receiverId === authUser._id
      ) {
        addMessage(data);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, chatTarget, authUser._id, addMessage]);

  //for uploading image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setMessage((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.text === "" && message.image === "") return;
    (async () => {
      await sendMessage(chatTarget._id, message);
      setMessage({ text: "", image: "" });
    })();
  };
  // console.log("messages", messages);
  // console.log("chatTarget", chatTarget);
  if (!chatTarget) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a chat
      </div>
    );
  }

  return (
    // <section className=" bg-linear-to-r from-slate-900 to-slate-700 flex-3 flex flex-col   justify-between overflow-y-auto">
    <section className="bg-linear-to-r from-slate-900 to-slate-700 flex-3 flex flex-col h-full">
      <div className="sticky top-0 bg-gray-600 p-1 flex justify-between ">
        <h1 className="text-2xl text-white  text-center  px-3">
          {chatTarget?.fullName}
        </h1>
        <button
          onClick={onBack}
          className="md:hidden  bg-gray-500 px-6 rounded-md text-white text-xl "
        >
          ←
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        <ul className="flex flex-col">
          {messages.map((message) => (
            <li
              key={message._id}
              className={`p-2 m-3 rounded-md ${
                message.senderId === authUser._id
                  ? "self-end bg-blue-400"
                  : "self-start bg-gray-600 text-white"
              }`}
            >
              {message.text}
              {message.image && (
                <img
                  src={message.image}
                  alt="sent"
                  className="max-w-100 rounded-md mt-1"
                />
              )}
            </li>
          ))}
        </ul>

        {/* 👇 MUST be inside the scroll container */}
        <div ref={bottomRef} />
      </div>

      <form className="sticky  bottom-0  border p-2 bg-gray-800 ">
        <div className=" flex gap-2 ">
          <input
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            value={message.text}
            className=" flex-4 rounded-md text-white bg-gray-600"
            type="text"
          />
          <input
            className=" bg-green-300 max-w-50 rounded-md"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            onClick={handleMessageSubmit}
            className="flex-1 bg-green-400 active:bg-green-300 p-2 rounded-md"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
};
